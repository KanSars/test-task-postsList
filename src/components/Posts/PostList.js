import { useState, useEffect } from 'react';
import Post from './Post';

import 'bootstrap/dist/css/bootstrap.min.css';

const PostList = ({ posts, users, onDelete, onFavorite }) => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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

  const handleFavorite = (postId) => {
    onFavorite(postId);
  };

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

  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="perPageSelect" className="form-label">
          Количество постов на странице:
        </label>
        <select
          id="perPageSelect"
          className="form-select"
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={posts.length}>Все</option>
        </select>
      </div>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <div className="pagination">
            <button
              className="btn btn-primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Предыдущая страница
            </button>
            <span className="mx-2">
              Страница {currentPage} из {totalPages}
            </span>
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Следующая страница
            </button>
          </div>

          {paginatedPosts.map((post) => {
            const userName = getUserName(users, post.userId);
            return (
              <div key={post.id} className="post card mb-4">
                <Post
                  post={post}
                  userName={userName}
                  onDelete={handleDelete}
                  onFavorite={handleFavorite}
                />
              </div>
            )
          })}

        </>
      )}
    </div>
  );
};

export default PostList;
