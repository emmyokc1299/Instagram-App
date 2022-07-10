const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const user = require("../models/User")
const {verifyToken, verifyTokenAndAuthorization} = require("./verifyToken")


// Create a post
router.post("/",  async(req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err) { 
        res.status(500).json(err)
    }
}) 



// Edit post
router.put("/:id", verifyToken, async(req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        // console.log(post)
        if(post.userId === req.body.userId){
            await post.updateOne({ $set: {desc: req.body.desc}})
            res.status(200).json("the post has been updated")
        }
        else{
            res.status(403).json("you can update only your post")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})


// Delete a post
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("the post has been deleted")
        }
        else{
            res.status(403).json("you can delete only your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})


// Like/Dislike a post

router.put("/:id/like", verifyTokenAndAuthorization ,async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json(post)
            // res.status(200).json("the post has been liked")
        }
        else {
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json(post)
            // res.status(200).json("The post has been disliked")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})


// get a post 
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get timeline posts
router.get("/timeline/:userId", verifyToken, async (req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId})
            })
        );
        // console.log(userPosts.concat(...friendPosts))
        res.status(200).json(userPosts.concat(...friendPosts))

    }
    catch(err){
        res.status(500).json(err)
    }
})


//get user's all posts

router.get("/profile/:username", verifyToken, async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router