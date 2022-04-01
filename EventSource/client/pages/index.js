import Head from 'next/head'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import styles from '../styles/scss/Home.module.scss'
import axios from 'axios'

export default function Home() {
  let date = new Date().toDateString()
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')

  const subscribe = async () => {
    const eventSource = new EventSource(`http://localhost:5000/connect`)
    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data)
      console.log(data)
      setMessages((prev) => [data, ...prev])
    }
  }

  const sendMessage = async () => {
    if (value) {
      await axios
        .post('http://localhost:5000/new-messages', {
          message: value,
          id: Date.now(),
          date: date,
        })
        .then(setValue(''))
    } else {
      alert('An empty field!')
    }
  }
  useEffect(() => {
    subscribe()
  }, [])
  return (
    <>
      <Head>
        <title>EventSource</title>
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
                {mess.message} {mess.date}
              </div>
            ))}
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}
