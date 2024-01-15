import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


function App() {
  const [title, setTitle] = useState('');
  const [request, setRequest] = useState('');
  const [userSuggestions, setUserSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    const response = await axios.get('http://127.0.0.1:5000/');
    setUserSuggestions(response.data.suggestions);
  };

  const saveTheme = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/save_theme', {
        title,
        request,
        user_id: 1,  // Replace with the actual user_id
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('An error occurred:', error.response.data.error);
    }
  };

  return (
    <div className="container mt-4">
       <header className="bg-primary text-white py-8">
        <div className="container-fluid">
          <h1 className="display-8 text-center">Theme Setting Page</h1>
        </div>
      </header>
      <main className="row mt-4">
        <section className="col-md-6">
          <h2>Suggestions</h2>
          <ul className="list-group">
            {userSuggestions.map((suggestion, index) => (
              <li key={index} className="list-group-item">{suggestion}</li>
            ))}
          </ul>
          <button className="btn btn-primary mt-3" onClick={fetchSuggestions}>Get Suggestions</button>
        </section>
        <section className="col-md-6">
          <h2>Theme Setting </h2>
          <div className="card p-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
            <label htmlFor="interest" className="form-label mt-3">Interest:</label>
            <textarea
              id="interest"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              className="form-control"
            />
            <button className="btn btn-success mt-3" onClick={saveTheme}>Save Theme</button>
          </div>
        </section>
      </main>
      <footer className="mt-4 text-center">
        <p>&copy; 2023 Theme App</p>
      </footer>
    </div>
  );
}

export default App;
