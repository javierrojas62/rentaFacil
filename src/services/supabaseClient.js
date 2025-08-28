import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zbajewpbjowwegfvghpg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiYWpld3Biam93d2VnZnZnaHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzODM4MTksImV4cCI6MjA3MTk1OTgxOX0.5LdJXVcZypSzKkECYeR4QW_qhu0FL9BmXJo59KL9npM'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Clientes
export const insertCliente = async (cliente) => {
  console.log('=== SUPABASE insertCliente ===');
  console.log('Datos recibidos:', cliente);
  
  const clienteData = {
    dni: cliente.dni,
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    cantidad_personas: parseInt(cliente.cantidadPersonas) || 1,
    telefono: cliente.telefono || null,
    email: cliente.email || null,
    direccion: cliente.direccion || null
  };
  
  console.log('Datos a enviar a Supabase:', clienteData);
  
  const { data, error } = await supabase
    .from('clientes')
    .insert([clienteData])
    .select()
  
  console.log('Respuesta de Supabase - data:', data);
  console.log('Respuesta de Supabase - error:', error);
  
  if (error) {
    console.error('Error en Supabase:', error);
    throw error;
  }
  return data
}

export const getClientes = async () => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
  
  if (error) throw error
  return data
}

// Inmuebles
export const insertInmueble = async (inmueble) => {
  const { data, error } = await supabase
    .from('inmuebles')
    .insert([{
      direccion: inmueble.direccion,
      precio: parseFloat(inmueble.precio),
      tipo: inmueble.tipo,
      habitaciones: parseInt(inmueble.habitaciones) || null,
      banos: parseInt(inmueble.banos) || null,
      metros_cuadrados: parseFloat(inmueble.metrosCuadrados) || null,
      descripcion: inmueble.descripcion
    }])
    .select()
  
  if (error) throw error
  return data
}

export const getInmuebles = async () => {
  const { data, error } = await supabase
    .from('inmuebles')
    .select('*')
    .order('id')
  
  if (error) throw error
  return data
}

// Contratos
export const insertContrato = async (contrato) => {
  const { data, error } = await supabase
    .from('contratos')
    .insert([contrato])
    .select()
  
  if (error) throw error
  return data
}

export const getContratosConDetalles = async () => {
  const { data, error } = await supabase
    .from('contratos')
    .select(`
      *,
      clientes (
        dni,
        nombre,
        apellido,
        telefono,
        email
      ),
      inmuebles (
        id,
        direccion,
        precio,
        tipo
      )
    `)
  
  if (error) throw error
  return data
}

// Índices de actualización - CORREGIDO
export const getValorIndiceActual = async (tipoIndice) => {
  const { data, error } = await supabase
    .from('indices_actualizacion')
    .select('*')
    .eq('tipo', tipoIndice)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const updateValorIndice = async (tipoIndice, nuevoValor) => {
  // Primero intentar actualizar si existe
  const { data: updateData, error: updateError } = await supabase
    .from('indices_actualizacion')
    .update({ 
      valor: nuevoValor,
      updated_at: new Date().toISOString()
    })
    .eq('tipo', tipoIndice)
    .select()
  
  // Si no existe, insertarlo
  if (updateError || !updateData || updateData.length === 0) {
    const { data: insertData, error: insertError } = await supabase
      .from('indices_actualizacion')
      .insert({ 
        tipo: tipoIndice, 
        valor: nuevoValor
      })
      .select()
    
    if (insertError) throw insertError
    return insertData
  }
  
  return updateData
}

export const insertActualizacionPrecio = async (actualizacion) => {
  const { data, error } = await supabase
    .from('actualizaciones_precio')
    .insert([actualizacion])
    .select()
  
  if (error) throw error
  return data
}