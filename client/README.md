# Frontend - React Client (Messages CRUD)

Cliente **React** para consumir la API GraphQL del backend, permitiendo crear, listar, actualizar y eliminar mensajes.

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | ^19.3.1 | Librería de UI |
| [Create React App](https://create-react-app.dev/) | react-scripts 5 | Toolchain de build |
| [Apollo Client](https://www.apollographql.com/docs/react) | ^4.3.5 | Cliente GraphQL (cache, queries, mutations) |
| [graphql](https://graphql.org/) | ^17 | Ejecución de operaciones GraphQL |
| [React Router](https://reactrouter.com/) | ^7 | Enrutamiento del lado del cliente |
| [Bootswatch (lux)](https://bootswatch.com/lux/) | ^5 | Tema de Bootstrap 5 |
| [bootstrap-icons](https://icons.getbootstrap.com/) | ^1 | Iconos |

## Requisitos previos

- **Node.js** >= 18
- **Backend corriendo** en `http://localhost:3100/graphql` (ver [Backend README](../Backend/README.md))

## Instalación y ejecución

```bash
cd client
npm install
npm start
```

El cliente levanta en:

```
http://localhost:3000
```

> ⚠️ **Importante:** ejecutar primero el **backend** y después el **frontend**.

## Estructura del proyecto

```
client/
├── public/
│   ├── index.html                 # HTML base (título: "React App")
│   └── ...
└── src/
    ├── index.js                   # Punto de entrada: Apollo Client + ApolloProvider + CSS globales
    ├── App.js                     # Router: define todas las rutas de la aplicación
    ├── App.css                    # (CRA boilerplate, no se usa)
    ├── index.css                  # Estilos personalizados (cards, títulos, formulario)
    └── components/
        ├── Navbar.js              # Barra de navegación (Bootstrap)
        ├── MessageList.js         # Listado de mensajes (query + delete)
        ├── MessageForm.js         # Formulario de creación (mutation create)
        └── MessageFormUpdate.js   # Formulario de edición (mutation update)
```

---

## Cómo está construido

### 1. Configuración de Apollo Client (`src/index.js`)

El cliente GraphQL se configura una sola vez y se inyecta en el árbol de React con `ApolloProvider`:

```js
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3100/graphql" }),
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
```

También se importan aquí los estilos globales:

```js
import "bootswatch/dist/lux/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
```

![Apollo Client Setup](./images/apollo-setup.png)

### 2. Enrutamiento (`src/App.js`)

Se utiliza **React Router v7** con `BrowserRouter`:

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `MessageList` | Listado principal de mensajes |
| `/new-message` | `MessageForm` | Formulario para crear un mensaje |
| `/update-message/:id/:title/:content/:author` | `MessageFormUpdate` | Formulario para editar (pasa datos por URL) |

```jsx
<BrowserRouter>
  <Navigation />
  <div className="container p-4">
    <Routes>
      <Route path="/" element={<MessageList />} />
      <Route path="/new-message" element={<MessageForm />} />
      <Route
        path="/update-message/:id/:title/:content/:author"
        element={<MessageFormUpdate />}
      />
    </Routes>
  </div>
</BrowserRouter>
```

![Rutas de la aplicación](./images/rutas.png)

### 3. Componentes

#### `Navbar.js` — Barra de navegación

- Navbar de Bootstrap con tema oscuro (`bg-primary`).
- Enlaces a `/` ("MessageList") y `/new-message` ("Nuevo mensaje").

![Navbar](./images/navbar.png)

#### `MessageList.js` — Listado de mensajes

- Ejecuta una **query** con `useQuery` para obtener todos los mensajes.
- Renderiza cada mensaje en una **card** con título, contenido y autor (pill).
- Botón 🗑️ **eliminar**: ejecuta la mutation `DELETE_MESSAGE` con `refetchQueries` para refrescar la lista.
- Botón ✏️ **editar**: navega a `/update-message/...` pasando los datos codificados con `encodeURIComponent` en la URL.
- Maneja estados de `loading` ("Cargando mensajes...") y `error` ("Error al cargar mensajes").

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

![Listado de mensajes](./images/message-list.png)

#### `MessageForm.js` — Crear mensaje

- Formulario controlado con `useState` (title, content, author).
- Ejecuta la mutation `CREATE_MESSAGE` al enviar.
- Redirige al listado con `window.location.href = "/"` después de crear.

```graphql
mutation ($title: String!, $content: String, $author: String!) {
  createMessage(title: $title, content: $content, author: $author) {
    _id
  }
}
```

![Formulario de creación](./images/message-form.png)

#### `MessageFormUpdate.js` — Editar mensaje

- Lee los parámetros de la URL con `useParams()` para pre-llenar el formulario.
- Ejecuta la mutation `UPDATE_MESSAGE` y navega de vuelta con `navigate("/")`.

```graphql
mutation ($id: ID!, $title: String!, $content: String, $author: String!) {
  updateMessage(id: $id, title: $title, content: $content, author: $author) {
    _id
    title
    content
    author
  }
}
```

![Formulario de edición](./images/message-form-update.png)

---

## Manejo de estado

No se usa Redux, Zustand ni Context. El estado se maneja con:

- **`useState`** — estado local de cada componente (formularios, loading).
- **Apollo Client cache (`InMemoryCache`)** — caché normalizada de datos GraphQL.
- **`refetchQueries`** — vuelve a ejecutar la query de listado tras un `delete`/`create` para mantener la UI actualizada.

## Estilos

| Fuente | Archivo | Contenido |
|---|---|---|
| Bootswatch **lux** (Bootstrap 5) | `bootswatch/dist/lux/bootstrap.min.css` | Clases utilitarias (`container`, `card`, `btn`, `row`, etc.) |
| bootstrap-icons | `bootstrap-icons/font/bootstrap-icons.css` | Iconos (`bi-trash`, `bi-pencil`) |
| CSS personalizado | `src/index.css` | Fondo `#f4f6f9`, `.page-title`, `.message-card` (borde azul izquierdo + hover lift), `.message-author` (pill), `.form-card` |

![Estilos y tarjetas](./images/estilos.png)

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Servidor de desarrollo en `http://localhost:3000` |
| `npm run build` | Build de producción en `build/` |
| `npm test` | Ejecuta los tests (CRA/Jest) |
| `npm run eject` | Expone la configuración de CRA (irreversible) |

## Flujo general de la aplicación

```
┌─────────────┐   GraphQL (HTTP POST)   ┌──────────────────┐   Mongoose   ┌──────────┐
│    React     │ ──────────────────────▶ │  GraphQL Yoga    │ ───────────▶ │ MongoDB  │
│ Apollo Client│ ◀────────────────────── │  :3100/graphql   │ ◀─────────── │ :27017   │
└─────────────┘        JSON              └──────────────────┘              └──────────┘
   :3000
```

1. El usuario interactúa con la UI React (`:3000`).
2. Apollo Client envía queries/mutations vía HTTP a `http://localhost:3100/graphql`.
3. GraphQL Yoga resuelve la operación llamando a los resolvers.
4. Los resolvers interactúan con MongoDB mediante Mongoose.
5. La respuesta JSON se guarda en el cache de Apollo y la UI se actualiza.
