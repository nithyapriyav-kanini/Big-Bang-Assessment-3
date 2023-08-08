import { useState,useEffect } from "react";
import './ViewAgents.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function ViewAgents()
{
    const navigate = useNavigate();
    const [agents,setAgents]=useState([]);
    const [filterAgents,setFilterAgents]=useState([]);
    var [filter,setFilter] = useState();

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  Agents()
        return () => { ignore = true; }
        },[]);

    var Agents=()=>
    {
        console.log("*");
        fetch("http://localhost:5295/api/User/action/AllAgents",
        {
            "method":"POST",
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
                setAgents(responseData);
                setFilterAgents(responseData);
                console.log(agents);
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

    var FilterGet = () => {

        if (filter == "All" ) {
            setAgents(filterAgents);
        } 
        else{
            setAgents(filterAgents.filter(agent => agent.users.status === filter));
        }
    }

   
    

    return(
        <div>
            <div>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center">
                        <h1 className="logo me-auto">
                        <a href="index.html">Customer Registerartion<span></span></a>
                        </h1>

                        <nav id="navbar" className="navbar order-last order-lg-0">
                        <select className="get-started-btn scrollto"  onChange={(event)=>{
                        filter=event.target.value;
                        console.log(filter);
                        FilterGet();
                    }}>
                        <option value="All"  selected >All</option>
                        <option value="Approved"  selected >Approved</option>
                        <option value="Denied"  selected >Denied</option>
                        <option value="Requested"  selected >Requested</option>
                    </select>
                        
                        </nav>
                        <Link to={'/'} onClick={Logout} className="get-started-btn scrollto">
                        Logout
                        </Link>
                    </div>
                </header>
            </div>
            <table id="agentTable">
                <thead>
                    <th>Agent ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Age</th>
                    <th>Phone No</th>
                    <th>Status</th>
                    <th>Approve</th>
                    <th>Deny</th>
                </thead>
                <tbody>
                {
                    agents.map((agent,index)=>{
                        return(
                            <tr>
            <td>{agent.agentId}</td>
            <td>{agent.name}</td>
            <td>{agent.gender}</td>
            <td>{agent.dob}</td>
            <td>{agent.age}</td>
            <td>{agent.phoneNo}</td>
            <td>{agent.users.status}</td>
            <td>
                <button className="btn btn-success" onClick={()=>{
                        const requestBody={
                                "userId": agent.agentId,
                                "email": "string",
                                "password": "string",
                                "role": "string",
                                "status": "Approved",
                                "token": "string"
                        }
                        console.log(requestBody);
                        fetch("http://localhost:5295/api/User/action/ChangeStatus",
                        {
                            "method":"POST",
                            headers:{
                                "accept": "text/plain",
                                "Content-Type": "application/json",
                                // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                            "body":JSON.stringify({...requestBody,"requestBody":{} })
                        })
                        .then(async (data)=>
                        {
                            if(data.status == 200)
                            {
                                Agents()
                            }
                        })
                        .catch((err)=>
                        {
                                console.log(err.error)
                        })
                }}>Approve</button>
            </td>
            <td>
                <button className="btn btn-danger" onClick={()=>{
                        const requestBody={
                            "userId": agent.agentId,
                                "email": "string",
                                "password": "string",
                                "role": "string",
                                "status": "Denied",
                                "token": "string"
                        }
                        console.log(requestBody);
                        fetch("http://localhost:5295/api/User/action/ChangeStatus",
                        {
                            "method":"POST",
                            headers:{
                                "accept": "text/plain",
                                "Content-Type": "application/json",
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                            "body":JSON.stringify({...requestBody,"requestBody":{} })
                        })
                        .then(async (data)=>
                        {
                            if(data.status == 200)
                            {
                                Agents()
                            }
                        })
                        .catch((err)=>
                        {
                                console.log(err.error)
                        })
                }}>Deny</button>
            </td>
        </tr>       
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default ViewAgents;