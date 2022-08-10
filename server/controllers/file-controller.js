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

            const parent = await FileModel.findOne({user: req.user.id, _id: req.body.parent});
            const user = await UserModel.findById(req.user.id);

            if (user.usedSpace + file.size > user.diskSpace) {
                return next(ApiError.BadRequest("There are no space on the disk", errors.array()));
            }
            user.usedSpace += file.size;

            let path;
            if (parent) {
                path = `${process.env.FILE_PATH}\\${user.id}\\${parent.path}\\${file.name}`;
            } else {
                path = `${process.env.FILE_PATH}\\${user.id}\\${file.name}`;
            }

            if (fs.existsSync(path)) {
                return next(ApiError.BadRequest("File already exists", errors.array()));
            }
            file.mv(path);
            
            const type = file.name.split('.').pop();

            let promise = markingService.markImage(user._id, [file.name]);
            promise.then(function(markingsJSON) {
                const dbFile = new FileModel({
                    name: file.name,
                    type,
                    size: file.size,
                    path: parent?.path,
                    parent: parent?._id,
                    user: user._id,
                    markings: markingsJSON
                });
                dbFile.save();
                user.save();

                const fileDto = new FileDto(dbFile);
                res.json(fileDto);
            }, function(errors) {
                console.log("Rejected: ", errors);
                next(errors);
                //res.json(errors);
            })

        } catch(e) {
            console.log(e);
            next(ApiError.UploadError());
        }
    }
    async markImages(req, res, next) {
        
        try {
            
            console.log("In Controller::markImage");
            const process = spawn('python', ['./imageLandMark.py']);
            process.stdout.on('data', function (data) {
                console.log("On data:", data.toString().replace(/'/g, '"'));
                return res.json(JSON.parse(data.toString().replace(/'/g, '"')));
            });
        } catch(e) {
            next(e);
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
            user.usedSpace -= file.size;
            await user.save();
            console.log("Delete: ", user);
            // const file = await FileModel.findOneAndUpdate({ _id: req.params['id'] }, req.body, {new: true});
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
            const files = await FileModel.find();
            const fileDtos = [];
            files.forEach(v => {
                fileDtos.push(new FileDto(v));
            })
            console.log("In getFiles(): ");
            return res.json(fileDtos);
        } catch(e) {
            next(e);
        }
        
    }
    async getFilesMarkings(req, res, next) {
    }
}

module.exports = new FileController();
