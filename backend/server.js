const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./User'); // Import user model
const path = require('path');


const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library', { useNewUrlParser: true, useUnifiedTopology: true });

// Listen for connection error
mongoose.connection.on('error', error => {
    console.error('MongoDB connection error:', error);
});

// Listen for successful connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Authentication route

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login.html'));
});

app.get('/wishlist', (req, res) => {
    // res.render('wishlist');
    res.sendFile(path.join(__dirname, '..', 'wishlist.html'));
});

app.get('/readlist', (req, res) => {
    // res.render('wishlist');
    res.sendFile(path.join(__dirname, '..', 'readlist.html'));
});

app.get('/book', (req, res) => {
    // res.render('wishlist');
    res.sendFile(path.join(__dirname, '..', 'book.html'));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;


    try {
        console.log('Soham is grt and entered in the login');
        res.sendFile(path.join(__dirname, '..', 'wishlist.html'));


        // // Find user by email
        // const user = await User.findOne({ email });

        // // If user doesn't exist, return error
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }

        // // Check if password matches
        // const isPasswordValid = await bcrypt.compare(password, user.password);

        // // If password is invalid, return error
        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: 'Invalid password' });
        // }

        // // Password is valid, user is authenticated
        // res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        // Handle any errors
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
