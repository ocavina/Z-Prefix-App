import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function CreateItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    quantity: '',
  })

  const editFields = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const addItemToInventory = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch('http://localhost:8080/items', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error ('Unable to create item');
      }
      return res.json();
    })
    .then(itemData => {
      console.log("New Item added to inventory: ", itemData);
      alert('New Item added to inventory!');
      navigate('/my-items');
    })
    .catch(err => {
      console.log(err);
      alert('Visitors are not allowed to create or delete items!');
    })
  }

  return(
    <div>
      <h2>Create New Item</h2>
      <form onSubmit={addItemToInventory}>
        <label htmlFor="item_name">Item Name</label>
        <input type="text" name="item_name" id="item_name" value={formData.item_name} onChange={editFields} required />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" value={formData.description} onChange={editFields} required />
        <label htmlFor="quantity">Quantity</label>
        <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={editFields} required />
        <button type="submit">Create Item</button>
      </form>
    </div>
  )

}

export default CreateItem;