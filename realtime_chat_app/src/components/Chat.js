import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from './infoBar/InfoBar'

let socket

export const Chat = (props) => {
    const [searchParams] = useSearchParams()
    const [name, setName] = useState(searchParams.get('name'))
    const [room, setRoom] = useState(searchParams.get('room'))
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'http://localhost:5000'

    console.log(messages)
    useEffect(() => {
        socket = io(ENDPOINT, {
            transports: ['websocket']
        })
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`)
        })
        socket.emit('join', { name, room }, (error) => {

        })

        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [ENDPOINT, name, room])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    return (
        <>
            <div className="outerContainer">
                <div className="container">
                    <InfoBar room={room} />
                    <input value={message} onChange={(event) => {
                        setMessage(event.target.value)
                    }} onKeyPress={(event => event.key === 'Enter' ? sendMessage(event) : null)} />
                </div>

            </div>
        </>
    )
}
