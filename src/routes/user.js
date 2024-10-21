const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


const userRouter = express.Router();
const PUBLIC_USER_FIELDS = "firstName lastName photo about skills age gender";

userRouter.get("/user/requests/requested", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", PUBLIC_USER_FIELDS);

    res.json({
      message: "Request fetched succefully",
      data: connectionRequest,
      count: connectionRequest.length,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" }
      ],
    })
      .populate("fromUserId", PUBLIC_USER_FIELDS)
      .populate("toUserId", PUBLIC_USER_FIELDS);

    const data = connectionRequest.map((row)=> {
        if(row.fromUserId.toString() === loggedInUser._id.toString()){
            return row.toUserId
        }
        return row.fromUserId
    })

    res.json({
      data: data
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try{
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page-1) * limit;

    const connectionRequest = await ConnectionRequest.find({
    $or:[
      {fromUserId: loggedInUser._id},
      {toUserId: loggedInUser._id}
    ]
    }).select("fromUserId toUserId");

    const hideUserIds = new Set();

    connectionRequest.forEach((request) =>{
      hideUserIds.add(request.fromUserId.toString());
      hideUserIds.add(request.toUserId.toString());
    });
    const users = await User.find({
      $and:[
        {_id: {$nin:Array.from(hideUserIds)}},
        {_id: {$ne: loggedInUser._id}}
      ]
    }).select(PUBLIC_USER_FIELDS)
    .skip(skip)
    .limit(limit);

    res.json({data: users, count: users.length});

  }catch(err){
    res.status(400).send("Error: " + err.message);
  }
})

module.exports = userRouter;
