const   jwt                     =   require('jsonwebtoken'),
        {
            JWT_SECRET
        }                       =   process.env,
        {
            skipUrls,
            ERRORS
        }                       =   require('../shared/constants'),
        {
            sendErrorResponse
        }                       =   require('../shared/utils'),
        UserService             =   require('../services/User.service');



exports.authenticateToken = (req,res,next) => {
    const { url } = req;
    const shouldSkip = !skipUrls.every((item) => {
        if(item.indexOf("*")){
            const regEx = new RegExp(item);
            return !regEx.test(url);
        }else{
            return !item === url;
        }
    });

    if(shouldSkip){
        next();
        return;
    }

    const token = req.headers['auth'];
    jwt.verify(token,JWT_SECRET,async (err,payload) => {
        if(err){

        }
        else{
            try{
                const User = await UserService.get({"phone": payload.phone},{},1);
                if(User)
                    throw  new HTTPException(ERRORS.NOT_FOUND.MSG("user"),ERRORS.NOT_FOUND.STATUS_CODE);
                next();
            } catch(e){
                sendErrorResponse(res,401 ,e.message , e.statusCode);
            }
        }
    });
}

exports.generateToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload,JWT_SECRET, {
            //options
        }, (err,token) => {
            if(err)
                reject(err);
            else
                resolve(token);
        })

    })
}
