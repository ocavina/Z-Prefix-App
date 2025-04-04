import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

function ItemDetails() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    quantity: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8080/items/${id}`, {
      credentials: 'include'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Could not fetch item details');
      }
      return res.json();
    })
    .then(itemData => {
      setItem(itemData);
      setFormData({
        item_name: itemData.item_name,
        description: itemData.description,
        quantity: itemData.quantity,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }, [id]);

  const editFields = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const updateItemInInventory = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/items/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error ('Unable to make changes to item');
      }
      return res.json();
    })
    .then(itemData => {
      console.log("Item updated: ", itemData);
      alert('Item updated!');
      setItem(itemData);
      setEdit(false);
    })
    .catch(err => {
      console.log(err);
      alert('Error while updating item');
    })
  }

  const deleteItemInInventory = () => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    fetch(`http://localhost:8080/items/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(res => {
      if (!res.ok) {
        throw new Error ('Unable to delete this item');
      }
      return res.json();
    })
    .then(itemData => {
      console.log("Item deleted: ", itemData);
      alert('Item deleted!');
      setDeleteItem(true);
      navigate('/my-items');
    })
    .catch(err => {
      console.log(err);
      alert('Error while deleting item');
    })
  }

  if (!item) {
    return <div>Loading item details...</div>;
  }

  return (
    <div>
      <h2>Item Details</h2>
      {edit ? (
        <form onSubmit={updateItemInInventory}>
          <label>
            Name:
            <input type="text" name="item_name" value={formData.item_name} onChange={editFields} />
          </label>
          <br />
          <label>
            Description:
            <input type="text" name="description" value={formData.description} onChange={editFields} />
          </label>
          <br />
          <label>
            Quantity:
            <input type="number" name="quantity" value={formData.quantity} onChange={editFields} />
          </label>
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEdit(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {item.item_name}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <button onClick={() => setEdit(true)}>Edit</button>
          <button onClick={deleteItemInInventory}>Delete</button>
        </div>
      )}
    </div>
  );



}

export default ItemDetails;