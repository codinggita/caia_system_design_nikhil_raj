const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const conceptRoutes = require('./routes/concept.routes');
const taxonomyRoutes = require('./routes/taxonomy.routes');
const searchRoutes = require('./routes/search.routes');
const filterRoutes = require('./routes/filter.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const { bookmarkRouter, noteRouter, voteRouter } = require('./routes/interaction.routes');
const bulkRoutes = require('./routes/bulk.routes');
const adminRoutes = require('./routes/admin.routes');
const systemRoutes = require('./routes/system.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}
app.use(helmet());
app.use(rateLimiter);

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/concepts/bulk', bulkRoutes); // Mount before /:id to prevent conflict
app.use('/api/v1/concepts', conceptRoutes);
app.use('/api/v1', taxonomyRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/filter', filterRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/bookmarks', bookmarkRouter);
app.use('/api/v1/notes', noteRouter);
app.use('/api/v1/votes', voteRouter);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1', systemRoutes); // For health and system

// Global error handler
app.use(errorHandler);

module.exports = app;
