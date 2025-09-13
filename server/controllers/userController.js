/* TODO:
 * Implement user input validation https://medium.com/@techsuneel99/validate-incoming-requests-in-node-js-like-a-pro-95fbdff4bc07
*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db.js');
const SECRET_KEY = 'my-secret-key';

const register = async (req, res) => {
  const { email, password } = req.body;
  const image = req.file;

  try {
    //Checks if the current email already exists
    const rows = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(409).json({message: "This Email already exists, please try logging in." });
    } 

    //Hash
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let createUserQuery;

    //Checks if user uploads an image
    if (image){
      const imagePath = image.filename

      createUserQuery = "INSERT INTO users (email, password, image) VALUES (?, ?, ?)";
      params = [email, hashedPassword, imagePath]

    } else {
      createUserQuery = "INSERT INTO users (email, password) VALUES (?, ?)"; 
      params = [email, hashedPassword];
    }

    const result = await db.query(createUserQuery, params)

    if (result.affectedRows > 0) {
      console.log(`Created user with ID: ${result.insertId}`);
      res.status(201).json({ message: "Registration successful, you may now login." });
    } else {
      console.log("Failed to create user", result);
      res.status(500).json({ message: "Failed to register, please try again." });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userEmail = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    // Check if the user's email exists
    if (userEmail.length > 0) {
      const user = userEmail[0];
      const storedPassword = user.password;
  
      //Hash Unlock & Password matching
      const matchUser = await bcrypt.compare(password, storedPassword);

      if (matchUser) {
        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' })
        // console.log(`User with ID: ${userEmail.id} successfully logged in.`);
        res.status(200).json({ token, message: "Login successful" });

      } else {
        res.status(401).json({ message: "Invalid email or password"});
      }

    } else {
      res.status(404).json({ message:"Invalid email or password"});
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error"});
  }
};

module.exports = { register, login }
