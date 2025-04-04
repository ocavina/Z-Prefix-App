require('dotenv').config();
const express = require('express');
const app = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development']);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'user_session',
  keys: [process.env.MY_PRIVATE_KEY],
  secure: false,
}))

app.get('/', (req, res) => {
  res.send('My Inventory API');
})

function checkAuthentication(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
  next();
}

//users/signup CREATE
app.post('/users/signup', (req, res) => {
  const {first_name, last_name, username, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    first_name,
    last_name,
    username,
    password: hashedPassword
  }
  knex('users')
    .insert(newUser)
    .returning('*')
    .then(allUserData => {
      const newUserData = allUserData[0];
      console.log('New user signed up:', newUserData);
      res.status(201).json(newUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Could not create new user'
      })
    })
})

//users/login
app.post('/users/login', (req, res) => {
  const {username, password} = req.body;

  knex('users')
    .where({username})
    .then(userData => {
      const user = userData[0];
      if (!user) {
        return res.status(401).json({message: 'Invalid username'});
      }
      return bcrypt.compare(password, user.password)
        .then(correctPassword => {
          if (!correctPassword) {
            return res.status(401).json({message: 'Invalid password'});
          }
          req.session.userId = user.id;
          return res.json({
            message: 'login successful',
            userId: user.id,
            username: user.username
          })
        })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Could not login'
      })
    })
})

//users/logout
app.post('/users/logout', (req, res) => {
  req.session = null;
  res.clearCookie('user_session');
  return res.json({
    message: 'Logout successful'
  })
})


//create new items with authentication
app.post('/items', checkAuthentication, (req, res) => {
  const userId = req.session.userId;
  const {item_name, description, quantity} = req.body;

  const newItem = {
    user_Id: userId,
    item_name,
    description,
    quantity
  }
  knex('items')
    .insert(newItem)
    .returning('*')
    .then(allItemData => {
      const newItemData = allItemData[0];
      console.log(newItemData);
      res.status(201).json(newItemData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Could not create new item'
      })
    })

})


//get all items
app.get('/items', (req, res) => {
  knex('items')
    .select('*')
    .then(itemsData => {
      res.status(200).json(itemsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Could not get items'
      })
    })
})

//get single item
app.get('/items/:id', (req, res) => {
  const {id} = req.params;
  knex('items')
    .where({id})
    .then(itemData => {
      const item = itemData[0];
      if (!item) {
        return res.status(404).json({
          message: 'Item not found'
        })
      }
      res.status(200).json(item);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Could not get item'
      })
    })
})

//update items with authentication
app.put ('/items/:id', checkAuthentication, (req, res) => {
  const {id} = req.params;
  const {item_name, description, quantity} = req.body;
  const updatedItem = {item_name, description, quantity};

  knex('items')
    .where({id})
    .update(updatedItem)
    .returning('*')
    .then(itemData => {
      if (!itemData || itemData.length === 0) {
        return res.status(404).json({
          message: 'Item not found'
        })
      }
      return res.status(200).json(itemData[0]);
    })

    .catch(err => {
      console.log(err);
      if (!res.headersSent) {
        res.status(500).json({
          message: 'Could not update item'
        })
      }
    })

})


//delete items with authentication
app.delete('/items/:id', checkAuthentication, (req, res) => {
  const {id} = req.params;
  const userId = req.session.userId;

  knex('items')
    .where({id})
    .delete()
    .returning('*')
    .then(itemData => {
      const item = itemData[0];
      if (!item) {
        return res.status(404).json({
          message: 'Item not found'
        })
      }
      return res.status(200).json({
        message: 'Item deleted!',
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Could not delete item'
      })
    })

})



//get all users (while testing stuff)
app.get('/users', (req, res) => {
  knex('users')
    .select('*')
    .then(usersData => {
      res.status(200).json(usersData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Could not get users'
      })
    })
})

//create new users (while testing stuff)
app.post('/users', (req, res) => {
  const {first_name, last_name, username, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    first_name,
    last_name,
    username,
    password: hashedPassword
  }
  knex('users')
    .insert(newUser)
    .returning('*')
    .then(allUserData => {
      const newUserData = allUserData[0];
      console.log(newUserData);
      res.status(201).json(newUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Could not create new user'
      })
    })
})

// //items CREATE without authentication
// app.post('/items', (req, res) => {
//   const {user_Id, item_name, description, quantity} = req.body;
//   const newItem = {
//     user_Id,
//     item_name,
//     description,
//     quantity
//   }
//   knex('items')
//     .insert(newItem)
//     .returning('*')
//     .then(allItemData => {
//       const newItemData = allItemData[0];
//       console.log(newItemData);
//       res.status(201).json(newItemData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         message: 'Could not create new item'
//       })
//     })
// })

//items UPDATE without authentication
// app.put ('/items/:id', (req, res) => {
//   const itemId = req.params.id;
//   const {user_Id, item_name, description, quantity} = req.body;
//   const updatedItem = {
//     user_Id,
//     item_name,
//     description,
//     quantity
//   }
//   knex('items')
//     .where({id: itemId})
//     .update(updatedItem)
//     .returning('*')
//     .then(records => {
//       if (records.length === 0) {
//         res.status(404).json({
//           message: 'Item not found.'
//       })
//     }
//     res.status(201).json({
//       message: 'Item updated successfully.',
//       })
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         message: 'Could not update item'
//       })
//   })
// })


// //items DELETE without authentication
// app.delete(`/items/:id`, (req, res) => {
//   const itemId = req.params.id;

//   knex('items')
//     .where({id: itemId})
//     .delete()
//     .returning('*')
//     .then(records => {
//       if (records.length === 0) {
//         res.status(404).json({
//           message: 'Item not found.'
//       })
//     }
//     res.status(201).json({
//       message: 'Item deleted successfully.',
//       })
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         message: 'Could not delete item'
//       })
//   })

// })

// //delete users (while testing stuff)
// app.delete('/users/:id', (req, res) => {
//   const {id} = req.params;

//   knex('users')
//     .where({id})
//     .delete()
//     .returning('*')
//     .then(deleteUserData => {
//       if (!deleteUserData) {
//         return res.status(404).json({
//           message: 'User not found'
//         })
//       }
//       return res.status(200).json({
//         message: 'User deleted!'
//       })
//     })
// })


app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));