const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { sequelize } = require('./config/database');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Sync database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
