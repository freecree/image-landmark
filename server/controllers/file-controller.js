const fs = require('fs');
const spawn = require('child_process').spawn;
const path = require('path');

const ApiError = require('../exceptions/api-error');
const FileModel = require('../models/file-model');
const UserModel = require('../models/user-model');

const markingService = require('../service/marking-service');
const fileService = require('../service/file-service');

const FileDto = require('../dtos/file-dto.js');

class FileController {
    async uploadFile(req, res, next) {
        try {
            const file = req.files.file;
            if (!file) {
                return next(ApiError.BadRequest("File is not received from client"));
            }

            const user = await UserModel.findById(req.user.id); 
            if (await user.get('usedSpace') + file.size > await user.get('diskSpace')) {
                return next(ApiError.BadRequest("There are no space on the disk"));
            }
            const absolutePath = path.resolve(req.filePath, user.id.toString(), file.name);
            const relativePath = `${user.id}`;

            if (fs.existsSync(absolutePath)) {
                return next(ApiError.FileExist(file.name));
            }
            await file.mv(absolutePath);
            await user.updateOne({$inc: {usedSpace: file.size}});

            const type = file.name.split('.').pop();
            //mark image
            let promise = markingService.markImage([{name: file.name, path: relativePath}]);
            promise.then(function(data) {
                const dbFile = new FileModel({
                    name: file.name,
                    type,
                    size: file.size,
                    path: relativePath,
                    user: user._id,
                    markings: data[0]
                });
                dbFile.save();
                const fileDto = new FileDto(dbFile);
                res.json(fileDto);
            }, function(err) {
                return next(ApiError.BadRequest("markings error"));
            })
        } catch(e) {
            console.log(e);
            next(ApiError.UploadError());
        }
    }


    async deleteFile(req, res, next) {
        try {
            const file = await FileModel.findById(req.params.id);
            if (!file) {
                return res.status(400).json({message: "File not found"});
            }
            const user = await UserModel.findById(req.user.id);
            if (!user) {
                return res.status(400).json({message: "User not found"});
            }
            fileService.deleteFile(req, file);
            await file.remove();
            await user.updateOne({$inc: {usedSpace: -file.size}});
            return res.json(new FileDto(file));
        } catch(e) {
            next(e);
        }
    }
    async updateFile(req, res, next) {
        try {
            const file = await FileModel
            .findOneAndUpdate({ _id: req.params['id'] }, req.body, {new: true});
            return res.json(new FileDto(file));
        } catch(e) {
            next(e);
        }
    }
    async getFiles(req, res, next) {
        try {
            const files = await FileModel.find()
            .where('user', req.user.id)
            .sort({"createdAt": -1});

            const fileDtos = [];
            files.forEach(v => {
                fileDtos.push(new FileDto(v));
            })
            return res.json(fileDtos);
        } catch(e) {
            next(e);
        }
    }
}
module.exports = new FileController();
