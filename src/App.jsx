import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';

export default function App() {
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar con título (se muestra después de interactuar) */}
      {hasInteracted && (
        <div className="w-64 bg-white shadow-lg p-4 hidden md:flex flex-col border-r border-gray-200">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              Asistente Municipal
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Trámites y procedimientos
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              <div className="text-xs text-gray-400 uppercase font-semibold mb-2">
                Información
              </div>
              <div className="p-2 bg-blue-50 rounded text-sm text-gray-700">
                <p className="font-semibold">💡 Tip</p>
                <p className="text-xs mt-1">Usa los botones de acceso rápido para navegar</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {/* Header centrado (solo se muestra al inicio) */}
        {!hasInteracted && (
          <header className="text-center pt-8 px-4">
            <h1 className="text-5xl font-bold text-gray-800 mb-3">
              Asistente de Trámites Municipales
            </h1>
            <p className="text-xl text-gray-600">
              Tu guía inteligente para los procesos del ayuntamiento
            </p>
          </header>
        )}

        {/* Chat principal */}
        <main className={`flex-1 flex items-center justify-center p-4 ${hasInteracted ? 'pt-4' : ''}`}>
          <div className={`w-full ${hasInteracted ? 'max-w-5xl h-full' : 'max-w-3xl'} mx-auto`}>
            <ChatInterface onFirstInteraction={() => setHasInteracted(true)} hasInteracted={hasInteracted} />
          </div>
        </main>
      </div>
    </div>
  );
}
