const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

//set ejs view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: true}));


//all posts
const posts = [];


//get home page
app.get('/', (req, res)=>{
  res.locals.title = 'Home';
  res.render('index', {posts});
})

//get about page
app.get('/about', (req, res)=>{
  res.locals.title = 'About';
  res.render('about');
})

//get contact page
app.get('/contact', (req, res)=>{
  res.locals.title = 'Contact';
  res.render('contact');
})

//get create page (create new post)
app.get('/create', (req, res)=>{
  res.locals.title = 'Create Post';
  res.render('create');
})


//get post page when click on read more btn
app.get('/posts/:postTitle', (req, res)=>{
  const post = posts.find(post => _.lowerCase(post.title) === _.lowerCase(req.params.postTitle));
  res.locals.title = req.params.postTitle;
  res.render('post', {post});
})

//Create new post
app.post('/create', (req, res)=>{
  const postTitle = req.body.postTitle;
  const postDesc= req.body.postDesc; 
  if(postTitle !=='' && postDesc !==''){
    posts.push({
      title: postTitle,
      desc: postDesc
    });
  }
  res.redirect('/');
})


app.listen(5000, () => console.log("Server Running") );