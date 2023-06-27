import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Posts.css'
import PostListHeader from '../Post/PostListHeader/PostListHeader';
import PostList from '../PostList/PostList';

const Posts = ({ posts, users, onDelete }) => {
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [favoritePosts, setFavoritePosts] = useState([]);

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

  const deleteFromFavorite = (postId) => {
    const isPostInFavorites = favoritePosts.includes(postId);
    if (isPostInFavorites) {
      const updatedFavoritePostsId = favoritePosts.filter(id => id !== postId);
      localStorage.setItem('favoritePosts', JSON.stringify(updatedFavoritePostsId));
    }
  };

  const handleDelete = (postId) => {
    deleteFromFavorite(postId);
    onDelete(postId);
  };

  // Pagination
  const handlePerPageChange = (event) => {
    const newPerPage = Number(event.target.value);
    setPerPage(newPerPage);
    localStorage.setItem('perPage', newPerPage);
    setCurrentPage(1);
  };
  const paginatedPosts = posts.slice((currentPage - 1) * perPage, currentPage * perPage);

  useEffect(() => {
    const storedFavoritePosts = localStorage.getItem('favoritePosts');
    if (storedFavoritePosts?.length) {
      setFavoritePosts(JSON.parse(storedFavoritePosts));
    }
  }, []);

  useEffect(() => {
    const storedPerPage = localStorage.getItem('perPage');
    if (storedPerPage) {
      setPerPage(Number(storedPerPage));
    }
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(posts.length / perPage));
    if (posts && users) {
      //TODO setTimeout(() => setComments(fetchedComments), 1000); //For testing long loading
      setLoading(false);
    }
  }, [posts, users, perPage]);

  return (
    <div className="posts">
        <PostListHeader 
        loading={loading} 
        posts={posts} 

        totalPages={totalPages}
        currentPage={currentPage} 
        perPage={perPage}
        handlePerPageChange={handlePerPageChange}
        setCurrentPage={setCurrentPage}/>
        
        <PostList paginatedPosts={paginatedPosts} users={users} handleDelete={handleDelete} handleFavorite={handleFavorite} favoritePosts={favoritePosts}/>
    </div>
  );
};

export default Posts;
