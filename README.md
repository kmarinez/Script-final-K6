# Script-final-K6
# Pruebas de Integración Automatizadas - Proyecto JSONBlog

Este repositorio contiene un script de pruebas automatizadas desarrollado con **k6** para validar la integración entre los módulos de publicaciones y comentarios utilizando la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## 🎯 Objetivo

Simular pruebas de integración entre dos módulos del proyecto ficticio JSONBlog:

- Módulo de Publicaciones
- Módulo de Comentarios

## 🔧 Herramientas Utilizadas

- [k6](https://k6.io/) - Herramienta para pruebas de carga e integración
- JSONPlaceholder - API pública de prueba
- Postman (para pruebas exploratorias manuales)

## 🧪 Escenarios de Prueba

1. **Obtener una publicación existente**  
   - Endpoint: `GET /posts/1`  
   - Validación: Status 200 y datos de publicación presentes

2. **Comentar una publicación válida**  
   - Endpoint: `POST /comments`  
   - Payload con `postId: 1`  
   - Validación: Status 201 y retorno del comentario

3. **Obtener comentarios de una publicación**  
   - Endpoint: `GET /posts/1/comments`  
   - Validación: Lista de comentarios relacionada

4. **Intentar comentar una publicación inexistente**  
   - Endpoint: `POST /comments`  
   - Payload con `postId: 9999`  
   - Validación: Status 201 (la API no valida postId reales)

## ▶️ Ejecución del Script

Requisitos: Tener k6 instalado.

```bash
k6 run script_k6_jsonplaceholder.js
