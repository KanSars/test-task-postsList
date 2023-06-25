import React, { useEffect, useState } from 'react';
import TabMenu from './components/Tabs/TabMenu';
import { getPosts } from './utils/api';
import PostList from './components/Posts/PostList';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('selectedTab') || 'posts');
  const [posts, setPosts] = useState([]);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('selectedTab', tab);
  };

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);



  return (
    <div className="container">
      <h1 className='mt-5'>My App</h1>
      <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'posts' && <PostList posts={posts}/>}
    </div>
  );
};

export default App;

/*
{activeTab === 'posts' && <PostList posts={posts}/>}
{activeTab === 'posts' && <PostList />}
      {activeTab === 'photos' && <AlbumList />}
      {activeTab === 'tasks' && <TaskList />}
*/