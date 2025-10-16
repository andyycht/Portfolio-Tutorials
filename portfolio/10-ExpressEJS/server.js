const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
// TODO: configure the express server

const session = require("express-session");

app.use(session({
  secret: "c|ovequedeb(eríase3superlarg5aycompl?=icada",
  resave: false,
  saveUninitialized: true
}));

let posts = [];
let postId=1;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.post("/login", (req, res) => {
  
  const name = req.body.name;
  req.session.name = name;
  const methodd= "POST";
  res.render('test', { name,methodd}); 
});

app.get("/login", (req, res) => {

  const name = req.query.name || req.session.name;
  const methodd= "GET";
  res.render('test', { name,methodd }); 
});

app.get("/home", (req, res) => {

  if (!req.session.name) return res.redirect("/");
  res.render('home', { name: req.session.name, posts: posts || [] });
  
});

app.post("/postss", (req, res) => {

  const { title, content } = req.body;
  posts.push({ id: postId++, title, content });
    
  res.redirect('/home');});

app.get("/post/:id", (req, res) => {

  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).send("Post no encontrado");
  }

  res.render("post", { post, name: req.session.name });
});

app.post("/post/:id/edit", (req, res) => {

    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).send("Post not found");

    post.content = req.body.content;
    res.redirect(`/post/${id}`);
});

app.post("/post/:id/delete", (req, res) => {

    const id = parseInt(req.params.id);
    posts = posts.filter(p => p.id !== id); 
    res.redirect("/home");
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
