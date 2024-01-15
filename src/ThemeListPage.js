import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ThemeListPage() {
  const [userInfo, setUserInfo] = useState({});
  const [themeList, setThemeList] = useState([]);

  useEffect(() => {
    // Assuming you have the user_id available (replace 1 with the actual user_id)
    const user_id = 1;

    // Fetch user information and theme list
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/user_info/${user_id}`);
        setUserInfo(response.data.user_info);
        setThemeList(response.data.themes);
      } catch (error) {
        console.error('An error occurred:', error.response.data.error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <header className="bg-primary text-white py-4">
        <div className="container-fluid">
          <h1 className="display-8 text-center">Theme List Page</h1>
        </div>
      </header>
      <main className="mt-4">
        <section>
          <h2>User Information</h2>
          <p>User ID: {userInfo.id}</p>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
        </section>
        <section className="mt-4">
          <h2>Theme List</h2>
          <ul className="list-group">
            {themeList.map((theme, index) => (
              <li key={index} className="list-group-item">
                <strong>Title:</strong> {theme.title}<br />
                <strong>Interest:</strong> {theme.request}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="mt-4 text-center">
        <p>&copy; 2023 Theme App</p>
      </footer>
    </div>
  );
}

export default ThemeListPage;
