# Backend - API GraphQL (Messages CRUD)

API RESTful implementada con **GraphQL** para gestionar mensajes (CRUD completo), construida con **GraphQL Yoga** y **MongoDB** (Mongoose).

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) | ^5.24.6 | Servidor GraphQL (HTTP) |
| [Mongoose](https://mongoosejs.com/) | ^9.11.2 | ODM para MongoDB |
| [@babel/node](https://babeljs.io/) | ^8 | Ejecutar JS moderno (ESM) en Node |
| [nodemon](https://nodemon.io/) | ^3 | Recarga automática en desarrollo |

## Requisitos previos

- **Node.js** >= 18
- **MongoDB** corriendo localmente en `mongodb://localhost:27017`

## Instalación y ejecución

```bash
cd Backend
npm install
npm run dev
```

El servidor levanta en:

```
http://localhost:3100/graphql
```

> ⚠️ **Importante:** el backend debe ejecutarse **antes** que el frontend.

## Estructura del proyecto

```
Backend/
├── .babelrc                       # Configuración de Babel (@babel/preset-env)
├── package.json
└── src/
    ├── index.js                   # Punto de entrada: crea el servidor HTTP (puerto 3100)
    ├── server.js                  # Crea el schema de GraphQL (typeDefs + resolvers)
    ├── database.js                # Conexión a MongoDB (mongoose.connect)
    ├── models/
    │   └── Message.js             # Modelo Mongoose de Message
    └── graphql/
        ├── schema.graphql         # Definición del esquema GraphQL (SDL)
        └── resolvers/
            ├── index.js           # Combina Query y Mutation
            ├── Query.js           # Resolvers de consultas
            └── Mutation.js        # Resolvers de mutaciones
```

## Esquema GraphQL (`schema.graphql`)

```graphql
type Query {
    ping: String!
    messages: [Message!]
}

type Message {
    _id: ID!
    title: String!
    content: String!
    author: String!
}

type Mutation {
    createMessage(title: String!, content: String, author: String!): Message
    deleteMessage(id: ID!): Message
    updateMessage(id: ID!, title: String!, content: String, author: String!): Message
}
```

## Endpoint

| Método | URL | Descripción |
|---|---|---|
| POST | `http://localhost:3100/graphql` | Punto de acceso GraphQL (queries y mutations) |

---

## Ejemplos de uso

Puedes probar estos ejemplos desde **[GraphiQL](https://the-guild.dev/graphql/yoga-server/docs/features/graphiql)** (se abre automáticamente al visitar `http://localhost:3100/graphql` en el navegador) o con **Postman/cURL**.

### 1. Verificar conexión — `ping`

```graphql
query {
  ping
}
```

Respuesta:

```json
{
  "data": {
    "ping": "pong!"
  }
}
```

### 2. Crear un mensaje — `createMessage`

```graphql
mutation {
  createMessage(title: "mi segundo grapql", content: "contenido clave 2", author: "por fast") {
    _id
    title
    content
    author
  }
}
```

### 3. Listar todos los mensajes — `messages`

```graphql
query {
  messages {
    _id
    title
    content
    author
  }
}
```

### 4. Actualizar un mensaje — `updateMessage`

```graphql
mutation {
  updateMessage(id: "6ad7e8b91fb91e88161f7e62", title: "hola", content: "hola 2", author: "hola 3") {
    _id
    title
    content
    author
  }
}
```

> 🔑 El `id` debe ser el `_id` real de un documento en MongoDB. Puedes obtenerlo ejecutando antes la query `messages`.

### 5. Eliminar un mensaje — `deleteMessage`

```graphql
mutation {
  deleteMessage(id: "6ad7e8fc1fb91e88161f7e63") {
    _id
    title
    content
    author
  }
}
```

---

## Resolvers

### Query (`src/graphql/resolvers/Query.js`)

| Resolver | Descripción |
|---|---|
| `ping` | Devuelve `"pong!"` (verificación de conexión) |
| `messages` | Devuelve todos los mensajes (`Message.find()`) |

### Mutation (`src/graphql/resolvers/Mutation.js`)

| Resolver | Descripción |
|---|---|
| `createMessage` | Crea un nuevo mensaje (`new Message().save()`) |
| `updateMessage` | Actualiza un mensaje por ID (`findByIdAndUpdate` con `{ new: true }`) |
| `deleteMessage` | Elimina un mensaje por ID (`findByIdAndDelete`) |

## Base de datos

- **Motor:** MongoDB
- **URI:** `mongodb://localhost:27017/graphqlreactdb`
- **Colección:** `messages` (generada por Mongoose a partir del modelo `Message`)

### Modelo `Message`

| Campo | Tipo | Requerido |
|---|---|---|
| `title` | String | ✅ Sí |
| `content` | String | ✅ Sí |
| `author` | String | ✅ Sí |

## Variables de entorno

Actualmente todos los valores (puerto, URI de MongoDB) están **hardcodeados** en el código fuente. No se utiliza `.env`.
