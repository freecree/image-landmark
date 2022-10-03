const fs = require('fs');
const spawn = require('child_process').spawn;

const ApiError = require('../exceptions/api-error');
const FileModel = require('../models/file-model');
const UserModel = require('../models/user-model');

const markingService = require('../service/marking-service');
const fileService = require('../service/file-service');

const FileDto = require('../dtos/file-dto.js');

class FileController {

    async uploadFile(req, res, next) {
        console.log("In FileConroller::aploadFile()");
        try {
            const file = req.files.file;

            if (!file) {
                return next(ApiError.BadRequest("File is not received from client"));
            }

            const user = await UserModel.findById(req.user.id); 
            if (await user.get('usedSpace') + file.size > await user.get('diskSpace')) {
                return next(ApiError.BadRequest("There are no space on the disk"));
            }
            const absolutePath = `${process.env.FILE_PATH}\\${user.id}\\${file.name}`;
            const relativePath = `${user.id}`;

            if (fs.existsSync(absolutePath)) {
                return next(ApiError.FileExist(file.name));
            }
            await file.mv(absolutePath);
            await user.updateOne({$inc: {usedSpace: file.size}});


            console.log("file-controller::uploadFile change space");

            const type = file.name.split('.').pop();

            //mark image
            let promise = markingService.markImage([{name: file.name, path: relativePath}]);
            promise.then(function(data) {
                console.log("FileController::uploadFile data:\n", data);
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
                console.log("filecontroller::uploadfile markings error:\n", err);
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
            fileService.deleteFile(file);
            await file.remove();
            await user.updateOne({$inc: {usedSpace: -file.size}});
            // console.log("FileController::deleteFile: ", user);
            return res.json(new FileDto(file));
        } catch(e) {
            next(e);
        }
    }
    async updateFile(req, res, next) {
        try {
            const file = await FileModel.findOneAndUpdate({ _id: req.params['id'] }, req.body, {new: true});
            return res.json(new FileDto(file));
        } catch(e) {
            next(e);
        }
    }
    async getFiles(req, res, next) {
        try {
            // console.log("FileController::getFiles() req", req.user);
            console.log("FileController::getFilesMarkings: ");
            // await UserModel.updateMany({}, {usedSpace: 0, diskSpace: 10000000 });
            const files = await FileModel.find().where('user', req.user.id);
            const fileDtos = [];
            files.forEach(v => {
                fileDtos.push(new FileDto(v));
            })
            return res.json(fileDtos);
        } catch(e) {
            next(e);
        }
        
    }
    async getFilesMarkings(req, res, next) {
        // const users = await UserModel.find();

    }
}

module.exports = new FileController();
