import Error from '../components/Error'
import Head from 'next/head'
export default function Errors() {
  return (
    <>
      <Head>
        <title>This page could not be found!</title>
      </Head>

      <Error></Error>
    </>
  )
}
