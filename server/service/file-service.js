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

    async moveTestData(userId) {
        const testFiles = await FileModel.find({user: undefined});
        const movedTestFiles = testFiles.map(f => {
            f._id = mongoose.Types.ObjectId();
            f.user = userId;
            f.path = userId;
            return f;
        });
        FileModel.insertMany(movedTestFiles);

        const examplesFiles = './files/examples/*';
        const userDir = `./files/${userId}`;

        const process = spawn('cp', [examplesFiles, userDir]);
        process.stderr.on('data', (data) => {
            console.log("Stderr: ", data.toString());
        });
    }

    deleteFile(req, file) {
        const filePath = path.resolve(req.filePath, file.path, file.name);
        fs.unlinkSync(filePath);
    }
}

module.exports = new FileService();
