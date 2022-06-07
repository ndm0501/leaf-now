import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Discussion from '../components/Discussion';

//Actions
import { getAllDiscussions } from "../redux/actions/discussionActions";

const DiscussionScreen = () => {
    const dispatch = useDispatch();
    const discussionsDetails = useSelector((state) => state.discussions);
    const { loading, error, discussions =[] } = discussionsDetails;
    debugger
    useEffect(() => {
        dispatch(getAllDiscussions());
      }, [dispatch]);
console.log(discussions)
    return (
        discussions.map(
            discussion => (
            <Discussion
                key={discussion._id}
                id={discussion._id}
                title={discussion.title}
                text={discussion.text}
                author={discussion.name}
                likes={discussion.likes}
                comments={discussion.comments}
                createdAt={discussion.createdAt}
            />))
    )
}
export default DiscussionScreen;