const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');


class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);

        } catch(e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch(e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch(e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        console.log("In Controller::getUsers()");
        try {
            const users = await userService.getAllUsers()
            return res.json(users);
        } catch(e) {
            next(e);
        }
    }
    async markImage(req, res, next) {
        try {
            let spawn = require('child_process').spawn;
            let process = spawn('python', ['./imageLandMark.py']);
            process.stdout.on('data', function (data) {
            //     res.send(data.toString());
                
                console.log("On data:", data.toString().replace(/'/g, '"'));
                //return res.json(JSON.stringify(data.toString()));
                //return res.json(JSON.parse(data));
                return res.json(JSON.parse(data.toString().replace(/'/g, '"')));
            });
        } catch(e) {
            next(e);
        }
    }
    
}

module.exports = new UserController();