module.exports = function(path) {
    return function(req, res, next) {
        req.filePath = path;
        next();
    }
}