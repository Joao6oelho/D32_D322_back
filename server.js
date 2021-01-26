const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';
const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const models = require("./models");
const expressValidator = require('express-validator');
const mysql = require('mysql');

const app = express();

app.use(cors({ exposedHeaders: ['Location'], }));
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/public'));
*/

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
//app.use(expressSanitizer());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  secret: 'webbookfca',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60000,
    httpOnly: true,
  }
}));


//app.use(expressValidator());
app.use(function(req, res, next) {
  // check if session exists
  if (global.sessData === undefined) {
    global.sessData = req.session;
    global.sessData.ID = req.sessionID;
  }
  else { // yes, cookie was already present
    console.log('session exists', global.sessData.ID);
  }
  next();
});


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./routes/auth.route.js')(app, passport);
require('./config/passport/passport.js')(passport, models.user);
//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    next();
});


const userRoutes = require('./routes/usersRoute');
const eventRoutes = require('./routes/eventsRoute');
const operationalsRoutes = require('./routes/operationalsRoute');
const materialsRoutes = require('./routes/materialsRoute');
const extraRoutes = require('./routes/extraRoute');

//Criação de rotas estáticas
app.use('./assets', express.static ('assets'));
app.use('./views', express.static ('views'));

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/operationals', operationalsRoutes);
app.use('/materials', materialsRoutes);
app.use('/api', extraRoutes);

const bd = require('./config/connectMySQL.js');

//Create bd connection
global.connection = mysql.createConnection({
    host: bd.host,
    database: bd.database,
    user: bd.user,
    password: bd.password,
    port: bd.port
});

//check bd connection
global.connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to MySQl...')
});


// Server connection
app.listen(port, (err) => {
    if (!err) {
        console.log(`Server runing at http://${host}:${port}`);
    } else console.log(err);
});

module.exports = app;

