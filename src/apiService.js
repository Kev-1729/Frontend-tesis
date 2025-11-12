const API_URL = 'http://localhost:8000';

export async function getGuidance(query, conversationHistory = []) {
  try {
    // Filtrar solo los últimos 10 mensajes para no sobrecargar el contexto
    const recentHistory = conversationHistory
      .slice(-10)
      .filter(msg => msg.role !== 'assistant' || !msg.content.includes('¡Hola! Soy tu asistente'))
      .map(msg => ({
        role: msg.role,
        content: msg.role === 'user' ? msg.content : msg.content.replace(/<[^>]*>/g, '').substring(0, 500)
      }));

    const response = await fetch(`${API_URL}/api/rag/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        conversation_history: recentHistory
      }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return {
      guidanceHtml: data.answer || '<p>No se pudo obtener una respuesta.</p>',
    };
  } catch (error) {
    console.error('Error consultando API:', error);
    return {
      guidanceHtml:
        '<p class="text-red-600">Lo siento, no se pudo conectar con el servidor. Por favor, verifica que el backend esté ejecutándose.</p>',
    };
  }
}
