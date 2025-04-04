import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function MyItems() {
  const [items, setItems] = useState([]);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetch('http://localhost:8080/items', {
      credentials: 'include'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Could not fetch items');
      }
      return res.json();
    })
    .then(itemsData => {
      setItems(itemsData);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  const myPersonalInventory = items.filter(item => item.user_Id == userId);

  return (
    <div>
      <h2>{username ? `${username}'s items` : 'My Items'}</h2>
      <Link to="/items/new">Create New Item</Link>
      <ul>
        {myPersonalInventory.map(item => {
          let shortDesc = item.description || '';
          if (shortDesc.length > 100) {
            shortDesc = shortDesc.slice(0, 100) + '...';
          }
          return (
            <li key={item.id}>
              <strong>{item.item_name}</strong> - {shortDesc}
              <br />
              <Link to={`/items/${item.id}`}>View Details</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );



}

export default MyItems;