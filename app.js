const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const cookieparser = require('cookie-parser');
const userModel = require("./models/user")
const postModel = require("./models/post")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const post = require('./models/post');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


app.get('/', (req, res) => {
    res.render('index');
});

app.get("/profile", isLoggedin ,async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("post");
    res.render('profile',{user});
})
app.get("/like/:id", isLoggedin ,async (req,res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate("user");
    
        if(post.Likes.indexOf(req.user.userid) === -1){
            post.Likes.push(req.user.userid);
        }
        else {
            post.Likes.splice(post.Likes.indexOf(req.user.userid),1);
        }
        await post.save() ;
     
        res.redirect("/profile") ;
})

app.get("/edit/:id", isLoggedin ,async (req,res)=>{
    let post = await postModel.findOne({_id: req.params.id}).populate("user");
      res.render("edit", {post});
})

app.post("/update/:id", isLoggedin ,async (req,res)=>{
    let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content : req.body.content});
     res.redirect("/profile")
})


app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/login")
})


app.post("/register", async (req, res) => {

    let { email, password, username, name, age } = req.body;
    let user = await userModel.findOne({ email });
    /*err*/if (user) return res.status(500).send('already resitered'); // if user exists

    bcrypt.genSalt(10, (err, salt) => { //works
        bcrypt.hash(password, salt, async (err, hash) => { //also works
            // console.log(hash); 
            let user = await userModel.create({
                username,
                name,
                email,
                age,
                password: hash,
            });

            //now gotta send it via a cookie
            let token = jwt.sign({ email: email, userid: user._id }, "shhh");
            res.cookie("token", token);
            res.send('registered 👍');
        });
    });
});

app.post("/login", async (req, res) => {

    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    /*err*/if (!user) return res.status(500).send('something went wrong💦'); // if user exists 

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "shhh");
            res.cookie("token", token);            
            res.status(200).redirect("/profile");
        }
        else res.redirect("./login")
    })
});

app.post("/post" , isLoggedin ,async(req,res)=>{
   
    let user = await userModel.findOne({email : req.user.email });
    // let {content}  = req.body ;    
    let post = await postModel.create({
            user: user._id ,
            content: req.body.content, 
        });
        user.post.push(post._id);
        await user.save();
        res.redirect("/profile");
}) ;

function isLoggedin(req ,res , next){
 if (req.cookies.token === "") res.send("you must be logged in") ; 
 else{
    let data = jwt.verify(req.cookies.token , "shhh") ;
    req.user = data ;
 }
 next(); 
// res.send(req.cookies.token);       
}

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});