/*
simple server for ts data i/o

GET:
  /csv -> a single csv file. reqest body contains query parameters

*/

const express = require('express')
const app = express()

require('./server/routes.js')(app);

app.use('/static', express.static('client/dist'));

// default handler for anything not routed
app.use(function (err, req, res, next) {
 console.error(err.stack);
 res.status(400).send(err.message);
});

app.listen(3000, () => console.log('app is listening on 3000'))
