import React from 'react';

function Navbar() {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
      color: 'white',
      padding: '1.5rem 1rem',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem'
    }}>
      <h1 style={{
        margin: 0,
        fontSize: '2rem',
        fontWeight: '600',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        Extraits de code H24
      </h1>
      <p style={{
        margin: '0.5rem 0 0',
        opacity: 0.8,
        fontSize: '0.9rem',
        fontWeight: '300'
      }}>
        Partagez et gérez vos snippets de code
      </p>
    </header>
  );
}

export default Navbar;