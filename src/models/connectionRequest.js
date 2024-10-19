const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    toUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    fromUserId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

requestSchema.pre("save", function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("You can not send connection request to yourself!");
  }
  next();
});

module.exports = mongoose.model("ConnectionRequest", requestSchema);
