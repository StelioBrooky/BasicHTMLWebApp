http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', 'views');

const routes = require('./routes/routes.js');
app.use('/', routes);

module.export =  port;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))