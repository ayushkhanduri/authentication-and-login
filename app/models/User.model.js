const   { Schema,model }    =   require('mongoose'),
        {
            generateHash,
            compareHash
        }                   =   require('../shared/utils'),
        Int32               =   require('mongoose-int32');


        UserSchema          =   new Schema({
            phone: {
                type: String,
                required: true,
                unique: true
            },
            hash: {
                type: String,
                required: true,
                unique: true
            },
            fName: {
                type: String,
                required: true
            },
            address: {
                type: String
            },
            lName: {
                type: String,
                required: false
            },
            orderHistory: [],
            gender: {
                type: String,
                required: true
            },
            age: {
                type: Int32,
                required: true
            },
            cart: {
                type: Array,
                default: []
            },
            companyName: {
                type: String
            },
            location: {
                type: {
                        latitude: {
                            type: String
                        },
                        longitude: {
                            type: String
                        },
                },
                required: true
            }

        });

/**
 *
 * @param {string} password
 */
UserSchema.methods.setPassword = async function(password) {
    try {
        const hash = await generateHash(password);
        this.hash = hash;
        return Promise.resolve(hash);
    }catch(e) {
        return Promise.reject(e);
    }
};

/**
 *
 * @param {string} password
 * @returns {Promise<Promise<any>|Promise<never>|undefined>}
 */
UserSchema.methods.validateUser = async function (password) {
    try {
        const hashMatched = await compareHash(password,this.hash);
        return Promise.resolve(hashMatched);
    }catch(e){
        console.log(e);
        return Promise.reject(e);
    }
}

module.exports = model('Users',UserSchema);
