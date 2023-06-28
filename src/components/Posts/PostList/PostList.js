import Post from '../Post/Post';

import 'bootstrap/dist/css/bootstrap.min.css';
import './PostList.css'

const PostList = ({ paginatedPosts, users, handleDelete, handleFavorite, favoritePosts }) => {

  const getUserName = (users, id) => {
    if (users.length) {
      let user = users.find(item => item.id === id);
      return user.name;
    }
  }

  return (
    <div className="post-list">
      {paginatedPosts.map((post) => {
        const userName = getUserName(users, post.userId);
        const isPostInFavorites = favoritePosts.includes(post.id);

        return (
          <div key={post.id} className="mb-4">
            <Post post={post} userName={userName} onDelete={handleDelete} onFavorite={handleFavorite} isPostInFavorites={isPostInFavorites} />
          </div>
        )
      })}
    </div>
  );
};

export default PostList;
