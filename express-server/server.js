const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const pool = require('./db');

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
/***************************************************/
/********************* Sign up *********************/
/***************************************************/
app.post('/users/signup', async(req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const email = req.body.email;
    const password = hashedPassword;
    
    const newUser = pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password])
      .then (() => {
        res.status(201).json({ message: 'Sign up successful' });
      })
      .catch (err => {
        if (err.code === '23505') {
          res.status(409).json({ message: 'Email already exists in the database' });
        }
      });
  } catch {
    res.status(500).send();
  }
});

/***************************************************/
/********************* Sign in *********************/
/***************************************************/
app.post('/users/signin', async(req, res) => {

  /* (1) USER AUTHENTICATION: verify who a user is */

  const email = req.body.email;
  const password = req.body.password;

  /* Select all users in database where e-mail is the same as the one that was passed in the form */
  const existingUsers = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  /* Get first user (i.e., first element) of an array (there should be only one user because email column has set unique constraint) */
  /* There cannot be two users with the same email */
  const user = existingUsers.rows[0];

  /* If array is empty (i.e., e-mail does not exist in database)... */
  if (user == undefined) {
    /* ...return an error */
    return res.status(400).json({ message: 'Incorrect e-mail' });
  }
  /* If array is not empty (i.e., e-mail does exist in database)... */
  try {
    /* ...and if the password that was passed in is the same as password of that particular user from database... */
    if (await bcrypt.compare(req.body.password, user.password)) {

      /* (2) USER AUTHORIZATION: verify what they have access to */

      /* ...generate a JWT */
      const email = req.body.email;
      const user = { email: email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    } else { /* ...but the password that was passed in is NOT the same as password of that particular user from database... */
      /* ...return an error */
      return res.status(400).send('Incorrect password.');
    }
  } catch {
    res.status(500).send();
  }
});

/* Set port and listen for requests */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});