const Router = require("express");

const bcryptjs = require("bcryptjs");
const passport=require('passport')
const jwt = require("jsonwebtoken");
const session = require('express-session');

const userModel = require("./models/users");
const router = Router();

const localstrategy = require("passport-local");
passport.authenticate(new localstrategy(userModel.authenticate()));

passport.use(new localstrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


const sessionSecret = 'your-secret-key';
router.use(session({
  secret: 'your-secret-key', // Change this to a secure secret
  resave: false,
  saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());

 
router.post("/register", async function (req, res) {
  const { username, email, fullName } = req.body;
  const userData = new userModel({ email, username, fullName });

  userModel.register(userData, req.body.password, async function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    const { _id } = userData.toJSON();
    const token = jwt.sign({ _id: _id }, "secret");
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({
      message: "success",
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  try {
    const token = jwt.sign({ _id: req.user._id }, 'secret');
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect('/profile');

    console.log(token);
  } catch (error) {
    console.error('Error signing JWT:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } 
});

router.get("/profile",isLoggedIn, async function (req, res) {
  try{
const cookie=req.cookies['jwt']
const claims = jwt.verify(cookie,"secret")
if(!claims){
  return res.status(401).send({
    message:"unauthonicated"
  })
}
const userData=await userModel.findOne({_id:claims._id})
const { password,...data}= await userData.toJSON();
res.send(data)
  }
  catch(err){
    return res.status(401).send({
      message:"unauthonicated"
    })
  }
});
router.post('/logout', (req, res) => {
  res.cookie("jwt","",{maxAge:0})
  res.send({ message: 'Logout successful' });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
   
    return next();
  }
 
  res.redirect('/login');
  res.json({ message: "Auth successful in Login", username: req.username });
}
module.exports = router;

