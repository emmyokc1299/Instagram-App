const router = require("express").Router();
const Conversation = require("../models/Conversation");
const { verifyTokenAndAuthorization } = require("./verifyToken");

//new conv

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId],
    });

    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (err) {
        res.status(500).json(err)
    }
})


//get conv of a user

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId]},
        });
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(err)
    }
})

// remove conv of a user 
router.delete("/:convId", async (req, res) => {
    try{
        // const conversation = await Conversation.find({
        //     members: {$all: [req.params.friendId, req.params.userId]}
        // })
        const conversation = await Conversation.findById(req.params.convId);
        conversation && await conversation.deleteOne() 
        res.status(200).json("document has been deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
})

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;