import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CodeForm from './components/CodeForm';
import CodeList from './components/CodeList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshList = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      margin: 0,
      padding: 0,
      backgroundColor: '#f5f5f5',
      color: '#333',
      minHeight: '100vh'
    }}>
      <Navbar />
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <CodeForm refreshList={refreshList} />
        <CodeList key={refreshKey} />
      </div>
    </div>
  );
}

export default App;