import app from "./app";

const port = normalizePort(process.env.PORT || 3000);
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

function normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}