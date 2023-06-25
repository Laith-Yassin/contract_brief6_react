import React from 'react'
import YouTubeVideo from './YouTubeVideo'
import Services from '../services'
import ProductHero from './Hero'
const Home = () => {
  return (
    <div>
      <ProductHero />
       <YouTubeVideo />
      <Services />
    </div>
  )
}

export default Home
