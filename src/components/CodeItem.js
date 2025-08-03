import React, { useState } from 'react';

function CodeItem({ title, description, category, code }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ marginTop: 0, color: '#2c3e50' }}>{title}</h3>
      <p style={{ color: '#666' }}>{description}</p>
      <span style={{
        display: 'inline-block',
        padding: '3px 8px',
        borderRadius: '4px',
        backgroundColor: category === 'HTML' ? '#e34c26' : 
                        category === 'CSS' ? '#2965f1' : '#8892bf',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
        marginBottom: '10px'
      }}>{category}</span>
      
      <pre style={{
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '4px',
        overflowX: 'auto',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace'
      }}>{code}</pre>
      
      <button 
        onClick={copyToClipboard}
        style={{
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
          transition: 'all 0.2s'
        }}
      >
        {copied ? 'Copié !' : 'Copier le code'}
      </button>
    </div>
  );
}

export default CodeItem;