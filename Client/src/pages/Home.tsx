import { useEffect, useState } from "react"
import Banner from "../components/layout/Banner"
import Product from "../components/layout/Product"
import Hot from "./Hot"
import Warning from "./Warning"

function Home() {
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setHasToken(!!token)
  }, [])

  return (
    <>
    {hasToken ? (
      <>
        <Banner/>
        <Product/>
      </>
    ) : (
      <Warning/>
    )}
    </>
  )
}

export default Home
