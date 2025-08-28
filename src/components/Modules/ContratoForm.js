import React, { useState, useEffect } from 'react';
import { insertContrato, getClientes, getInmuebles } from '../../services/supabaseClient';

const ContratoForm = () => {
  const [contrato, setContrato] = useState({
    clienteDni: '',
    inmuebleId: '',
    fechaInicio: '',
    duracionMeses: '',
    indiceActualizacion: 'IPC',
    deposito: ''
  });

  const [clientes, setClientes] = useState([]);
  const [inmuebles, setInmuebles] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [showClienteList, setShowClienteList] = useState(false);
  const [showAllClientes, setShowAllClientes] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const clientesData = await getClientes();
      const inmueblesData = await getInmuebles();
      setClientes(clientesData);
      setInmuebles(inmueblesData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertContrato({
        cliente_dni: contrato.clienteDni,
        inmueble_id: contrato.inmuebleId,
        fecha_inicio: contrato.fechaInicio,
        duracion_meses: parseInt(contrato.duracionMeses),
        indice_actualizacion: contrato.indiceActualizacion,
        deposito: parseFloat(contrato.deposito) || 0
      });
      alert('Contrato guardado exitosamente');
      setContrato({
        clienteDni: '',
        inmuebleId: '',
        fechaInicio: '',
        duracionMeses: '',
        indiceActualizacion: 'IPC',
        deposito: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar contrato');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContrato({
      ...contrato,
      [name]: value
    });

    // Filtrar clientes mientras escribe en DNI
    if (name === 'clienteDni') {
      const filtered = clientes.filter(cliente => 
        cliente.dni.includes(value) || 
        cliente.nombre.toLowerCase().includes(value.toLowerCase()) ||
        cliente.apellido.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClientes(filtered);
      setShowClienteList(value.length > 0 && !showAllClientes);
    }
  };

  const selectCliente = (cliente) => {
    setContrato({
      ...contrato,
      clienteDni: cliente.dni
    });
    setShowClienteList(false);
    setShowAllClientes(false);
  };

  const toggleAllClientes = () => {
    setShowAllClientes(!showAllClientes);
    setShowClienteList(false);
    if (!showAllClientes) {
      setFilteredClientes(clientes);
    }
  };

  const handleInputFocus = () => {
    if (contrato.clienteDni.length > 0) {
      const filtered = clientes.filter(cliente => 
        cliente.dni.includes(contrato.clienteDni) || 
        cliente.nombre.toLowerCase().includes(contrato.clienteDni.toLowerCase()) ||
        cliente.apellido.toLowerCase().includes(contrato.clienteDni.toLowerCase())
      );
      setFilteredClientes(filtered);
      setShowClienteList(true);
    }
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h3><i className="fas fa-file-contract me-2"></i>Nuevo Contrato</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="neumorphic p-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Cliente</label>
            <div className="position-relative">
              <div className="input-group">
                <input
                  type="text"
                  name="clienteDni"
                  className="form-control neumorphic-input"
                  value={contrato.clienteDni}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  placeholder="Buscar por DNI, nombre o apellido..."
                  required
                />
                <button
                  type="button"
                  className="btn-dropdown neumorphic"
                  onClick={toggleAllClientes}
                  title="Ver todos los clientes"
                >
                  <i className={`fas fa-chevron-${showAllClientes ? 'up' : 'down'}`}></i>
                </button>
              </div>
              
              {(showClienteList || showAllClientes) && filteredClientes.length > 0 && (
                <div className="cliente-dropdown neumorphic">
                  {filteredClientes.map((cliente) => (
                    <div
                      key={cliente.dni}
                      className="cliente-option"
                      onClick={() => selectCliente(cliente)}
                    >
                      <strong>{cliente.dni}</strong> - {cliente.nombre} {cliente.apellido}
                      <br />
                      <small className="text-muted">{cliente.telefono} | {cliente.email}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Inmueble</label>
            <select
              name="inmuebleId"
              className="form-control neumorphic-input"
              value={contrato.inmuebleId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar inmueble...</option>
              {inmuebles.map((inmueble) => (
                <option key={inmueble.id} value={inmueble.id}>
                  #{inmueble.id} - {inmueble.direccion} (${inmueble.precio.toLocaleString()})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Fecha de Inicio</label>
            <input
              type="date"
              name="fechaInicio"
              className="form-control neumorphic-input"
              value={contrato.fechaInicio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Duración (meses)</label>
            <input
              type="number"
              name="duracionMeses"
              className="form-control neumorphic-input"
              value={contrato.duracionMeses}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Índice de Actualización</label>
            <select
              name="indiceActualizacion"
              className="form-control neumorphic-input"
              value={contrato.indiceActualizacion}
              onChange={handleChange}
              required
            >
              <option value="IPC">IPC (Índice de Precios al Consumidor)</option>
              <option value="ICL">ICL (Índice de Contratos de Locación)</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Depósito</label>
            <input
              type="number"
              name="deposito"
              className="form-control neumorphic-input"
              value={contrato.deposito}
              onChange={handleChange}
              step="0.01"
            />
          </div>
        </div>
        
        <div className="text-center">
          <button type="submit" className="btn-primary neumorphic">
            <i className="fas fa-save me-2"></i>
            Crear Contrato
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContratoForm;