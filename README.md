# Frontend - Asistente de Trámites Municipales

Interfaz web moderna construida con **React** y **Vite** que proporciona una experiencia de chat intuitiva para consultar sobre trámites municipales.

## 🚀 Tecnologías

- **React 18.3** - Librería UI
- **Vite 6.2** - Build tool y dev server ultra-rápido
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **PostCSS** - Procesamiento de CSS

## 📋 Requisitos Previos

- Node.js 18+ (recomendado 20+)
- npm o yarn

## ⚙️ Instalación

```bash
# Instalar dependencias
npm install

# O con yarn
yarn install
```

## 🚀 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

El servidor de desarrollo estará disponible en: `http://localhost:5173`

Características del modo desarrollo:
- ✅ Hot Module Replacement (HMR)
- ✅ Recarga automática en cambios
- ✅ Error overlay en el navegador

### Build de Producción

```bash
# Construir para producción
npm run build

# Vista previa del build
npm run preview
```

El build optimizado se generará en la carpeta `dist/`

## 📁 Estructura del Proyecto

```
frontend/
├── public/               # Archivos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   └── ChatInterface.jsx
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Punto de entrada
│   └── index.css       # Estilos globales (Tailwind)
├── index.html          # HTML principal
├── package.json        # Dependencias y scripts
├── vite.config.js      # Configuración de Vite
├── tailwind.config.js  # Configuración de Tailwind
└── postcss.config.js   # Configuración de PostCSS
```

## 🎨 Componentes Principales

### `App.jsx`
Componente raíz que maneja:
- Layout principal con sidebar condicional
- Estado de interacción del usuario
- Diseño responsivo

### `ChatInterface.jsx`
Componente de chat que incluye:
- Input de mensaje con botones de acceso rápido
- Área de mensajes con scroll automático
- Renderizado de respuestas HTML del backend
- Estados de carga y error

## 🎨 Personalización de Estilos

El proyecto usa **Tailwind CSS** para el styling. Para personalizar:

### Colores, Fuentes, etc.

Editar `tailwind.config.js`:

```js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2'
      }
    }
  }
}
```

### Estilos Globales

Editar `src/index.css` para estilos base y directivas de Tailwind.

## 🔌 Conexión con Backend

El frontend se conecta al backend FastAPI en `http://localhost:8000`

Para cambiar la URL del backend, editar las llamadas a la API en `ChatInterface.jsx`:

```javascript
const response = await fetch('http://localhost:8000/api/rag/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: message })
});
```

## 📦 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build de producción
npm run preview
```

## 🌐 Despliegue

### Build de Producción

1. Generar build optimizado:
```bash
npm run build
```

2. La carpeta `dist/` contendrá:
   - HTML, CSS y JS minificados
   - Assets optimizados
   - Source maps (si están habilitados)

### Opciones de Hosting

El proyecto puede desplegarse en:

- **Vercel** (recomendado para proyectos Vite)
  ```bash
  npm i -g vercel
  vercel
  ```

- **Netlify**
  - Build command: `npm run build`
  - Publish directory: `dist`

- **GitHub Pages**
  - Configurar `base` en `vite.config.js`
  - Desplegar carpeta `dist/`

- **Servidor estático (Nginx, Apache)**
  - Copiar contenido de `dist/` al servidor

## 🎯 Características de la UI

### Diseño Responsivo
- 📱 Mobile-first approach
- 💻 Sidebar oculto en móviles
- 📐 Breakpoints adaptables

### Experiencia de Usuario
- 🎨 Gradientes modernos
- 💬 Chat intuitivo
- ⚡ Respuestas instantáneas
- 🔘 Botones de acceso rápido
- 📄 Renderizado HTML de respuestas

### Estados Visuales
- ⏳ Indicador de carga (pensando...)
- ✅ Confirmación visual de envío
- ⚠️ Manejo de errores
- 🎭 Animaciones suaves

## 🔧 Configuración de Vite

### Alias de Importación

Para agregar alias (ej: `@/components`), editar `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

### Variables de Entorno

Crear archivo `.env.local`:

```env
VITE_API_URL=http://localhost:8000
```

Usar en código:
```js
const API_URL = import.meta.env.VITE_API_URL
```

## 🐛 Troubleshooting

### Puerto 5173 ocupado
Vite asignará automáticamente el siguiente puerto disponible (5174, 5175, etc.)

### Error de conexión con backend
- Verificar que el backend esté corriendo en `http://localhost:8000`
- Verificar CORS en el backend (debe permitir origen del frontend)

### Errores de build
```bash
# Limpiar cache y node_modules
rm -rf node_modules dist .vite
npm install
npm run build
```

## 🎨 Personalización del Chat

### Cambiar colores del gradiente del header

En `App.jsx`, buscar:
```jsx
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
```

### Modificar botones de acceso rápido

En `ChatInterface.jsx`, editar el array `quickButtons`:
```jsx
const quickButtons = [
  { label: 'Tu botón', query: 'Tu consulta' },
  // ...
]
```

## 📱 Soporte de Navegadores

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## 📄 Licencia

Este proyecto es privado y pertenece a la Municipalidad de Carabayllo.
