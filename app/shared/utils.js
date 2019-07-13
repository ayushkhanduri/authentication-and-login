const   bcrypt          =   require('bcrypt'),
        {
            SALT_ROUNDS: SALT_ROUNDS = 13
        }               =   process.env;

/**
 *
 * @param {string} str
 *
 */
exports.generateHash = (str) => bcrypt.hash(str, +SALT_ROUNDS);

/**
 *
 * @param {string} plainText
 * @param {string} hashStr
 * @returns {void | *}
 */
exports.compareHash = (plainText , hashStr) => bcrypt.compare(plainText, hashStr);

exports.sendSuccessResponse = (res, httpStatus, message, data , type) => {
    const responseObject = {
        data: {
            "type": type,
            "attributes": data
        },
        message,
    };

    res.status(httpStatus).send(responseObject);
};

exports.sendErrorResponse = (res, httpStatus, errMessage, errCode= 999) => {
    const responseObject = {
        error: errMessage,
        status: httpStatus,
        errCode: errCode
    };

    res.status(httpStatus).send(responseObject);
};


