const express = require('express');
const { 
    getAllDiscussions, postDiscussion, getDiscussionById,
    upvoteDiscussion, downvoteDiscussion, addComment,
    deleteComment, deletePost } = require('../../controller/discussionControllers');

    const { verifyToken, isAuthor } = require( '../../middleware/jwtAuth');

    const router = express.Router();

router.get('/',getAllDiscussions);
router.get('/:discussionId', getDiscussionById);
router.post('/',verifyToken, postDiscussion);
router.delete('/:discussionId',verifyToken, isAuthor, deletePost);
router.post('/upvote/:discussionId',verifyToken, upvoteDiscussion);
router.post('/downvote/:discussionId',verifyToken, downvoteDiscussion);
router.post('/comment/:discussionId',verifyToken, addComment);
router.delete('/comment/:discussionId/:comment_id', verifyToken, isCommenter,  deleteComment);


module.exports = router;