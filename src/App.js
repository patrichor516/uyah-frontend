import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [authors, setAuthors] = useState([])
  useEffect(() => {
    // Lakukan permintaan GET menggunakan Axios
    axios.get('http://localhost:8000/api/books')
      .then((response) => {
        // Tangani respon di sini
        setAuthors(response.data.data);
      })
      .catch((error) => {
        console.error('Terjadi kesalahan:', error);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>author</h1>
      </header>
      <ul>
        {Array.isArray(authors) && authors.map((author) => (
          <li key={author.id}>{author.name_book}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
