const express = require('express');
const router = express.Router();
const User = require('./models/User');
const userValidation =require('./utils/userValidation')
const { register, updateProfile, updatePassword } = require('./controllers/userController');
const passport = require('passport')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('main/home')
});

const thereIsAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return res.redirect(301, '/');
  }
  next();
}


router.get('/register', (req,res)=>{
  if(req.user) {
    return res.redirect(301, '/');
  }
  res.render('auth/register',{errors: req.flash('errors')})
}) 

router.post('/register', userValidation,register);
// router.post('/register', (req,res,next)=>{
//   User.findOne({email:req.body.email}).then((user)=>{
//     if(user){
//       return res.status(401).json({msg:'User Already Exists'})
//     }else{
//       const user = new User()
//       user.profile.name = req.body.name
//       user.email = req.body.email
//       user.password = req.body.password

//       user.save((err)=>{
//         if(err) return next(err)
//         return res.status(200).json({message: 'success', user})
//       })
//     }
//   })
// })

router.get('/login', (req, res)=>{
  if(req.user) {
    return res.redirect(301, '/');
  }
  return res.render('auth/login',{errors: req.flash('errors')})
})

router.post('/login', passport.authenticate('local-login',{
  successRedirect:'/',
  failureRedirect:'/api/users/login',
  failureFlash:true
})
);

router.get('/profile', (req, res) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    return res.render('auth/profile');

  } else {
    return res.send('Unauthorized')
  }
});

router.get('/update-profile', (req, res) => {
  return res.render('auth/update-profile');
});

router.put('/update-profile', (req, res, next) => {
  updateProfile(req.body, req.user._id)
    .then((user) => {
      return res.redirect(301, '/api/users/profile')
    }).catch((err) => next(err));
});

router.put('/update-password', (req, res, next) => {
  updatePassword(req.body, req.user._id).then((user) => {
    return res.send('updated <br /> <a href="/logout">Logout</a>');
  }).catch((err) => next(err));
})

module.exports = router;
