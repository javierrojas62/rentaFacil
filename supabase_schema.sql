-- Tabla de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    dni VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    cantidad_personas INTEGER DEFAULT 1,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de inmuebles
CREATE TABLE inmuebles (
    id VARCHAR(50) PRIMARY KEY,
    direccion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    tipo VARCHAR(50),
    habitaciones INTEGER,
    banos INTEGER,
    metros_cuadrados DECIMAL(8,2),
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de contratos
CREATE TABLE contratos (
    id SERIAL PRIMARY KEY,
    cliente_dni VARCHAR(20) REFERENCES clientes(dni),
    inmueble_id VARCHAR(50) REFERENCES inmuebles(id),
    fecha_inicio DATE NOT NULL,
    duracion_meses INTEGER NOT NULL,
    indice_actualizacion VARCHAR(10) DEFAULT 'IPC',
    valor_indice DECIMAL(5,2),
    deposito DECIMAL(10,2),
    comision DECIMAL(10,2),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de actualizaciones de precio
CREATE TABLE actualizaciones_precio (
    id SERIAL PRIMARY KEY,
    contrato_id INTEGER REFERENCES contratos(id),
    nuevo_indice DECIMAL(5,2) NOT NULL,
    motivo TEXT,
    fecha_aplicacion DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_clientes_dni ON clientes(dni);
CREATE INDEX idx_contratos_cliente ON contratos(cliente_dni);
CREATE INDEX idx_contratos_inmueble ON contratos(inmueble_id);
CREATE INDEX idx_actualizaciones_contrato ON actualizaciones_precio(contrato_id);

-- Función para actualizar el timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar automáticamente updated_at
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON clientes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inmuebles_updated_at BEFORE UPDATE ON inmuebles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contratos_updated_at BEFORE UPDATE ON contratos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();