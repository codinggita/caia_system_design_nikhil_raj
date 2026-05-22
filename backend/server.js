require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().then(() => {
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Database connection failed. Server not started.', err);
  process.exit(1);
});
