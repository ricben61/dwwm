const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        content: {
            type: String,
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }]
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Category", categorySchema);