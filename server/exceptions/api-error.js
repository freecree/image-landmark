module.exports = class ApiError extends Error {
    status;
    errors;
    info;

    constructor(status, message, info = {}) {
        super(message);
        this.status = status;
        this.info = info;
    }

    static UnauthorizedError(message = '') {
        return new ApiError(401, `Пользователь не авторизован ${message}`);
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static FileExist(fileName) {
        return new ApiError(400, 'File already exists!!', {fileName, FileExistError: true});
    }

    static UploadError() {
        return new ApiError(500, 'Upload Error');
    }
}