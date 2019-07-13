const   { Router }              =   require('express'),
        LoginRoutes             =   require('./Login.route'),
        UserRoutes              =   require('./User.route'),

        {
            authenticateToken
        }                       =   require('../middlewares/authorization');
        IndexRouter             =   Router();


IndexRouter.use('/auth',LoginRoutes);

IndexRouter.use(authenticateToken);

IndexRouter.use('/user',UserRoutes);


module.exports = IndexRouter;
