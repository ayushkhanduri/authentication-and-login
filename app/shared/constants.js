module.exports = {
    skipUrls: ['/api/auth/*'],
    ERRORS: {
        /**
         *
         * @param {string} entity
         * @returns {string}
         */
        NOT_FOUND: {
            MSG: (entity) => `${entity.toFirstUppercase()} not found`,
            STATUS_CODE: 701
        },
        INCORRECT: {
            MSG: (entity) => `${entity.toFirstUppercase()} is invalid`,
            STATUS_CODE: 702
        },
        CREATION_ERROR: {
            MSG: (entity) => `Could not create ${entity}`,
            STATUS_CODE: 703
        },
        VALIDATION: {
            MAX_LENGTH: {
                /**
                 *
                 * @param {string} type
                 * @param {number | string}max
                 * @returns {string}
                 * @constructor
                 */
                MSG: (type,max) => `${type.toFirstUppercase()} length should not be greater than ${max}`,
                STATUS_CODE: 704
            },
            MIN_LENGTH: {
                /**
                 *
                 * @param {string} type
                 * @param {number | string}max
                 * @returns {string}
                 * @constructor
                 */
                MSG: (type,min) => `${type.toFirstUppercase()} length should not be less than ${min}`,
                STATUS_CODE: 705

            },
            EQ_LENGTH: {
                /**
                 *
                 * @param {string} type
                 * @param {number | string}max
                 * @returns {string}
                 * @constructor
                 */
                MSG: (type,min) => `${type.toFirstUppercase()} length should equal to ${min}`,
                STATUS_CODE: 706
            }
        }
    },
    SUCCESS: {
        FOUND: {
            MSG: (entity) => `${entity.toFirstUppercase()} found successfully`
        }
    },
    HTTP_STATUS_CODE: {

        SUCCESS: {
            GENERIC: 200, // FOR GENERAL GET REQUESTS FOR GETTING THE DATA
            RECORD_CREATED: 201, //WHEN A NEW ROW IS CREATED IN ANY COLLECTION
            NO_CONTENT:204 //WHEN THERE IS NO BODY
        },
        //These will mostly be used when implementing 3rd party libraries
        REDIRECTION: {
            RESOURCE_MOVED: 301
        },

        CLIENT_ERRORS : {
            BAD_REQUEST: 400, //wrong routing
            AUTHENTICATION: 401, // request not authenticated
            FORBIDDEN: 403, //not authorized
            REQUEST_TIMEOUT: 408,
            UNPROCESSABLE_ENTITY: 422 // when the user sends wrong information for processing

        },
        SERVER_ERRORS: {
            INTERNAL_SERVER_ERROR:500, // incase the server code breaks

        }

    }
};
