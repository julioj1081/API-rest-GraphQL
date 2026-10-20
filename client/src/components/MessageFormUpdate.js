import React, {useState} from "react";
import {gql} from "@apollo/client"
import { useMutation } from "@apollo/client/react";
import { useParams, useNavigate } from "react-router-dom";

const UPDATE_MESSAGE = gql`
    mutation UpdateMessage($id: ID!, $title: String!, $content: String, $author: String!){
        updateMessage(id: $id, title: $title, content: $content, author: $author){
            _id,
            title,
            content,
            author
        }
    }
`;

const MessageFormUpdate = () => {

    const {id, title: t, content: c, author: a} = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState(t || '')
    const [content, setContent] = useState(c || '')
    const [author, setAuthor] = useState(a || '')

    const [updateMessage] = useMutation(UPDATE_MESSAGE)

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <h2 className="page-title mb-4">Actualizar mensaje</h2>
                <div className="card form-card">
                    <div className="card-body p-4">
                        <form onSubmit={async e => {
                            e.preventDefault();
                            await updateMessage({variables: {id, title, content, author}})
                            navigate("/");
                        }}>
                            <div className="form-group mb-3">
                                <label className="form-label">Titulo</label>
                                <input type="text" placeholder="Escribe el titulo" 
                                value={title}
                                className="form-control" onChange={e => setTitle(e.target.value)}/>
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Mensaje</label>
                                <textarea type="text" placeholder="Escribe tu mensaje" 
                                value={content}
                                className="form-control" rows={8} onChange={e => setContent(e.target.value)} />
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label">Autor</label>
                                <input type="text" placeholder="Tu nombre" 
                                value={author}
                                className="form-control" onChange={e => setAuthor(e.target.value)}/>
                            </div>

                            <div className="text-center">
                                <button className="btn btn-warning px-4">Actualizar mensaje</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageFormUpdate;
