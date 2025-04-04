import {useState} from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  })

  const editFields = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch('http://localhost:8080/users/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error ('Signup failed');
      }
      return res.json();
    })
    .then(signupData => {
      console.log("New user signed up: ", signupData);
      alert('Thanks for signing up!');
    })
    .catch(err => {
      console.log(err);
      alert('Signup failed');
    })
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="first_name">First Name</label>
        <input type="text" name="first_name" id="first_name" value={formData.first_name} onChange={editFields} required />
        <label htmlFor="last_name">Last Name</label>
        <input type="text" name="last_name" id="last_name" value={formData.last_name} onChange={editFields} required />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={formData.username} onChange={editFields} required />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={formData.password} onChange={editFields} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )

}

export default Signup;