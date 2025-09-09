const db = require('../db.js');
const bcrypt = require('bcrypt');


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
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const saltRounds = 10;

    //Checks if user uploads an image
    const imagePath = image.filename
    let createUserQuery

    if (image){
      createUserQuery = "INSERT INTO users (email, password, image) VALUES (?, ?, ?)";
      params = [email, hashedPassword, imagePath]
    } else {
      createUserQuery = "INSERT INTO users (email, password) VALUES (?, ?)"; 
      params = [email, hashedPassword];
    }

    const result = await db.query(createUserQuery, params)

    if (result.affectedRows > 0) {
      console.log(`Created user with id ${result}`);
      res.status(201).json({ message: "Registration successful, please login next." });
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
    const rows = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      const user = rows[0];
      const storedPassword = user.password;
  
      //Hash Unlock
      // const match = await bcrypt.compare(password, storedPassword);
      bcrypt.compare(password, storedPassword, (err, match) => {
        if (err) {
          console.log("Error comparing passwords:", err);
        } else {

          if (match) {
            // send back a token here when using JWT
            res.json({ message: "Login successful"});
          } else {
            res.status(401).json({ message: "Incorrect password"});
          }
        }
      });
    } else {
      res.status(404).json({ message:"User not found"});
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error"});
  }
};

module.exports = { register, login }
