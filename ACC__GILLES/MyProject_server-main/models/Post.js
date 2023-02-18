const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        author:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }],
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Post", postSchema);