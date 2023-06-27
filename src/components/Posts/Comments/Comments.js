import { useEffect, useState } from 'react';
import { getComments } from '../../../utils/api';
import Comment from '../Comment/Comment';

import 'bootstrap/dist/css/bootstrap.min.css';

const Comments = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCommentsList = (comments) => {
        return (
            <>{loading ? (<p>Загрузка...</p>) : (comments.map((comment) => <Comment key={comment.id} comment={comment} />))}</>
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

    useEffect(() => {
        fetchComments(id);
    }, [id])

    useEffect(() => {
        if (comments) {
            setLoading(false);
        }
    }, [comments])

    return (
        <div className="comment card mb-3">
            {getCommentsList(comments)}
        </div>
    );
};

export default Comments;