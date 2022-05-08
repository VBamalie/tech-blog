const router = require("express").Router();
const { Post, Comment, User } = require("../models");


router.get("/", async (req, res) => {
    // get all posts for the homepage
    try{
        const dbPostData = await Post.findAll(
            {
            include:[{model: Comment}]
        }
        );
        const postGallery = dbPostData.map((posts)=> posts.get({plain:true})
        );
        res.render("all-posts-admin", 
            postGallery
        );
    }catch (err) { res.status(500).json(err)}
});

router.get("/post/:id", async (req, res) => {
    // get a single post
    try{
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [{model: Comment}]
        });
        const postGallery = dbPostData.get({plain: true});
        res.render("single-posts", {postGallery, loggedIn: req.session.loggedIn});
    } catch (err) {res.status(500).json(err)}
});

router.get("/login", (req, res) => {
    // login
    if(req.session.loggedIn){
        res.redirect("/");
        return
    }
    res.render("login")
});

router.get("/signup", (req, res) => {
    // signup
    if(req.session.signUp){
        res.redirect("/");
        return
    }
    res.render("signup");
})

module.exports = router;