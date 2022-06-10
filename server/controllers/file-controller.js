const ApiError = require('../exceptions/api-error');
const FileModel = require('../models/file-model');
const UserModel = require('../models/user-model');
const fs = require('fs');
const markingService = require('../service/marking-service');
const spawn = require('child_process').spawn;

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
                res.json(dbFile);
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
    }
    async getFile(req, res, next) {
    }
    async getFiles(req, res, next) {
        try {
            const files = await FileModel.find();
            return res.json(files);
        } catch(e) {
            next(e);
        }
        
    }
    async getFilesMarkings(req, res, next) {
    }
}

module.exports = new FileController();
