import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

const TabMenu = ({ activeTab, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  const handleTabClick = (tab) => {
    if (selectedTab !== tab) {
      setSelectedTab(tab);
      onTabChange(tab);
    }
  };

  useEffect(() => {
    const storedTab = localStorage.getItem('selectedTab');
    if (storedTab && storedTab !== selectedTab) {
      setSelectedTab(storedTab);
    } else {
      localStorage.setItem('selectedTab', selectedTab);
    }
  }, [selectedTab]);

  return (
    <ul className="nav nav-tabs">
      <li className={`nav-item ${activeTab === 'posts' ? 'active' : ''}`}>
        <button
          className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => handleTabClick('posts')}
        >
          Посты
        </button>
      </li>
      <li className={`nav-item ${activeTab === 'photos' ? 'active' : ''}`}>
        <button
          className={`nav-link ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => handleTabClick('photos')}
        >
          Фото
        </button>
      </li>
      <li className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}>
        <button
          className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => handleTabClick('tasks')}
        >
          Задачи
        </button>
      </li>
    </ul>
  );
};

export default TabMenu;
