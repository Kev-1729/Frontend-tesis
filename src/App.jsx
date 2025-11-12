import React from 'react';
import ChatInterface from './components/ChatInterface';

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <div className="flex-1 flex flex-col">
        <header className="text-center pt-8 px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Asistente de Trámites Municipales
          </h1>
          <p className="text-lg text-gray-600">
            Consulta información sobre procedimientos municipales
          </p>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl mx-auto">
            <ChatInterface />
          </div>
        </main>
      </div>
    </div>
  );
}
