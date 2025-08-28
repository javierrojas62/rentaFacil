import React, { useState } from 'react';
import { insertInmueble } from '../../services/supabaseClient';

const InmuebleForm = () => {
  const [inmueble, setInmueble] = useState({
    direccion: '',
    precio: '',
    tipo: '',
    habitaciones: '',
    banos: '',
    metrosCuadrados: '',
    descripcion: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertInmueble(inmueble);
      alert('Inmueble guardado exitosamente');
      setInmueble({
        direccion: '',
        precio: '',
        tipo: '',
        habitaciones: '',
        banos: '',
        metrosCuadrados: '',
        descripcion: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar inmueble');
    }
  };

  const handleChange = (e) => {
    setInmueble({
      ...inmueble,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h3><i className="fas fa-home me-2"></i>Cargar Inmueble</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="neumorphic p-4">
        <div className="row">
          <div className="col-12 mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              name="direccion"
              className="form-control neumorphic-input"
              value={inmueble.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Precio Mensual</label>
            <input
              type="number"
              name="precio"
              className="form-control neumorphic-input"
              value={inmueble.precio}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Tipo de Propiedad</label>
            <select
              name="tipo"
              className="form-control neumorphic-input"
              value={inmueble.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="local">Local Comercial</option>
              <option value="oficina">Oficina</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Habitaciones</label>
            <input
              type="number"
              name="habitaciones"
              className="form-control neumorphic-input"
              value={inmueble.habitaciones}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Baños</label>
            <input
              type="number"
              name="banos"
              className="form-control neumorphic-input"
              value={inmueble.banos}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Metros Cuadrados</label>
            <input
              type="number"
              name="metrosCuadrados"
              className="form-control neumorphic-input"
              value={inmueble.metrosCuadrados}
              onChange={handleChange}
              step="0.01"
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              className="form-control neumorphic-input"
              rows="3"
              value={inmueble.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        
        <div className="text-center">
          <button type="submit" className="btn-primary neumorphic">
            <i className="fas fa-save me-2"></i>
            Guardar Inmueble
          </button>
        </div>
      </form>
    </div>
  );
};

export default InmuebleForm;