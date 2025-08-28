import React, { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import ClienteForm from './components/Modules/ClienteForm';
import InmuebleForm from './components/Modules/InmuebleForm';
import ContratoForm from './components/Modules/ContratoForm';
import VerTodos from './components/Modules/VerTodos';
import ActualizacionPrecio from './components/Modules/ActualizacionPrecio';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState('clientes');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} toggleTheme={toggleTheme} darkMode={darkMode} />;
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'clientes':
        return <ClienteForm />;
      case 'inmuebles':
        return <InmuebleForm />;
      case 'contratos':
        return <ContratoForm />;
      case 'ver-todos':
        return <VerTodos />;
      case 'actualizacion':
        return <ActualizacionPrecio />;
      default:
        return <ClienteForm />;
    }
  };

  return (
    <div className="app">
      <Header 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-12">
            {renderActiveModule()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;