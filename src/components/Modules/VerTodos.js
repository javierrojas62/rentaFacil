import React, { useState, useEffect } from 'react';
import { generatePDF } from '../../utils/pdfGenerator';
import { getContratosConDetalles, getValorIndiceActual } from '../../services/supabaseClient';

const VerTodos = () => {
  const [contratos, setContratos] = useState([]);
  const [indicesActuales, setIndicesActuales] = useState({ IPC: 0, ICL: 0 });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const contratosData = await getContratosConDetalles();
      const ipcData = await getValorIndiceActual('IPC');
      const iclData = await getValorIndiceActual('ICL');
      
      setContratos(contratosData);
      setIndicesActuales({
        IPC: ipcData?.valor || 0,
        ICL: iclData?.valor || 0
      });
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const calcularCuotaActual = (contrato) => {
    const precio = contrato.inmuebles.precio;
    const indiceValor = indicesActuales[contrato.indice_actualizacion] || 0;
    const incremento = indiceValor / 100;
    return precio * (1 + incremento);
  };

  const handleGeneratePDF = (contrato) => {
    const cuotaActual = calcularCuotaActual(contrato);
    generatePDF(contrato, cuotaActual);
  };

  return (
    <div className="module-container">
      <div className="module-header">
        <h3><i className="fas fa-list me-2"></i>Ver Todos los Contratos</h3>
      </div>
      
      <div className="neumorphic p-4">
        {contratos.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted">No hay contratos registrados</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>DNI</th>
                  <th>Inmueble</th>
                  <th>Precio Base</th>
                  <th>Cuota Actual</th>
                  <th>Fecha Inicio</th>
                  <th>Duración</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contratos.map((contrato) => (
                  <tr key={contrato.id}>
                    <td>{contrato.clientes.nombre} {contrato.clientes.apellido}</td>
                    <td>{contrato.clientes.dni}</td>
                    <td>{contrato.inmuebles.direccion}</td>
                    <td>${contrato.inmuebles.precio.toLocaleString()}</td>
                    <td>${calcularCuotaActual(contrato).toLocaleString()}</td>
                    <td>{new Date(contrato.fecha_inicio).toLocaleDateString()}</td>
                    <td>{contrato.duracion_meses} meses</td>
                    <td>
                      <button
                        className="btn-pdf neumorphic"
                        onClick={() => handleGeneratePDF(contrato)}
                        title="Generar PDF"
                      >
                        <i className="fas fa-file-pdf"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerTodos;