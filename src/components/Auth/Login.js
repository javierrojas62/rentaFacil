import React, { useState } from 'react';

const Login = ({ onLogin, toggleTheme, darkMode }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === 'demo' && credentials.password === 'demo') {
      onLogin(true);
      setError('');
    } else {
      setError('Credenciales incorrectas. Usuario: demo, Contraseña: demo');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Cambiar tema"
      >
        <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>
      
      <div className="login-box neumorphic">
        <div className="text-center mb-4">
          <h2 className="login-title">Renta Fácil</h2>
          <p className="login-subtitle">Sistema de Gestión de Rentas</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <div className="input-container neumorphic-inset">
              <i className="fas fa-user input-icon"></i>
              <input
                type="text"
                name="username"
                className="form-control neumorphic-input"
                placeholder="Usuario"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group mb-4">
            <div className="input-container neumorphic-inset">
              <i className="fas fa-lock input-icon"></i>
              <input
                type="password"
                name="password"
                className="form-control neumorphic-input"
                placeholder="Contraseña"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="alert alert-danger text-center mb-3">
              {error}
            </div>
          )}
          
          <button type="submit" className="btn-login neumorphic">
            <i className="fas fa-sign-in-alt me-2"></i>
            Iniciar Sesión
          </button>
        </form>
        
        <div className="demo-info mt-4">
          <small className="text-muted">
            <strong>Credenciales de prueba:</strong><br/>
            Usuario: demo<br/>
            Contraseña: demo
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;