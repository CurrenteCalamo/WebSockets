import styles from '../styles/scss/Components/Footer.module.scss'

export default function Footer() {
  return (
    <div className={styles.FooterWrapper}>
      © 2022 all rights reserved
      <div className={styles.FooterImageWrapper}>
        <a href="https://currentecalamo.herokuapp.com/requisites">
          <div className={styles.FooterImage}></div>
        </a>
      </div>
    </div>
  )
}
