const   mongoose            =   require('mongoose');

class MongoService {

    constructor(mongooseModel) {
        this.mongooseModel = mongooseModel;
    }

    insert(data) {
        const dataModel = new this.mongooseModel(data);
        return dataModel.save();
    }

    find(findParams={}, projectParams = {}, quantity = 1) {
        let findQuery = null;
        if(quantity === 1)
            findQuery = this.mongooseModel.findOne.bind(this.mongooseModel);
        else
            findQuery = this.mongooseModel.find.bind(this.mongooseModel);

        return findQuery(findParams,projectParams);
    }


    // update(findParams, $setParams, quantity = 1) {
    //     let updateQuery = null ;
    //     if(quantity === 1)
    // }
}


module.exports = MongoService;
