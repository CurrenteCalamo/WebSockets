import Head from 'next/head'
import { useRef, useState } from 'react'
import Footer from '../components/Footer'
import styles from '../styles/scss/Home.module.scss'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const socket = useRef()
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState('')

  function connect() {
    socket.current = new WebSocket('ws://localhost:5000')

    socket.current.onopen = () => {
      setConnected(true)
      const message = {
        event: 'connection',
        username,
        id: Date.now(),
      }
      socket.current.send(JSON.stringify(message))
    }
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages((prev) => [message, ...prev])
    }
    socket.current.onclose = () => {
      console.log('Socket закрыт')
    }
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка')
    }
  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message',
    }
    socket.current.send(JSON.stringify(message))
    setValue('')
  }

  if (!connected) {
    return (
      <>
        <Head>
          <title>Login</title>
        </Head>
        <div className={styles.HomeWrapper}>
          <div className={styles.HomeContener}>
            <div className={styles.HomeContentForm}>
              <div className={styles.HomeForm}>
                <input
                  className={styles.input}
                  maxLength={30}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Your username"
                />

                <div>
                  <button onClick={connect}>Send</button>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>WebSocket</title>
      </Head>
      <div className={styles.HomeWrapper}>
        <div className={styles.HomeContener}>
          <div className={styles.HomeContentForm}>
            <div className={styles.HomeForm}>
              <input
                className={styles.input}
                maxLength={30}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Message"
              />

              <div>
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          </div>
          <div className={styles.HomeMessage}>
            {messages.map((mess) => (
              <div className={styles.Message} key={mess.id}>
                {mess.event === 'connection' ? (
                  <div className={styles.connection}>
                    User {mess.username} connected.
                  </div>
                ) : (
                  <div className={styles.Message}>
                    <div className={styles.connection}>{mess.username}</div>

                    <div className={styles.greymessage}>: {mess.message}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}
