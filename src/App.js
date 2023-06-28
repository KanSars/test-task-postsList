import { useEffect, useState } from 'react';
import TabMenu from './components/Tabs/TabMenu';
import { getPosts, getUsers } from './utils/api';
import Posts from './components/Posts/Posts/Posts';
import { Spinner } from 'react-bootstrap';
import ErrorIndicator from './components/ErrorIndicator/ErrorIndicator';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('selectedTab') || 'posts');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [postLoading, setPostsLoading] = useState(true);
  const [userLoading, setUsersLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasData, setHasData] = useState(false);

  const spinner = (postLoading || userLoading) ? <div className='spinner'><Spinner/></div> : null;
  const postList = hasData ? <Posts posts={posts} users={users} onDelete={e => handleConfirmDelete(e)} /> : null;
  const errorMessage = error ? <ErrorIndicator/> : null;

  const handleConfirmDelete = (postIdToDelete) => {
    setPosts(posts.filter((post) => post.id !== postIdToDelete));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('selectedTab', tab);
  };

  const fetchPosts = async () => {
    try {
      //throw new Error('Test error'); //For testing ErrorIndicator
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setError(true);
    } finally {
      setPostsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      //throw new Error('Test error'); //For testing ErrorIndicator
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError(true);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (!postLoading && !userLoading && !error) {
      setHasData(true);
    }
  }, [postLoading, userLoading, error])

  useEffect(() => {
    //fetchPosts();
    //fetchUsers();
    setTimeout(() => fetchPosts(), 1000); //For testing long loading
    setTimeout(() => fetchUsers(), 1000); //For testing long loading
  }, []);

  return (
    <div className="fetch-container">
      <h1 className='app-title'>Test Application</h1>
      <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'posts' && (spinner || postList || errorMessage)}
    </div>
  );
};

export default App;