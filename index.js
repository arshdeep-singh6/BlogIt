import express from "express";
import bodyParser from "body-parser";
const app = express();

const port = 3000;
let posts = [];
let postId = 0;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

app.get("/", (req, res)=>{
    posts = [];
    res.render("index.ejs");

});

app.get("/posts", (req, res)=>{
    res.render("posts.ejs");
});

app.post('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id); // Parse ID from URL parameter
    const index = data.findIndex(item => item.id === id);
  
    // Check if data exists for the ID
    if (index === -1) {
      return res.status(404).send("Data not found");
    }
  
    // Remove data from the array using splice
    data.splice(index, 1);
  
    res.json({ message: "Data deleted successfully" });
  });

app.post("/postBlog", (req, res)=>{
    let blog = req.body;
    let num = Math.floor(Math.random() * 18) + 1;
    let imgAddress = `/images/img${num}.jpg`;
    blog.imgSource = imgAddress;
    blog.id = postId++;
    posts.push(blog);
    console.log(blog);
    res.redirect("index.ejs", {blogPosts: posts, imgSource: imgAddress});
});


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}.`);
});


