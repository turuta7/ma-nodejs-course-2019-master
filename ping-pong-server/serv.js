const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;
const time = process.env.TIME || 1000;

const server = http.createServer((req, res) => {

    let statusCode = 404;


    let result = 'not';

    const url_parts = url.parse(req.url);

    const query = url_parts.query;
    const pathname = url_parts.pathname;

    if (!query) { console.log('not query: /ping?time=1000');
    result = JSON.stringify({ msg: 'not query: /ping?time=1000'});
    statusCode = 400;
    res.end(result);
    return; }

    const queryTime = parseInt(query.replace(/\D+/g, ""));

    
    if (pathname === '/ping') {
        res.setHeader('Content-Type', 'applicarion/json');

        if (time > queryTime) {
            statusCode = 200;
            setTimeout(() => {
                console.log('status: 200');
                result = JSON.stringify({ msg: 'status: 200' })
                res.end(result)
            }, time);

        } else {
            statusCode = 400;
            setTimeout(() => {
                console.log('limited time offer');
                result = JSON.stringify({ msg: 'limited time offer' })
                res.end(result)
            }, time);
        }
    }
    res.statusCode = statusCode;   
});

server.listen(port, () => {
    console.log(`Server works port ${port}`);
})