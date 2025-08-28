import React from 'react';

const Header = ({ activeModule, setActiveModule, toggleTheme, darkMode }) => {
  const modules = [
    { key: 'clientes', label: 'Cargar Cliente', icon: 'fa-user-plus' },
    { key: 'inmuebles', label: 'Cargar Inmueble', icon: 'fa-home' },
    { key: 'contratos', label: 'Nuevo Contrato', icon: 'fa-file-contract' },
    { key: 'ver-todos', label: 'Ver Todos', icon: 'fa-list' },
    { key: 'actualizacion', label: 'Actualización de Precio', icon: 'fa-dollar-sign' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a className="navbar-brand me-3" href="#">
            <i className="fas fa-building me-2"></i>
            Renta Fácil
          </a>
          
          <button 
            className="theme-toggle-header"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {modules.map((module) => (
              <li className="nav-item" key={module.key}>
                <button
                  className={`nav-link btn ${activeModule === module.key ? 'active' : ''}`}
                  onClick={() => setActiveModule(module.key)}
                >
                  <i className={`fas ${module.icon} me-1`}></i>
                  {module.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;