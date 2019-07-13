const   { Router }          =   require('express'),
        UserController      =   require('../controller/User.controller'),
        UserRouter          =   Router();

UserRouter.get('/',UserController.findOne);

UserRouter.post('/cart',UserController.addToCart);

module.exports = UserRouter;
