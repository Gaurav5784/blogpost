const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const newPostController = require('./controllers/newPost');
const homePageController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const flash = require('connect-flash')
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const validateController = require('./middleware/validationMiddleware');
const redirectAuthenticationMiddleware = require('./middleware/redirectAuthenticationMiddleware'); 
const authmiddleware = require('./middleware/authmiddleware');
const logoutontroller = require
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

mongoose.connect('mongodb+srv://Gurpreet5784:test@cluster0.itu0uok.mongodb.net/myFirstDatabase1?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
global.loggedIn = null;

app.use("", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});
app.use(flash());


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/posts/store', validateController);
app.use(expressSession({
  secret: 'chch',
}));

app.listen(3500, () => {
  console.log('App listening on port 3500');
});

app.get('/', homePageController);
app.post('/posts/store', storePostController);
app.get('/post/new', newPostController);
app.get('/post/:id', getPostController);
app.get('/auth/register', newUserController);
app.post('/user/register', storeUserController);
app.get('/auth/login', loginController);
app.post('/user/login', loginUserController);
