import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/users/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error ('Logout failed');
      }
      return res.json();
    })
    .then(logoutData => {
      console.log("User logged out: ", logoutData);
      alert('Logged out successfully!');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      alert('Logout issues!');
    })
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  )

}

export default Logout;