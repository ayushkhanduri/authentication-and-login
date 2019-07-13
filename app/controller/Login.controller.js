const   UserModel                   =   require('../models/User.model'),
        UserService                 =   require('../services/User.service'),
        {
            ERRORS,
            SUCCESS,
            HTTP_STATUS_CODE
        }                           =   require('../shared/constants'),
        {
            sendErrorResponse,
            sendSuccessResponse
        }                           =   require('../shared/utils'),
        v8n                         =   require('v8n')(),
        { generateToken }           =   require('../middlewares/authorization');

exports.register = async (req,res,next) => {
    const userData = req.body;
    let user = null , HTTP_STATUS = null , message = null ;
    try {
        const UserInstance = new UserModel(userData);
        const hash = await UserInstance.setPassword(userData.password);
        if(hash)
            user = await UserInstance.save();
        else
            throw new HTTPException(ERRORS.CREATION_ERROR.MSG("password hash"),ERRORS.CREATION_ERROR.STATUS_CODE);
        HTTP_STATUS = HTTP_STATUS_CODE.SUCCESS.RECORD_CREATED;
    } catch (e) {
        console.log(e);
        message = e.message;
        HTTP_STATUS = HTTP_STATUS_CODE.SERVER_ERRORS.INTERNAL_SERVER_ERROR;
        sendErrorResponse(res,HTTP_STATUS ,message, e.errCode);
    }
    sendSuccessResponse(res,HTTP_STATUS, message, user, "User");
};

exports.login = async (req,res,next) => {
    const userDetails = req.body ;
    let message = null,data = null, token = null , HTTP_STATUS;
    try{
        const { length } = userDetails.phone;
        if(!v8n.number().exact(10).test(length)){
            HTTP_STATUS = HTTP_STATUS_CODE.CLIENT_ERRORS.UNPROCESSABLE_ENTITY;
            throw new HTTPException(ERRORS.VALIDATION.EQ_LENGTH.MSG("Number",10),ERRORS.VALIDATION.EQ_LENGTH.STATUS_CODE);
        }
        data = await UserService.get({ "phone": userDetails.phone},{_id: 0 },1);
        if(data){
            const isValid = await data.validateUser(userDetails.password);
            data = data.toObject();
            delete data.hash;
            if(isValid){
                token = await generateToken(data);
                message = SUCCESS.FOUND.MSG("User");
                data.token = token;
                HTTP_STATUS = HTTP_STATUS_CODE.SUCCESS.GENERIC;
            }else{
                data = null;
                HTTP_STATUS = HTTP_STATUS_CODE.CLIENT_ERRORS.UNPROCESSABLE_ENTITY;
                throw new HTTPException(ERRORS.INCORRECT.MSG("Password"),ERRORS.INCORRECT.STATUS_CODE);
            }
        }else{
            HTTP_STATUS = HTTP_STATUS_CODE.CLIENT_ERRORS.UNPROCESSABLE_ENTITY;
            throw new HTTPException(ERRORS.NOT_FOUND.MSG("User"),ERRORS.NOT_FOUND.STATUS_CODE);
        }
    }catch (error) {
        const {errCode,message} = error;
        sendErrorResponse(res,HTTP_STATUS,message,errCode);
    }

    sendSuccessResponse(res,HTTP_STATUS,message,data,"User");
};
