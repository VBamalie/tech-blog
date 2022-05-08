const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    // we want to go ahead and finishing the routing to get all the posts
    try{
        const dbUserPosts = await Post.findAll();
        const postsDashboard = dbUserPosts.map((posts)=> posts.get({plain:true}));
        res.render("posts", postsDashboard)
    }catch(err) {res.status(500).json(err)}
});

router.get("/new", withAuth, (req, res) => {
// for showing new posts to the user
})

router.get("/edit/:id", withAuth, async (res, req) => {
    // To be able to find posts by primary key and render the edit post on the dashboard
})

module.exports = router;