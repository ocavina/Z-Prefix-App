import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function AllItems() {
  const [items, setItems] = useState([]);

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

  return (
    <div>
      <h2>All Items</h2>
      <ul>
        {items.map(item => {
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

export default AllItems;