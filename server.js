const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Sample data: Articles
let articles = [
  { id: 1, title: 'Artificial Intelligence in Medicine', content: 'AI is revolutionizing healthcare.' },
  { id: 2, title: 'The Future of Technology', content: 'Technological advancements are growing rapidly.' },
  { id: 3, title: 'Exploring Machine Learning', content: 'Machine learning is a subset of AI.' },
];

// Endpoint to get all articles
app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// Endpoint to get article by ID
app.get('/api/articles/:id', (req, res) => {
  const articleId = parseInt(req.params.id, 10); // Extract ID from URL
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return res.status(404).json({ message: 'Article not found' });
  }

  res.json(article);
});

// Simple search endpoint (case-insensitive)
app.get('/api/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(query) ||
    article.content.toLowerCase().includes(query)
  );
  res.json(filteredArticles);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
