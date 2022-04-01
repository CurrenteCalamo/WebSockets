import Head from 'next/head'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import styles from '../styles/scss/Home.module.scss'
import axios from 'axios'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  let date = new Date().toDateString()

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

  async function subscribe() {
    try {
      const { data } = await axios.get('http://localhost:5000/get-messages')
      setMessages((prev) => [data, ...prev])
      await subscribe()
    } catch (err) {
      setTimeout(() => {
        subscribe()
      }, 400)
    }
  }

  useEffect(() => {
    subscribe()
  })

  return (
    <>
      <Head>
        <title>LongPulling</title>
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
                <div>{mess.message}</div>
                <div>{mess.date}</div>
              </div>
            ))}
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}
