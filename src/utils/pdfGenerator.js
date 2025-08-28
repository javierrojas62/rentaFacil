import jsPDF from 'jspdf';

export const generatePDF = (contrato, cuotaActual) => {
  const doc = new jsPDF();
  
  console.log('Datos del contrato para PDF:', contrato);
  
  // Configuración del documento
  doc.setFontSize(20);
  doc.text('RENTA FÁCIL', 20, 30);
  doc.setFontSize(16);
  doc.text('Comprobante de Pago - Alquiler', 20, 45);
  
  // Línea divisoria
  doc.line(20, 50, 190, 50);
  
  // Información del contrato (adaptado a la estructura de Supabase)
  doc.setFontSize(12);
  doc.text(`Cliente: ${contrato.clientes.nombre} ${contrato.clientes.apellido}`, 20, 70);
  doc.text(`DNI: ${contrato.clientes.dni}`, 20, 85);
  doc.text(`Dirección del Inmueble: ${contrato.inmuebles.direccion}`, 20, 100);
  doc.text(`Fecha de Contrato: ${new Date(contrato.fecha_inicio).toLocaleDateString()}`, 20, 115);
  doc.text(`Duración: ${contrato.duracion_meses} meses`, 20, 130);
  doc.text(`Índice de Actualización: ${contrato.indice_actualizacion}`, 20, 145);
  
  // Información del pago
  doc.setFontSize(14);
  doc.text('DETALLE DEL PAGO:', 20, 170);
  doc.text(`Precio Base: $${contrato.inmuebles.precio.toLocaleString()}`, 20, 185);
  doc.text(`Cuota Mensual Actual: $${Math.round(cuotaActual).toLocaleString()}`, 20, 200);
  
  // Fecha de generación
  doc.setFontSize(10);
  doc.text(`Documento generado el: ${new Date().toLocaleDateString()}`, 20, 250);
  
  // Descargar el PDF
  doc.save(`cuota_${contrato.clientes.apellido}_${contrato.clientes.nombre}.pdf`);
};