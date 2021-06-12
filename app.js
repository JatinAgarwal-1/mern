const dotenv = require('dotenv')
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;

require('./DB/connection')
// const USer = require('./model/userSchema');

app.use(express.json());  // Json data will be converted to object 


app.use(require('./router/auth'));//Link the router file


const middleware = (req, res, next) => {
    next();
}

// middleware();


app.get('/', (req, res) => {
    res.send(`Hello World From The Server`);
});
app.get('/about', middleware, (req, res) => {
    res.send(`Hello World From The About`);
});
app.get('/contact', (req, res) => {
    res.send(`Hello World From The Contact`);
});
app.get('/signin', (req, res) => {
    res.send(`Hello World From The SignIn`);
});
app.get('/signup', (req, res) => {
    res.send(`Hello World From The SignUp`);
});
console.log("All Fine");


app.listen(PORT);
