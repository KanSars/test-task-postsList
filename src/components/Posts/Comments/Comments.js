import { useEffect, useState } from 'react';
import { getComments } from '../../../utils/api';
import { Spinner } from 'react-bootstrap';
import Comment from '../Comment/Comment';
import ErrorIndicator from '../../ErrorIndicator/ErrorIndicator';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Comments.css'

const Comments = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasData, setHasData] = useState(false);

    const spinner = loading ? <div className='spinner'><Spinner/></div> : null;
    const commentsList = hasData ? comments.map((comment) => <Comment key={comment.id} comment={comment} />) : null;
    const errorMessage = error ? <ErrorIndicator/> : null;

    const fetchComments = async (id) => {
        try {
            //throw new Error('Test error'); //For testing ErrorIndicator
            const fetchedComments = await getComments(id);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!loading && !error) {
            setHasData(true);
        }
    }, [loading, error])

    useEffect(() => {
        //fetchComments(id);
        setTimeout(() => fetchComments(id), 1000); //For testing long loading
    }, [id])

    return (
        <div className="comment card mb-3">
            {spinner}
            {commentsList}
            {errorMessage}
        </div>
    );
};

export default Comments;