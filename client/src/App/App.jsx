import {Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import AllItems from '../Pages/AllItems';
import MyItems from '../Pages/MyItems';
import CreateItem from '../Pages/CreateItem';
import ItemDetails from '../Pages/ItemDetails';
import Logout from '../Pages/Logout';

function App() {
  return (
    <>
      <h1>Not-A-Boring-Store's Exciting Inventory Management System</h1>

      <Link to="/">Home</Link> |{' '}
      <Link to="/signup">Sign Up</Link> |{' '}
      <Link to="/login">Login</Link> |{' '}
      <Link to="/my-items">My Inventory</Link> |{' '}
      <Link to="/all-items">Browse All</Link> |{' '}
      <Link to="/logout">Logout</Link>
    <Routes>
      <Route path="/" element={<h1>Welcome!</h1>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/my-items" element={<MyItems />} />
      <Route path="/all-items" element={<AllItems />} />
      <Route path="/items/new" element={<CreateItem />} />
      <Route path="/items/:id" element={<ItemDetails />} />
      <Route path="/logout" element={<Logout />} />

    </Routes>

    </>
  );
}


export default App
