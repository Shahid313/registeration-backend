const router = require('express').Router();
let Users = require('../../models/Users')
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.post('/signup',(req,res)=>{
    let hash_password;
    let fullName = req.body.fullName
    let email = req.body.email
    let password = req.body.password
    console.log(req.body)
    bcrypt.hash(password,saltRounds,(err,hash)=>{
      hash_password = hash
    })
    try{
      
       Users.findOne({email:email})
      .then(result=>{
        if(result != null){
  
          return res.send({
            "msg":"User Already Exist"
          })
  
  
        }else{
         
          const user = new Users({
            "fullName":fullName,
            "email":email,
            "password":hash_password
          });
  
           user.save();
          console.log("signed Up")
          return res.send({
            "msg":"User Registered Successfully"
          })
  
        }
  
      })
      
    }
    catch(err){
      return res.status(422).send(err.message)
    }
    
  
  
  })
  
  
  router.post('/signin',(req,res)=>{
    const {email,password} = req.body
     Users.findOne({email:email})
     .then(user=>{
      if(user != null){
        bcrypt.compare(password, user.password, function(error, response) {
          console.log(response)
         if(response == true){
           res.send({
             "user":user,
             "msg":"logged in Succesfully"
           })
         }else{
           res.send({
             "msg":"Incorrect email or password"
           })
         }
      });
      }else{
       res.send({
         "msg":"Incorrect email or password"
       })
     }
  
  
     })
    })

    module.exports = router;