import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  // Escenario 1: Obtener una publicación existente
  group("Escenario 1: Obtener publicación existente", () => {
    const res = http.get('https://jsonplaceholder.typicode.com/posts/1');
    check(res, {
      'status es 200': (r) => r.status === 200,
      'contiene userId': (r) => r.body.includes("userId"),
    });
  });

  // Escenario 2: Comentar una publicación existente
  group("Escenario 2: Comentar publicación válida", () => {
    const payload = JSON.stringify({
      postId: 1,
      name: "Prueba de integración",
      email: "test@example.com",
      body: "Este es un comentario de prueba."
    });

    const headers = { 'Content-Type': 'application/json' };
    const res = http.post('https://jsonplaceholder.typicode.com/comments', payload, { headers });

    check(res, {
      'status es 201': (r) => r.status === 201,
      'respuesta contiene comentario': (r) => r.body.includes("Prueba de integración"),
    });
  });

  // Escenario 3: Obtener comentarios de una publicación
  group("Escenario 3: Obtener comentarios de un post", () => {
    const res = http.get('https://jsonplaceholder.typicode.com/posts/1/comments');
    check(res, {
      'status es 200': (r) => r.status === 200,
      'contiene comentarios': (r) => r.body.includes("email"),
    });
  });

  // Escenario 4: Intentar comentar publicación inexistente
  group("Escenario 4: Comentar publicación inexistente", () => {
    const payload = JSON.stringify({
      postId: 9999,
      name: "Comentario inválido",
      email: "fail@example.com",
      body: "Esto no debería registrarse correctamente."
    });

    const headers = { 'Content-Type': 'application/json' };
    const res = http.post('https://jsonplaceholder.typicode.com/comments', payload, { headers });

    check(res, {
      'status es 201': (r) => r.status === 201, // JSONPlaceholder responde 201 de todos modos
      'respuesta contiene postId': (r) => r.body.includes("9999"),
    });
  });
}
