const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model('Post', postSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/newpost', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newpost.html'));
});

// API endpoint to get all posts
app.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            res.send(err);
        } else {
            res.json(posts);
        }
    });
});

// Handle new post submission
app.post('/newpost', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
    });

    newPost.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
