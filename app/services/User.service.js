const   MongoService            =   require('./Mongo.service');
        UserModel               =   require('../models/User.model');

class UserService extends MongoService {

    constructor(UserModel) {
        super(UserModel);
    }

    get(queryParams={},projectionParams = {},quantity=1) {
        return this.find(queryParams,projectionParams,quantity);
    }
}


module.exports = new UserService(UserModel);
