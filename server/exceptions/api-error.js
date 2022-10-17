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
        return new ApiError(401, `User is not authorized ${message}`);
    }

    static UserExist(message = 'User with such email exist') {
        return new ApiError(400, message, {UserExist: true});
    }
    static IncorrectUserData(message = 'Incorrect user data') {
        return new ApiError(400, message, {IncorrectUserData: true});
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static FileExist(fileName) {
        return new ApiError(400, 'File already exists', {fileName, FileExistError: true});
    }

    static UploadError() {
        return new ApiError(500, 'Upload Error');
    }
}