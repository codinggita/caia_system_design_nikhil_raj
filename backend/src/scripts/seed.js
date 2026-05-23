const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const fs = require('fs');
const mongoose = require('mongoose');
const Concept = require('../models/concept.model');
const User = require('../models/user.model');

// Connect to DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/system_design_kb', {
  // options not needed
});

// Read JSON files
const datasetPath = path.join(__dirname, '../../../dataset.json');
const concepts = JSON.parse(
  fs.readFileSync(datasetPath, 'utf-8')
);

const importData = async () => {
  try {
    await Concept.deleteMany();
    console.log('Old concepts deleted...');

    const formattedConcepts = concepts.map(item => {
      // Handle potential string arrays
      const parseArray = (val) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') return val.split(',').map(s => s.trim());
        return [];
      };

      const metadata = item.metadata || {};

      let difficulty = metadata.difficulty ? metadata.difficulty.toLowerCase() : 'intermediate';
      if (!['beginner', 'intermediate', 'advanced', 'expert'].includes(difficulty)) {
        difficulty = 'intermediate';
      }

      return {
        title: metadata.concept || item.prompt.substring(0, 50) + '...',
        content: item.response || '',
        category: metadata.category || 'Uncategorized',
        subcategory: metadata.subcategory || '',
        tags: parseArray(metadata.technologies).concat(parseArray(metadata.cloud_platforms)),
        difficulty: difficulty,
        designPatterns: parseArray(metadata.patterns_covered),
        supportedLanguages: parseArray(metadata.languages),
        questionType: metadata.question_type || 'general',
        views: Math.floor(Math.random() * 1000),
        bookmarks: Math.floor(Math.random() * 100)
      };
    });

    // Bulk insert (batching if needed, but Mongoose insertMany handles reasonably large arrays)
    // For 8MB JSON, it's about 12k items, insertMany should handle it, but chunking is safer
    const chunkSize = 1000;
    for (let i = 0; i < formattedConcepts.length; i += chunkSize) {
      const chunk = formattedConcepts.slice(i, i + chunkSize);
      await Concept.insertMany(chunk);
      console.log(`Inserted ${i + chunk.length} concepts...`);
    }

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Concept.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
