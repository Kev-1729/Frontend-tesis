import React, { useState, useRef, useEffect } from 'react';
import { getGuidance } from '../apiService';

export default function ChatInterface({ onFirstInteraction, hasInteracted }) {
  const [messages, setMessages] = useState([
    {
      id: 'init',
      role: 'assistant',
      content: '¡Hola! Soy tu asistente virtual para trámites municipales. ¿En qué puedo ayudarte hoy?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const hasInteractedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Notificar primera interacción
    if (!hasInteractedRef.current && onFirstInteraction) {
      hasInteractedRef.current = true;
      onFirstInteraction();
    }

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const assistantResponse = await getGuidance(inputValue);
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantResponse.guidanceHtml,
        downloadUrl: assistantResponse.downloadUrl,
        documentName: assistantResponse.documentName,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '<p class="text-red-600">Lo siento, ha ocurrido un error.</p>',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: 'Preguntas Frecuentes', query: 'Preguntas Frecuentes' },
    { label: 'Ayuda con el RAG', query: 'ayuda con el rag' },
    { label: 'Temas disponibles', query: 'temas disponibles' },
    { label: 'Ayuda general', query: 'ayuda' },
  ];

  const handleQuickAction = async (query) => {
    // Notificar primera interacción
    if (!hasInteractedRef.current && onFirstInteraction) {
      hasInteractedRef.current = true;
      onFirstInteraction();
    }

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const assistantResponse = await getGuidance(query);
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantResponse.guidanceHtml,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '<p class="text-red-600">Lo siento, ha ocurrido un error.</p>',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-2xl flex flex-col ${hasInteracted ? 'h-[calc(100vh-2rem)]' : 'h-[70vh] max-h-[800px]'}`}>
      {/* Botones de acceso rápido - ARRIBA DEL CHAT */}
      <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <p className="text-sm text-gray-700 mb-3 font-semibold flex items-center">
          Accesos rápidos
        </p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickAction(action.query)}
              disabled={isLoading}
              className="px-3 py-2 text-xs font-medium bg-white border-2 border-blue-300 text-blue-700 rounded-lg hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Área de mensajes del chat */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-4 ${
              msg.role === 'user' ? 'justify-end' : ''
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                🤖
              </div>
            )}
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
              dangerouslySetInnerHTML={{ __html: msg.content }}
            />
            {msg.role === 'user' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
                👤
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
              🤖
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg">
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu pregunta aquí..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
