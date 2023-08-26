import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Banner1 from "../../assets/banner1.png";
import Banner2 from "../../assets/banner2.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from 'react-redux';
import { searchCategory } from '../../app/categorySlice';
import { useNavigate } from 'react-router-dom';
import HomepageData from "../../HomePageData";
import "./style/Home.css";

const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const  dispatch  = useDispatch();
  const navigate = useNavigate()
  const clickHandler = (category) =>{ 
      dispatch(searchCategory(category))
      navigate("/product")
  }


  return (
   <Layout>
     <div className='home'>
      <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} arrows={true} >
        <div className='banner1'>
        <img src={Banner1} alt='banner2' width={"100%"}/>
        </div>
        <div className='banner2'>
          <img src={Banner2} alt='banner1' width={"100%"}/>
        </div>
      </Carousel>

      <div className='homepage'>
        {
          HomepageData.map((item,index)=>{
             return(
              <div className='homepage-category' key={index} onClick={()=>{clickHandler(item.name)}}>
                <img src={item.image} alt={item.name}/>
                <h4>{item.name}</h4>
              </div>
             )
          })
        }
      </div>



    </div>
   </Layout>
  )
}

export default Home

