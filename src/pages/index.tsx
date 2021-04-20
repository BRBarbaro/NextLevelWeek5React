

export default function Home(props) {
  // Exemplo chamada unica SPA
  //import { useEffect } from "react"
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //     .then(response => response.json())
  // }, [])
  return (
    <h1>Index</h1>
  )
}

// Exemplo chamada SSR
//export async function getServerSideProps() {

// Chamada SSG
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json();

  return {
    props: {
      episodes : data
    },
    revalidate: 60 * 60 * 8,
  }
}
