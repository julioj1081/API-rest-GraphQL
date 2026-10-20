import React, {useState} from "react";
import {gql} from "@apollo/client"
import {useQuery} from '@apollo/client/react'
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

const get_messages = gql `
{
    messages{
        _id,
        title,
        content,
        author
    }
}
`

const DELETE_MESSAGE = gql`
    mutation DeleteMessage($id: ID!){
        deleteMessage(id: $id){
            _id
        }
    }
`;


const MessageList = () => {
    const {loading, error, data} = useQuery(get_messages)
    const [deleteMessage] = useMutation(DELETE_MESSAGE, {
        refetchQueries: [{ query: get_messages }]
    })
    const navigate = useNavigate()


    if(loading) return <p className="text-center text-muted mt-4">Cargando mensajes ...</p>
    if(error) return <p className="text-center text-danger mt-4">Error al cargar mensajes</p>

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <h2 className="page-title mb-4">Mensajes</h2>
                {
                    data.messages.map(({_id, title, content, author}) => (
                        <div className="card message-card mb-3" key={_id}>
                            <div className="card-body">
                                <h5 className="card-title mb-2">{title}</h5>
                                <p className="card-text text-secondary">{content}</p>
                                <span className="message-author">{author}</span>
                            </div>
                            <div className="card-footer d-flex justify-content-end">
                                <button className="btn btn-danger btn-sm m-1" title="Eliminar" aria-label="Eliminar"
                                    onClick={() => deleteMessage({ variables: { id: _id } })}>
                                    <i className="bi bi-trash"></i>
                                </button>
                                <button className="btn btn-warning btn-sm m-1" title="Actualizar" aria-label="Actualizar"
                                    onClick={() => navigate(`/update-message/${_id}/${encodeURIComponent(title)}/${encodeURIComponent(content)}/${encodeURIComponent(author)}`)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageList;