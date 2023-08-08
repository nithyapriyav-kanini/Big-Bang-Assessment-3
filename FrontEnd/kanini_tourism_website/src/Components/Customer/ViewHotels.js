import { useState,useEffect } from "react";
import './ViewHotels.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import hotel1 from "../../Images/hotel1.jpg";
import styled from 'styled-components';

function ViewHotels()
{
    const navigate = useNavigate();
    const [hotels,setHotels]=useState([]);
    // const [filterAgents,setFilterAgents]=useState([]);
    // var [filter,setFilter] = useState();

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  Hotels()
        return () => { ignore = true; }
        },[]);

    var Hotels=()=>
    {
        fetch("http://localhost:5083/api/Hotel/action/GetAllHotels",
        {
            "method":"GET",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            // "body":JSON.stringify({...statusDTO,"statusDTO":{} })
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                const responseData=await data.json();
                setHotels(responseData);
                // setFilterAgents(responseData);
            }
        })
        .catch((err)=>
        {
                console.log(err.error);
        })
    }
    var Logout=()=>{
        localStorage.clear();
    }

    return(
        <div className="viewHotels">
            <div>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center">
                        <h1 className="logo me-auto">
                        <a href="index.html">Hotels<span></span></a>
                        </h1>

                        <nav id="navbar" className="navbar order-last order-lg-0">
                        </nav>
                        <Link to={'/'} onClick={Logout} className="get-started-btn scrollto">
                        Logout
                        </Link>
                    </div>
                </header>
            </div>
            <section id="portfolio" className="portfolio">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Hotels</h2>
          <p>    "Discover a world of luxury and comfort at renowned hotels like The Ritz-Carlton and Four Seasons, where impeccable service meets breathtaking elegance." </p>
        </div>
        <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
        {hotels.map((hotel,index)=>{
                        return(
        <div className="col-lg-4 col-md-6 portfolio-item">
            <div className="portfolio-wrap" onClick={()=>{navigate(`/booking/${hotel.id}`)}}>
              <img src={hotel1} className="img-fluid" alt="App 1" />
              <div className="portfolio-info">
                <h4>{hotel.contactNumber}</h4>
                <h4>{hotel.email}</h4>
                <div className="portfolio-links contentofhotel">
                  <h5>{hotel.minimumPrice}-{hotel.maximumPrice}</h5>
                </div>
              </div>
              </div> 
              <div className="portfolio-wrap belowContent" onClick={()=>{navigate(`/booking/${hotel.id}`)}}>
              <br/><h4>{hotel.name}</h4>
                <div className="portfolio-links ">
                  <h5>About : {hotel.description}</h5></div>
                  <h5>About : {hotel.address},{hotel.city},{hotel.state},{hotel.country}</h5>
              </div>
          {/* Repeat the above block for the other 5 items */}
          {/* Remember to adjust image sources, titles, and content */}
        </div>
         )}) }
         </div>
      </div>
    </section>
        </div>
    )
}

export default ViewHotels;