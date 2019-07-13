const   express                 =   require('express'),
        mongoose                =   require('mongoose'),
        bodyParser              =   require('body-parser'),
        timeout                 =   require('connect-timeout'),
        cors                    =   require('cors'),
        {
            haltOnTimeout
        }                       =   require('./app/middlewares/timeout'),
        router                  =   require('./app/routes'),
        app                     =   express(),
        {
            PORT: port = 4000,
            DB_NAME,
            DB_DOMAIN,
            DB_PORT
        }                       =   process.env;

require('./config/PrototypeOverriding');

(async () =>{
    try {
        const connect = await mongoose.connect(`mongodb://${DB_DOMAIN}:${DB_PORT}/${DB_NAME}`, {
            useNewUrlParser: true
        })
        console.log("Connected to mongodb");
    }catch(e){
        console.log(e);
        process.exit();
    }
})();

/**
 * middlewares
 */

app.use(cors());
app.use(bodyParser.json()); // for parsing incoming requests to json
app.use(timeout(120000)); // for timeout
app.use('/api',router); //routing
app.use(haltOnTimeout);

app.listen(port,() => {
    console.log(`Listening to port ${port}`);
})


