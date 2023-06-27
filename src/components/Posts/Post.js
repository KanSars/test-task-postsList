import { useEffect, useState } from 'react';
import Comments from './Comments';
import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Post.css'


const Post = ({ post, userName, onDelete, onFavorite, isPostInFavorites }) => {
  const [isActiveComments, setIsActiveComments] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isPostInFavorites);
//  console.log('isPostInFavorites:', isPostInFavorites);


  useEffect(() => {
    //const isPostInFavorites = favoritePosts.some((favPost) => favPost.id === post.id);
    //setIsFavorite(isPostInFavorites);
  }, [post.id]);

  useEffect(() => {
    //localStorage.setItem(`post-${post.id}-isFavorite`, JSON.stringify(isFavorite));
  }, [post.id, isFavorite]);

  useEffect(() => {
    //const savedIsFavorite = localStorage.getItem(`post-${post.id}-isFavorite`);
    //setIsFavorite(savedIsFavorite ? JSON.parse(savedIsFavorite) : false);
  }, [post.id]);

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

  const handleDelete = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    onDelete(post.id);
    setIsDeleteConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <div className="card-body">
      <h5 className="card-title">{post.title}</h5>
      <p className="card-text">Добавил: {userName}</p>
      <p className="card-text">{post.body}</p>
      <button className="btn btn-primary" onClick={() => handleComment(post.id)}>
        {isActiveComments ? 'Скрыть комментарии' : 'Комментарии'}
      </button>
      <button className={`btn btn-success ${isPostInFavorites ? 'active' : ''}`} onClick={() => handleFavorite(post.id)}>
        {isPostInFavorites ? 'В избранном' : 'В избранное'}
      </button>
      <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>
        Удалить
      </button>
      {isActiveComments && <Comments id={post.id} />}

      <Modal
        show={isDeleteConfirmationOpen}
        onHide={cancelDelete}
        backdrop="static"
        keyboard={false}
        contentlabel="Подтверждение удаления"
        className="modal"
        overlayclassname="modal-overlay"
      >
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение удаления</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Вы уверены, что хотите удалить этот пост?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="secondary" onClick={cancelDelete}>
            Отмена
          </button>
          <button className="danger" onClick={confirmDelete}>
            Удалить
          </button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Post;