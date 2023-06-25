import { useEffect, useState } from 'react';
import Comment from './Comment';
import { getComments } from '../../utils/api';

import 'bootstrap/dist/css/bootstrap.min.css';

const Comments = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComments(id);
    }, [id])

    useEffect(() => {
        if (comments) {
            setLoading(false);
        }
    }, [comments])

    const getCommentsList = (comments) => {
        return (
            <>
                {loading ? (<p>Загрузка...</p>) : (comments.map((comment) => <Comment key={comment.id} comment={comment} />))}
            </>
        )
    }

    const fetchComments = async (id) => {
        try {
            const fetchedComments = await getComments(id);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    return (
        <div className="comment card mb-3">
            {getCommentsList(comments)}
        </div>
    );
};

export default Comments;