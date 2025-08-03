import React, { useState } from 'react';

function CodeForm({ refreshList }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'HTML',
    code: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
const response = await fetch('https://falloubackend.infinityfreeapp.com/api.php', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message || 'Code enregistré!');
      setFormData({
        title: '',
        description: '',
        category: 'HTML',
        code: ''
      });
      refreshList();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Échec de l\'enregistrement');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    }}>
      <h2>Ajouter un nouveau code</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Titre:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
              minHeight: '80px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Catégorie:</label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          >
            <option value="PHP">PHP</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Code:</label>
          <textarea
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
              minHeight: '150px',
              fontFamily: 'monospace'
            }}
          />
        </div>
        
        <button type="submit" style={{
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}>Enregistrer</button>
      </form>
    </div>
  );
}

export default CodeForm;