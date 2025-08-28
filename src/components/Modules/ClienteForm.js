import React, { useState } from 'react';
import { insertCliente } from '../../services/supabaseClient';

const ClienteForm = () => {
  const [cliente, setCliente] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    cantidadPersonas: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== INICIO DEL PROCESO ===');
    console.log('Cliente a enviar:', cliente);
    
    try {
      console.log('Llamando a insertCliente...');
      const result = await insertCliente(cliente);
      console.log('Respuesta de Supabase:', result);
      alert('Cliente guardado exitosamente en Supabase');
      
      // Limpiar formulario solo si fue exitoso
      setCliente({
        dni: '',
        nombre: '',
        apellido: '',
        cantidadPersonas: '',
        telefono: '',
        email: '',
        direccion: ''
      });
    } catch (error) {
      console.error('=== ERROR COMPLETO ===');
      console.error('Error:', error);
      console.error('Message:', error.message);
      console.error('Details:', error.details);
      console.error('Hint:', error.hint);
      alert(`Error al guardar cliente: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h3><i className="fas fa-user-plus me-2"></i>Cargar Cliente</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="neumorphic p-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">DNI</label>
            <input
              type="text"
              name="dni"
              className="form-control neumorphic-input"
              value={cliente.dni}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control neumorphic-input"
              value={cliente.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              className="form-control neumorphic-input"
              value={cliente.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Cantidad de Personas</label>
            <input
              type="number"
              name="cantidadPersonas"
              className="form-control neumorphic-input"
              value={cliente.cantidadPersonas}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              className="form-control neumorphic-input"
              value={cliente.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control neumorphic-input"
              value={cliente.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Dirección</label>
            <textarea
              name="direccion"
              className="form-control neumorphic-input"
              rows="3"
              value={cliente.direccion}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        
        <div className="text-center">
          <button type="submit" className="btn-primary neumorphic">
            <i className="fas fa-save me-2"></i>
            Guardar Cliente
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;