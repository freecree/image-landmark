const spawn = require('child_process').spawn;

class MarkingService {

    async markImage(path, imageName) {
        return new Promise(function(resolve, reject) {
            const process = spawn('python', ['./imageLandMark.py', path, imageName]);
            process.stdout.on('data', function (data) {
                if (data.toString() == -1) reject("Python script error");
                
                console.log("On data:", data.toString().replace(/'/g, '"'));
                resolve(JSON.parse(data.toString().replace(/'/g, '"')));
            }); 
            
        });
    }
}

module.exports = new MarkingService();