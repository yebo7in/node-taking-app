const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For hashing passwords
const User = require('./models/User'); // Import your User model
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using the MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.set('view engine', 'ejs'); // If you're using EJS for templating
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

// Flash messages middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index'); // Render index.ejs
});

// Registration Page
app.get('/register', (req, res) => {
    res.render('register'); // Render register.ejs
});

// Login Page
app.get('/login', (req, res) => {
    res.render('login'); // Render login.ejs
});

// Handle Registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        req.flash('success_msg', 'You are now registered!');
        res.redirect('/login'); // Redirect to login page after registration
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error in registration');
        res.redirect('/register');
    }
});

// Handle Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            req.flash('error_msg', 'Invalid email or password');
            return res.redirect('/login');
        }
        req.session.userId = user._id; // Store user ID in session
        req.flash('success_msg', 'You are now logged in!');
        res.redirect('/notes'); // Redirect to notes page after login
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error in logging in');
        res.redirect('/login');
    }
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.redirect('/notes');
        }
        req.flash('success_msg', 'You have logged out successfully!');
        res.redirect('/login');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});