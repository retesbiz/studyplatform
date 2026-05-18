require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/users',     require('./routes/users'));
app.use('/api/courses',   require('./routes/courses'));
app.use('/api/notes',     require('./routes/notes'));
app.use('/api/quizzes',   require('./routes/quizzes'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
