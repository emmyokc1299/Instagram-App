const router = require("express").Router()

const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//SIGNUP

router.post("/signup", async (req, res) => {
    console.log(req, res)
    const newUser = new User({
        identity: req.body.identity,
        fullname: req.body.fullname,
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()

        // CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    try{
        const savedUser = await newUser.save()
        // console.log(savedUser)
        // res.status(201).json(savedUser)
        // console.log(res)

        const accessToken = jwt.sign(
            {
                id: savedUser._id
            },
            process.env.JWT_SEC,
            {expiresIn: "3d"}
        )
 
        const {password, ...others} = savedUser._doc

        res.status(200).json({ ...others, accessToken})
 
    }
    catch(err) {
        res.status(500).json(err)
        console.log(err)
    }
})

// LOGIN
router.post("/login", async(req, res) => {
    try{   
        
        let user = await User.findOne({identity: req.body.identity})
         
         if (!user) {
            user = await User.findOne({username : req.body.identity})
         }
         !user && res.status(401).json("Wrong credentials")

         const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
         const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)   
        
        // const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        //  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)   
        

        // console.log(originalPassword)
         originalPassword !== req.body.password && res.status(401).json("Wrong credentialsss")
  
         const accessToken = jwt.sign(
             {
                 id: user._id
             },
             process.env.JWT_SEC,
             {expiresIn: "3d"}
         )

         const {password, ...others} = user._doc

         res.status(200).json({ ...others, accessToken})
        //  console.log(`This is the access Token ${accessToken}`)
    }
    catch(err){  
        res.status(500).json(err)
    }

})

module.exports = router