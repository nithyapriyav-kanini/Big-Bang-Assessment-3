import { useState,useEffect } from "react";
import './AddHotel.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function AddFeedback({closeAddRoom,id})
{
    const [feedback, setFeedback] = useState({
        "id": 0,
        "hotelId": 0,
        "userId": 0,
        "createdAt": "2023-08-07T20:04:15.183Z",
        "maintenence": 0,
        "food": 0,
        "amenities": 0,
        "otherServices": 0,
        "valueForMoney": 0,
        "review": "string"
      })
    
      var AddFeedback=()=>
        {
        console.log(hotel);
        fetch("http://localhost:5083/api/Amenity/action/AddAmenity",
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
                const responseData=(await data.json());
                toast.success('Added');
                console.log(responseData);
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
            <h4><b>Add Room</b></h4>
            <div>
             
                    <table>
                <tr>
                    <td>
                        <label><b>Maintenance</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Maintenance"
                            type="rating"
                            id="email"
                            required
                            onChange={(event)=>{
                                setFeedback({...feedback, maintenance:Number(event.target.value)})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>Food</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Price"
                            type="number"
                            id="email"
                            required
                            onChange={(event)=>{
                                setFeedback({...feedback, food:Number(event.target.value)})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>Amenities</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Value For Money"
                            type="number"
                            id="email"
                            required
                            onChange={(event)=>{
                                setFeedback({...feedback, amenities:Number(event.target.value)})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>Value For Money</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Value For Money"
                            type="number"
                            id="email"
                            required
                            onChange={(event)=>{
                                setFeedback({...feedback, valueForMoney:Number(event.target.value)})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>Other Services</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Value For Money"
                            type="number"
                            id="email"
                            required
                            onChange={(event)=>{
                                setFeedback({...feedback, otherServices:Number(event.target.value)})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>Review</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Review"
                            type="text"
                            id="email"
                            required
                            onChange={(event)=>{
                                setFeedback({...feedback, review:event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
            </table>
            <button type="button" onClick={AddFeedback} >Add</button>
            <button type="button" onClick={closeAddFeedback } >close</button>
            </div>
          </div>
        </div>
    
    )
}

export default AddFeedback;