import express from "express";
import bodyParser from "body-parser";
const app = express();

const port = 3000;
let posts = [];
let postId = 0;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));
app.use(express.json());

app.get("/", (req, res)=>{
    res.render("index.ejs",  {blogPosts: posts});

});

app.get("/posts", (req, res)=>{
    
    res.render("posts.ejs", {blogPosts: posts});
});


app.post("/postBlog", (req, res)=>{
    let blog = req.body;
    let num = Math.floor(Math.random() * 18) + 1;
    let imgAddress = `/images/img${num}.jpg`;
    blog.imgSource = imgAddress;
    blog.id = postId++;
    posts.push(blog);
    console.log(blog);
    res.redirect("/");
    // res.render("index.ejs", {blogPosts: posts, imgSource: imgAddress});
});


app.post("/delete", (req, res) =>
{
    let post = req.body;
    console.log(post);
    console.log(posts);
    for(let i = 0; i < posts.length; i ++)
    {
        if(posts[i].id === parseInt(post.id))
        {
            posts.splice(i, 1);
        }
    }
    res.redirect("/");
});


app.post("/edit", (req, res) =>
{
    let post = req.body;
    console.log(post);
    for(let i = 0; i < posts.length; i ++)
    {
        if(posts[i].id === parseInt(post.id))
        {
            
        }
    }
    res.redirect("/");
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}.`);
});


