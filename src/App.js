import { useEffect, useState } from 'react';
import TabMenu from './components/Tabs/TabMenu';
import { getPosts, getUsers } from './utils/api';
import PostList from './components/Posts/PostList/PostList';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

//TODO норм загрузку сделать, возможно с эмитацией долгой загрузки чтобы продемонстрировать
//TODO сделать презентациооное наполнение Фото и задачи

//TODO @media (для postList-header)

//TODO фиксированный размер приложения
//TODO добавить картинку в хедер
//TODO добавить футер с описанием приложения
//TODO option через функцию чтобы не было копипаста кода
//TODO Количество постов на странице как Страница 1 из 10
//TODO Header?
//TODO удалить лишние стили
//TODO В избранное
//TODO Стили модального окна (ну типа по середине и задний фон немного размытый)
//TODO реализовать нормальный Loading


const App = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('selectedTab') || 'posts');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const handleConfirmDelete = (postIdToDelete) => {
    setPosts(posts.filter((post) => post.id !== postIdToDelete));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('selectedTab', tab);
  };

  const handleFavorite = (e) => {
    console.log(e);
  }

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
  
  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  return (
    <div className="fetch-container">
      <h1 className='app-title'>Test Application</h1>
      <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'posts' && <PostList posts={posts} users={users} onDelete={e => handleConfirmDelete(e)} onFavorite={e => handleFavorite(e)}/>}
    </div>
  );
};

export default App;