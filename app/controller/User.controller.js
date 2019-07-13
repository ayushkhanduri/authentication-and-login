const   UserService                 =   require('../services/User.service'),
        {
            sendErrorResponse,
            sendSuccessResponse
        }                           =   require('../shared/utils'),

        {
            ERRORS,
            SUCCESS,
            HTTP_STATUS_CODE
        }                           =   require('../shared/constants'),
        v8n                            =   require('v8n')();

exports.findOne = async (req,res,next) => {
    const { phone } =  req.query;
    let message = null , data = null, HTTP_STATUS = null ;
    try{
        if(!v8n.number().exact(10).test(length)){
            HTTP_STATUS = HTTP_STATUS_CODE.CLIENT_ERRORS.UNPROCESSABLE_ENTITY;
            throw new HTTPException(ERRORS.VALIDATION.EQ_LENGTH.MSG("Number",10),ERRORS.VALIDATION.EQ_LENGTH.STATUS_CODE);
        }
        data = await UserService.get({ "phone": phone},{_id: 0 , hash: 0},'any');
        if(data)
            message = SUCCESS.FOUND.MSG;
        else {
            HTTP_STATUS = HTTP_STATUS_CODE.CLIENT_ERRORS.BAD_REQUEST;
            throw new HTTPException(ERRORS.NOT_FOUND.MSG("User"), ERRORS.NOT_FOUND.STATUS_CODE);
        }
        HTTP_STATUS = HTTP_STATUS_CODE.SUCCESS.GENERIC;
    }catch(error){
        const { message , errCode } = error;
        sendErrorResponse(res,HTTP_STATUS,message,errCode);
    }
    sendSuccessResponse(res,HTTP_STATUS,message,data,"User")
}

exports.addToCart = (req,res,next) => {
    const { product } = req.body;


}
