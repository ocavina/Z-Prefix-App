import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const editFields = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const submitLogin = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error ('Login failed');
      }
      return res.json();
    })
    .then(loginData => {
      console.log("User logged in: ", loginData);
      alert('Logged in successully!');
      localStorage.setItem('userId', loginData.userId);
      localStorage.setItem('username', loginData.username);
      navigate('/my-items');
    })
    .catch(err => {
      console.log(err);
      alert('Login failed');
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitLogin}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={formData.username} onChange={editFields} required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={formData.password} onChange={editFields} required />
        <button type="submit">Login</button>
      </form>
    </div>
  )

}

export default Login;