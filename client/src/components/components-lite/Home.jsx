import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Categories from './Categories'

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Header />
         <Categories />
    {/*
   
      <LatestJob />
      <Footer /> */}
    </div>
  )
}

export default Home
