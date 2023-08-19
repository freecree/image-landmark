const fs = require('fs');
const FileModel = require('../models/file-model');
const path = require('path');
const {mongoose} = require('mongoose');
const appRootDir = path.dirname(require.main.filename);
const {spawn} = require('child_process');

class FileService {
    createDir(req, file) {
        const filePath = path.resolve(req.filePath, file.name);
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({message: 'File was created'});
                } else {
                    return reject({message: 'File already exists'});
                }
            } catch (e) {
                return reject({message: 'File error'});
            }
        })
    }

    moveTestData(userId) {
        return new Promise((resolve, reject) => {
            FileModel.find({user: undefined}, (err, testFiles) => {
                const movedTestFiles = testFiles.map(f => {
                    f._id = mongoose.Types.ObjectId();
                    f.user = userId;
                    f.path = userId;
                    return f;
                });
                FileModel.insertMany(movedTestFiles);
            });
            // Copy files to user directory
            const examplesFiles = './files/examples/*';
            const userDir = `./files/${userId}`;
            const process = spawn('cp', [examplesFiles, userDir], {shell: true});
            process.stdout.on('close', code => {
                if (code == 0) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    deleteFile(req, file) {
        const filePath = path.resolve(req.filePath, file.path, file.name);
        fs.unlinkSync(filePath);
    }
}

module.exports = new FileService();
