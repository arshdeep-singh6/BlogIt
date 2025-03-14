import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
let posts = [];
let postId = 0;

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
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
    res.redirect("/");
});


app.post("/delete", (req, res) =>
{
    let post = req.body;
    for(let i = 0; i < posts.length; i ++)
    {
        if(posts[i].id === parseInt(post.id))
        {
            posts.splice(i, 1);
        }
    }
    res.redirect("/");
});

app.post("/update/:id", (req, res) =>{

    posts.forEach(post => {
        if(post.id === parseInt(req.params.id))
        {
            post.title = req.body.title;
            post.content = req.body.content;
        } 
    });
    res.redirect("/");
})


app.post("/edit", (req, res) =>
{
    let post = req.body;
    let postIndex = -1;
    for(let i = 0; i < posts.length; i ++)
    {
        if(posts[i].id === parseInt(post.id))
        {
            postIndex = i;
        }
    }
    if(postIndex !== -1)
    {
        let blog = posts[postIndex];
        res.render("edit.ejs", {post:blog});
    }
    else
    {
        res.redirect("/");
    }
    
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}.`);
});


