import React from 'react'
import Header from '../../components/Header/Header/Header'
import Footer from '../../components/Header/Footer/Footer'
import Banner from '../../components/Header/Banner/Banner'
import RowList from '../../components/Header/Rows/RowList/RowList'

const Home = () => {
  return (
    <>
        <Header/>
        <Banner/>
        <RowList/>
        <Footer/>
    </>
  )
}

export default Home