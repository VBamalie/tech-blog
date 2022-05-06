const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    // Creating a new instance of user
    try {
        const dbUserData = await User.create({
            usernameEl: req.body.usernameEl,
            passwordEl: req.body.passwordEl
        });

        req.session.save(()=> {
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        });
    } catch (err) { res.status(500).json(err)}
});

router.post("/login", async (req, res) => {
    // User login
    try {
        const dbUserData = await User.findOne({
            where: {
                usernameEl: req.body.usernameEl,
            }
        })
        if(!dbUserData){ res.status(400).json({message: "incorrect Username"})};
        const validPsswrd = await dbUserData.checkPassword(req.body.passwordEl);
        if(!validPsswrd){ res.status(400).json({message: "Incorrect Password"})};
        req.session.save(()=>{
            req.session.loggedIn = true;
            res.status(200).json({ user: dbUserData, message: `${dbUserData} is now logged in!`})
        });
    } catch (err){res.status(500).json(err)}
});

router.post("/logout", async (req, res) => {
    // User logout
});

module.exports = router;