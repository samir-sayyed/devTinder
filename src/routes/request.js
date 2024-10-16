const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.userId;
      const status = req.params.status;
      const fromUserId = req.user._id;
      const fromUser = await User.findById(toUserId);

      const validRequests = ["interested", "ignored"];
      if (!validRequests.includes(status)) {
        return res.status(400).json({
          message: "Invalid status " + status,
        });
      }
      if (!fromUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or:[
            {fromUserId, toUserId },
            {fromUserId: toUserId, toUserId:fromUserId}
        ]
      })

      if(existingRequest){
        return res.status(400).json({
            message:"Request already exist"
        })
      }

      const request = new ConnectionRequest({
        toUserId,
        fromUserId,
        status,
      });

      await request.save();

      res.status(200).json({
        message: "Request sent succeesfully",
        request,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = requestRouter;