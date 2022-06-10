module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(message = '') {
        return new ApiError(401, `Пользователь не авторизован ${message}`);
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static UploadError() {
        return new ApiError(500, 'Upload Error');
    }
}