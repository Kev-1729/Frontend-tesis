const API_URL = 'http://localhost:8000';

export async function getGuidance(query) {
  try {
    const response = await fetch(`${API_URL}/api/rag/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return {
      downloadUrl: data.download_url || '',
      documentName: data.document_name || '',
      guidanceHtml: data.answer || '<p>No se pudo obtener una respuesta.</p>',
    };
  } catch (error) {
    console.error('Error consultando API:', error);
    return {
      downloadUrl: '',
      documentName: '',
      guidanceHtml:
        '<p class="text-red-600">Lo siento, no se pudo conectar con el servidor. Por favor, verifica que el backend esté ejecutándose.</p>',
    };
  }
}
