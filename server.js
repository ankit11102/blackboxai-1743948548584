const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// API endpoint for image upload and processing
app.post('/api/inpaint', upload.single('image'), async (req, res) => {
    const prompt = req.body.prompt;
    const imagePath = req.file.path;

    try {
        // Call the inpainting API (replace with your actual API endpoint)
        const response = await axios.post('YOUR_INPAINTING_API_URL', {
            image: fs.readFileSync(imagePath).toString('base64'),
            prompt: prompt
        });

        // Assuming the API returns the edited image in base64 format
        const editedImage = response.data.editedImage;

        // Clean up uploaded image
        fs.unlinkSync(imagePath);

        res.json({ editedImage: editedImage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing image' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});