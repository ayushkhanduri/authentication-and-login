const   repl            =   require('repl'),
        v8n             =   require('v8n');

const replServer = repl.start({
    prompt: "node::v8n>"
});

replServer.context.v8n = v8n;
