const fs = require('fs');
const FileModel = require('../models/file-model');
const path = require('path');

class FileService {
    createDir(req, file) {
        const filePath = path.resolve(req.filePath, file.user.toString());
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: 'File already exists'})
                }
            } catch (e) {
                return reject({message: 'File error'});
            }
        })
    }

    deleteFile(req, file) {
        const filePath = path.resolve(req.filePath, file.path, file.name);
        fs.unlinkSync(filePath);
    }
}

module.exports = new FileService();