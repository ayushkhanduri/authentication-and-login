exports.haltOnTimeout = function (req,res,next) {
    if(!req.timedout){
        next();
    }
}
