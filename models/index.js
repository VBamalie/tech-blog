const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: "user_id"
});

Post.hasMany(Comment, {
    foreignKey: "post_id"
});

Comment.belongTo(User, {
  foreignKey: "use_id"
});

module.exports = {
    User,
    Comment,
    Post
};