const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name: {
        type: String
    },
    
    content: {
        type: String
    },

    
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;