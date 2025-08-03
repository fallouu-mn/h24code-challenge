import React, { useState, useEffect } from 'react';
import CodeItem from './CodeItem';

function CodeList() {
  const [snippets, setSnippets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost/h24code-backend/api.php?category=${filter}`);
        const data = await response.json();
        setSnippets(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnippets();
  }, [filter]);

  const filteredSnippets = filter === 'all' 
    ? snippets 
    : snippets.filter(snippet => snippet.category === filter);

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Chargement en cours...</p>;
  }

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0 }}>Liste des codes</h2>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        >
          <option value="all">Toutes les catégories</option>
          <option value="PHP">PHP</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
        </select>
      </div>
      
      {filteredSnippets.length > 0 ? (
        filteredSnippets.map(snippet => (
          <CodeItem 
            key={snippet.id} 
            title={snippet.title}
            description={snippet.description}
            category={snippet.category}
            code={snippet.code}
          />
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>Aucun code trouvé</p>
      )}
    </div>
  );
}

export default CodeList;