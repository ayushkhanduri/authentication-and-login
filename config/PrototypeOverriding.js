/**
 * String Overriding
 */

String.prototype.toFirstUppercase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


/**
 * HTTPException
 */


class HTTPException extends Error {
    constructor(message,errCode=999) {
        super(message);
        this.errCode = errCode;
    }
};

global.HTTPException = HTTPException;
