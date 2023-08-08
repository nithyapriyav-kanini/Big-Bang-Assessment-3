import { useState,useEffect } from "react";
import './BookRoom.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function BookRoom({closeBookRoom,hotelId,roomId})
{
    const Id=Number(hotelId);
    const roomNo = Number(roomId);
    const [hotel, setHotel] = useState({
        
        "id": 0,
        "userId": localStorage.getItem('Id'),
        "hotelId": Id,
        "roomId": roomNo,
        "startDate": "2023-08-08T07:52:55.603Z",
        "endDate": "2023-08-08T07:52:55.603Z"
      })
    
      var Bookroom=()=>
        {
        console.log(hotel);
        fetch("http://localhost:5130/api/Booking/Booking",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body:JSON.stringify(hotel)})
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                toast.success('Added');
                closeBookRoom();
            }
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    
     
    
      return (
        <div className="popup">
          <div className="popup-inner">
            <h4><b>Book Room</b></h4>
            <div>
             
                    <table>
                <tr>
                    <td>
                        <label><b>Start Date</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Room No"
                            type="Date"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, startDate:event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>End Date</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Price"
                            type="Date"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, endDate:event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
            </table>
            <button type="button" onClick={Bookroom} >Add</button>
            <button type="button" onClick={closeBookRoom} >close</button>
            </div>
          </div>
        </div>
    
    )
}

export default BookRoom;