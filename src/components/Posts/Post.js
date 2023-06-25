import { useState } from 'react';
import Comments from './Comments';

import 'bootstrap/dist/css/bootstrap.min.css';

const Post = ({ post, userName, onDelete, onFavorite, onComment }) => {
    const [isActiveComments, setIsActiveComments] = useState(false);

    const handleFavorite = (postId) => {
        onFavorite(postId);
      };
      
    const handleComment = async () => {
        if (isActiveComments) {
            setIsActiveComments(false);
          } else {
            setIsActiveComments(true);
          }
      };

      const handleDelete = (postId) => {
        onDelete(postId);
      };

    return (
        <div className="card-body">
            <h3 className="card-title">{post.title}</h3>
            <p className="card-text">Добавил: {userName}</p>
            <p className="card-text">{post.body}</p>
            <button className="btn btn-primary" onClick={() => handleComment(post.id)}>
                {isActiveComments ? 'Скрыть комментарии' : 'Комментарии'}
            </button>
            <button className="btn btn-success" onClick={() => handleFavorite(post.id)}>
                В избранное
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>
                Удалить
            </button>
            {isActiveComments && <Comments id={post.id} />}
        </div>
    );
};

export default Post;