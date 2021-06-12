const Mongoose = require('mongoose');

const DB = process.env.DATABASE;

Mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected');
}).catch((e) => {
    console.log('no connection');
});