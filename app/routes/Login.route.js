const   { Router }          =   require('express'),
        LoginController     =   require('../controller/Login.controller'),
        LoginRoutes         =   Router();

LoginRoutes.post('/register',LoginController.register);

LoginRoutes.post('/login',LoginController.login);

module.exports = LoginRoutes;
