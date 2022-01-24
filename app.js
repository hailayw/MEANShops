require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const router = require('./api/routes/shops-route');

require('./api/models/dbcon');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
//app.use(express.urlencoded({extended: true}));

//Middlewares: checking before routing to controllers 
app.use(cors({
    origin:'*',
    credentials: false
}));

//log requests
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

//serve static pages: index.html, page1.html, page2.html
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api/shops/:shopId/items', router);
app.use('/api', router);

const server = app.listen(process.env.PORT, () => {
    console.log(process.env.MSG_SERVER_START, server.address().port);    
});