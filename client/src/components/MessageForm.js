import React, {useState} from "react";
import {gql} from "@apollo/client"
import {useQuery} from '@apollo/client/react'
import { useMutation } from "@apollo/client/react";

const CREATE_MESSAGE = gql`
    mutation CreateMessage($title: String!, $content: String!, $author: String!){
        createMessage(title: $title, content: $content, author: $author){
            _id
        }
    }
`;

const MessageForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')

    const [createMessage] = useMutation(CREATE_MESSAGE)
    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <h2 className="page-title mb-4">Nuevo mensaje</h2>
                <div className="card form-card">
                    <div className="card-body p-4">
                        <form onSubmit={async e => {
                            e.preventDefault();
                            await createMessage({variables: {title, content, author}})
                            window.location.href = "/";
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
                                <button className="btn btn-success px-4">Save message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageForm;