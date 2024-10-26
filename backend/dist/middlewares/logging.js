const logRequests = (req, res, next) => {
    /* Logs all requests to the server */
    console.log(`Incoming Request: ${req.method} ${req.url} - ${new Date()}`);
    next();
};
export default logRequests;
