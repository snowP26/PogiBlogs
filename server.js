const express = require('express');
const db = require('mongoose');
const _ = require('lodash');
const morg = require('morgan');
const blogs = require('./schema/BlogSchema');
const blogRoutes = require('./routes/blogRoutes');

//vars
const port = 3000;
const dbserver = 'mongodb+srv://BlogsGroupings:Hm1ZJqFE9LomvXk0@blogs.sev2k5w.mongodb.net/'
const app = express();

//url submit to db
app.use(express.urlencoded({ extended: true}));

//databse and server port connection
app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log('server connection established');   
})

db.connect(dbserver)
    .then((result) =>console.log('database connection established'))
    .catch((err) => console.log(err));

//view
app.set('view engine', 'ejs');

//public
app.use(express.static('public'));
app.use(morg('dev'));

//connection confirmation
app.use((req, res, next) => {
    console.log('Connection Established');
    console.log('host', req.hostname);
    console.log('path', req.path);
    console.log('method: ', req.method);
    next();
});

app.get('/', (req,res) => {
    res.redirect('/Blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);



//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});