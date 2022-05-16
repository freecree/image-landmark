const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw ApiError.UnauthorizedError('(Нету заголовка)');
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            throw ApiError.UnauthorizedError('(Нету токена)');
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            throw ApiError.UnauthorizedError('(Токен не валидный)');
        }

        req.user = userData;
        next();
    } catch(e) {
        return next(e)//ApiError.UnauthorizedError(e.message));
    }
}