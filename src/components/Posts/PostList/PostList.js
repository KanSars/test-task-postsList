import { useState, useEffect } from 'react';
import Post from '../Post/Post';

import 'bootstrap/dist/css/bootstrap.min.css';
import './PostList.css'

const PostList = ({ posts, users, onDelete, onFavorite }) => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    const storedFavoritePosts = localStorage.getItem('favoritePosts');
    if (storedFavoritePosts?.length) {
      setFavoritePosts(JSON.parse(storedFavoritePosts));
    }
  }, []);

  const handleFavorite = (postId) => {
    const isPostInFavorites = favoritePosts.includes(postId);
    if (isPostInFavorites) {
      // Удаление поста из избранных, если он уже там
      const updatedFavoritePostsId = favoritePosts.filter(id => id !== postId);
      setFavoritePosts(updatedFavoritePostsId);
      localStorage.setItem('favoritePosts', JSON.stringify(updatedFavoritePostsId));

    } else {
      // Добавление поста в избранные
      const updatedFavoritePostsId = [...favoritePosts, postId];
      setFavoritePosts(updatedFavoritePostsId);
      localStorage.setItem('favoritePosts', JSON.stringify(updatedFavoritePostsId));
    }
  };

  useEffect(() => {
    const storedPerPage = localStorage.getItem('perPage');
    if (storedPerPage) {
      setPerPage(Number(storedPerPage));
    }
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(posts.length / perPage));
    if (posts && users) {
      setLoading(false);
    }
  }, [posts, users, perPage]);

  const handleDelete = (postId) => {
    onDelete(postId);
  };

  // Pagination
  const handlePerPageChange = (event) => {
    const newPerPage = Number(event.target.value);
    setPerPage(newPerPage);
    localStorage.setItem('perPage', newPerPage);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const paginatedPosts = posts.slice((currentPage - 1) * perPage, currentPage * perPage);


  const getUserName = (users, id) => {
    if (users.length) {
      let user = users.find(item => item.id === id);
      return user.name;
    }
  }

  const getPostListHeader = () => {
    return (
      <div className="postList-header">
          <div className='page-selection'>
            <label htmlFor="perPageSelect" className="form-label">
              Количество постов на странице:
            </label>
            <select id="perPageSelect" className="form-select" value={perPage} onChange={handlePerPageChange} >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={posts.length}>Все</option>
            </select>
          </div>
          {getSelectBar()}
        </div>
    )
  }

  const getSelectBar = () => {
    return (
      <>
        {loading ?
          (null) :
          <div className="pagination-buttons">
            <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1} >
              Предыдущая страница
            </button>
            <span className="mx-2">
              Страница {currentPage} из {totalPages}
            </span>
            <button className="btn btn-primary" onClick={handleNextPage} disabled={currentPage === totalPages} >
              Следующая страница
            </button>
          </div>
        }
      </>
    )
  }

  const getPostList = () => {
    return (
      <>
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <div className="posts">
          {paginatedPosts.map((post) => {
              const userName = getUserName(users, post.userId);
              const isPostInFavorites = favoritePosts.includes(post.id);
              return (
                <div key={post.id} className="post mb-4">
                  <Post post={post} userName={userName} onDelete={handleDelete} onFavorite={handleFavorite} isPostInFavorites={isPostInFavorites} />
                </div>
              )
            })}
          </div>
        )}
      </>
    )
  }

  return (
    <div className="post-list">
      <div className="mb-3">
        {getPostListHeader()}
      </div>
      {getPostList()}
    </div>
  );
};

export default PostList;
