const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
const env = require('dotenv').config();

const app = express();

//set ejs view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: true}));

//Database Connect
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("Database connected"))
.catch(err => console.log(err))

//create mongoose Schema
const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  }
});

//Create Post Model
const Post = mongoose.model('Post', postSchema);



//get home page
app.get('/', (req, res)=>{
  res.locals.title = 'Home';
  //get posts from database
  const allPosts = Post.find((err, postsFounded)=>{
    if(err){
      res.send(err);
    }else{
      res.render('index', {postsFounded});
    }
  })
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
app.get('/posts/:postId', (req, res)=>{
  //using mongoose find
  const findPost = Post.findById(req.params.postId, (err, postFounded)=>{
    if(err){
      res.send(err);
    }else{
      res.locals.title = postFounded.title;
      res.render('post', {postFounded});
    }
  })

})

//Create new post
app.post('/create', (req, res)=>{
  const postTitle = req.body.postTitle;
  const postDesc= req.body.postDesc; 
  if(postTitle !=='' && postDesc !==''){
    //Add The Post To Database
    const post = new Post({
      title: postTitle,
      desc: postDesc
    });
    post.save();
  }
  res.redirect('/');
})


app.listen(process.env.PORT, () => console.log("Server Running") );