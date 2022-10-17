http = require('http');
express = require('express');

const app = express();
const routes = require('./routes/routes.js');
//const adminroutes = require('./routes/admin.js');

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', routes);

const server = http.createServer(app);

server.listen(3000,'localhost');
