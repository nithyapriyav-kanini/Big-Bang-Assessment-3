import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BookRoom from "./BookRoom";


function Hotel()
{
    const navigate = useNavigate();
    const [hotel,setHotel]=useState({
        "id": 1,
        "name": "Novotel",
        "description": "The best one in the city of chennai",
        "email": "novotel@gmail.com",
        "address": "74,Anna nagar",
        "contactNumber": "1234567890",
        "city": "chennai",
        "country": "India",
        "state": "Tamil Nadu",
        "minimumPrice": 2000,
        "maximumPrice": 4000,
        "agentId": 1,
        "images": [
        {
        
        },
        {
        
        },
        
    ],
    "amenityType": [
        {
        
        },
        {
        
        },
        
    ],
    "rooms": [
        {
       
        
        },
       
    ]
    });
    const [images,setImages]=useState([]);
    const [amenity,setAmenity]=useState([]);
    const [romms,setRooms]=useState([]);

    const [bookRoom,setbookRoom]=useState(false);

    const openBookRoom=()=>{
        setbookRoom(true);
    }
    const closeBookroom=()=>{
        setbookRoom(false);
    }

    var {id}=useParams();

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  Hotel()
        return () => { ignore = true; }
        },[]);

        var Hotel=()=>
        {
            console.log(id);
            fetch("http://localhost:5083/api/Hotel/action/GetHotel",
            {
                "method":"POST",
                headers:{
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                 "body":JSON.stringify({"id":id })
            })
            .then(async (data)=>
            {
                if (data.status === 200) {
                    const responseData = await data.json();
                    setHotel(responseData);
                    setAmenity(responseData.amenityType);
                    setImages(responseData.images);
                    setRooms(responseData.rooms);
                }
                if(data.status == 400)
                {
                    console.log("hotels");
                    // setFilterAgents(responseData);
                }
            })
            .catch((err)=>
            {
                    console.log(err.error);
            })
        }

    

    return(
        <div>
            <div>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center">
                        <h1 className="logo me-auto">
                        <a href="index.html">Hotels<span></span></a>
                        </h1>
                        <nav id="navbar" className="navbar order-last order-lg-0">
                        </nav>

                    </div>
                </header>
            </div>
            <div className="editContent">
                    <section id="portfolio" className="portfolio">
                        <div className="container" data-aos="fade-up">
                            <div className="section-title">
                            <h2>Hotel Images</h2>
                            
                            </div>
                            <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
                            {images.map((im, index) => (
                                <div className="col-lg-4 col-md-6 portfolio-item imagesabout" key={index}>
                                    <div className="portfolio-wrap">
                                        <img src={im.imageUrl} className="img-fluid" alt={`Image ${index}`} style={{ height: '200px', width: '350px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </section>
                        <div className="container" data-aos="fade-up">
                            <div className="section-title">
                            <h2>Amenities</h2>
                            </div>
                            <div className="amenitylist">
                            {amenity.map((ame,index)=>{
                                            return(
                                <div className=" " key={index}>
                                <div className="">
                                   <h4>{ame.amenityType}</h4>         
                                </div> 
                                </div>
                    )}) }</div>
                        </div>
                        <br/>
                            <div className="section-title">
                            <h2>Rooms</h2>
                            </div>
                    <div class="row roomsarea">
                        {romms.map((rm, index) => (
                                    <div class="col-sm-2">
                                    <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">{rm.roomNo}</h5>
                                        <p class="card-text">Capacity : {rm.capacity}</p>
                                        <p class="card-text">Price : {rm.price}</p>
                                        <p class="card-text">Price : {rm.roomType}</p>
                                        <a  onClick={openBookRoom} class="btn btn-primary">Book</a>
                                        {bookRoom && <BookRoom closeBookRoom={closeBookroom} hotelId={id} roomId={rm.roomNo}/>}
                                    </div>
                                    </div>
                                </div>
                                ))}
                    </div>
        </div>
        </div>
    )
}

export default Hotel;