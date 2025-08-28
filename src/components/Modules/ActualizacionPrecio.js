import React, { useState, useEffect } from 'react';
import { insertActualizacionPrecio, getValorIndiceActual, updateValorIndice } from '../../services/supabaseClient';

const ActualizacionPrecio = () => {
  const [actualizacion, setActualizacion] = useState({
    tipoIndice: 'IPC',
    nuevoValor: '',
    fechaAplicacion: ''
  });

  const [valoresActuales, setValoresActuales] = useState({
    IPC: 0,
    ICL: 0
  });

  useEffect(() => {
    cargarValoresActuales();
  }, []);

  const cargarValoresActuales = async () => {
    try {
      const ipcData = await getValorIndiceActual('IPC');
      const iclData = await getValorIndiceActual('ICL');
      setValoresActuales({
        IPC: ipcData?.valor || 0,
        ICL: iclData?.valor || 0
      });
    } catch (error) {
      console.error('Error cargando valores:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== INICIANDO ACTUALIZACIÓN ===');
    console.log('Tipo índice:', actualizacion.tipoIndice);
    console.log('Nuevo valor:', actualizacion.nuevoValor);
    console.log('Fecha:', actualizacion.fechaAplicacion);
    
    try {
      const valorAnterior = valoresActuales[actualizacion.tipoIndice];
      console.log('Valor anterior:', valorAnterior);
      
      // Actualizar el índice
      await updateValorIndice(actualizacion.tipoIndice, parseFloat(actualizacion.nuevoValor));
      console.log('Índice actualizado en tabla indices_actualizacion');
      
      // Registrar la actualización
      const historialData = {
        tipo_indice: actualizacion.tipoIndice,
        valor_anterior: parseFloat(valorAnterior) || 0,
        valor_nuevo: parseFloat(actualizacion.nuevoValor),
        fecha_aplicacion: actualizacion.fechaAplicacion
      };
      
      console.log('Datos a insertar en historial:', historialData);
      await insertActualizacionPrecio(historialData);
      console.log('Historial guardado exitosamente');
      
      alert('Índice actualizado exitosamente');
      await cargarValoresActuales(); // Esperar a que se recarguen los valores
      
      setActualizacion({
        tipoIndice: 'IPC',
        nuevoValor: '',
        fechaAplicacion: ''
      });
    } catch (error) {
      console.error('Error completo:', error);
      alert(`Error al actualizar índice: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setActualizacion({
      ...actualizacion,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h3><i className="fas fa-dollar-sign me-2"></i>Actualización de Índices</h3>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="neumorphic p-3 text-center">
            <h5>IPC Actual</h5>
            <h3 className="text-primary">{valoresActuales.IPC}%</h3>
          </div>
        </div>
        <div className="col-md-6">
          <div className="neumorphic p-3 text-center">
            <h5>ICL Actual</h5>
            <h3 className="text-primary">{valoresActuales.ICL}%</h3>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="neumorphic p-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Tipo de Índice</label>
            <select
              name="tipoIndice"
              className="form-control neumorphic-input"
              value={actualizacion.tipoIndice}
              onChange={handleChange}
              required
            >
              <option value="IPC">IPC (Índice de Precios al Consumidor)</option>
              <option value="ICL">ICL (Índice de Contratos de Locación)</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Nuevo Valor (%)</label>
            <input
              type="number"
              name="nuevoValor"
              className="form-control neumorphic-input"
              value={actualizacion.nuevoValor}
              onChange={handleChange}
              step="0.01"
              placeholder="Ej: 5.2"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Fecha de Aplicación</label>
            <input
              type="date"
              name="fechaAplicacion"
              className="form-control neumorphic-input"
              value={actualizacion.fechaAplicacion}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="text-center">
          <button type="submit" className="btn-primary neumorphic">
            <i className="fas fa-save me-2"></i>
            Actualizar Índice
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActualizacionPrecio;