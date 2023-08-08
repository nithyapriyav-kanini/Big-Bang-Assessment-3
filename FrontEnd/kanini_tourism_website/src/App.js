import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgentRegister from './Components/AgentRegister';
import CustomerRegister from './Components/CustomerRegister';
import { BrowserRouter,Route, Routes, useNavigate } from 'react-router-dom';
import ViewAgents from './Components/Admin/ViewAgents';
import ViewHotels from './Components/Customer/ViewHotels';
import Hotel from './Components/Customer/Hotel';
import Hotels from './Components/Agent/Hotels';
import AddHotel from './Components/Agent/AddHotel';
import HotelEdit from './Components/Agent/HotelEdit';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div>
    {/* Your component's content */}
    <ToastContainer />
  </div>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='login' element={<Login/>} />
        <Route path='agentregister' element={<AgentRegister/>} />
        <Route path='customerregister' element={<CustomerRegister/>} />

        <Route path='adminView' element={<ViewAgents/>} />

        <Route path='agentView' element={<Hotels/>} />
        <Route path='/editHotel/:id' element={<HotelEdit/>} />

        <Route path='customerView' element={<ViewHotels/>} />
        <Route path='/booking/:id' element={<Hotel/>} />
    </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
