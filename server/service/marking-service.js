const spawn = require('child_process').spawn;
const path = require('path');

class MarkingService {

    async markImage(files) {
        return new Promise(function(resolve, reject) {
            const process = spawn('python', ['./imageLandmark.py', JSON.stringify(files)]);

            process.stdout.on('data', function (data) {
                resolve(JSON.parse(data.toString().replace(/'/g, '"')));
            }); 
            process.stderr.on('data', function (data) {
                if (data.toString().indexOf('custexc') != -1) {
                    reject(data.toString());
                } else if (data.toString().indexOf("lm") != -1) {
                    console.log(data.toString());
                }
            });
        });
    }
}

module.exports = new MarkingService();
