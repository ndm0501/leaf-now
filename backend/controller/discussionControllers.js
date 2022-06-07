const Discussion = require("../models/Discussion");
const User = require("../models/User");

const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find({});
    return res.status(200).json(discussions);
  } catch (e) {
    return res.status(500).json({ message: "Error fetching discussions" });
  }
};
const getDiscussionById = async (req, res) => {
  try {
    const post = await Discussion.findById(req.params.discussionId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.json(post);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
}
const postDiscussion =  async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  try {
    const user = await User.findById(req.session.userId);

    const newPost = new Discussion({
      title: req.body.title,
      text: req.body.text,
      name: user.name,
      user: req.session.userId
    });

    const post = await newPost.save();

    return res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

const upvoteDiscussion = async (req, res) => {
  try {
    const post = await Discussion.findById(req.params.discussionId);

    if(!post){
      return res.status(404).json({message: 'Discussion not found'})
    }

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.session.userId)) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    post.likes.unshift({ user: req.session.userId });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
const downvoteDiscussion = async (req, res) => {
  console.log(req.params)
  try {
    const post = await Discussion.findById(req.params.discussionId);

    if(!post){
      return res.status(404).json({message: 'Discussion not found'})
    }
    
    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.session.userId)) {
      return res.status(400).json({ message: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.session.userId
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
const addComment =  async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    const user = await User.findById(req.session.userId).select('-password');
    const post = await Discussion.findById(req.params.discussionId);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.session.userId
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteComment = async (req, res) => {
  try {
    const post = await Discussion.findById(req.params.discussionId);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ message: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.session.userId) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}
const deletePost = async (req, res) => {
  try {
    const post = await Discussion.findById(req.params.discussionId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.session.userId) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await post.remove();

    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
}

module.exports = {
  getAllDiscussions,
  postDiscussion,
  getDiscussionById,
  upvoteDiscussion,
  addComment,
  downvoteDiscussion,
  deleteComment,
  deletePost,
};
