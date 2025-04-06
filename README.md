# AI Inpainting Web Application

A full-stack web application for AI-powered image inpainting, allowing users to remove unwanted objects from images.

## Features
- Upload images for inpainting
- Mark areas to remove with brush tool
- AI-powered object removal
- Before/after comparison slider
- Download edited images

## Tech Stack
- Frontend: HTML5, Tailwind CSS, Vanilla JavaScript
- Backend: Node.js + Express
- Image Processing: [Replicate API](https://replicate.com/) (Stable Diffusion Inpainting)

## Setup Instructions

### 1. Prerequisites
- Node.js (v16+)
- npm (v8+)
- API key from [Replicate](https://replicate.com/) or similar service

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/inpainting-ai.git
cd inpainting-ai

# Install dependencies
npm install express multer axios dotenv
```

### 3. Configuration
Create a `.env` file in the root directory:
```env
REPLICATE_API_KEY=your_api_key_here
PORT=5000
```

### 4. Running the Application
```bash
# Start the backend server
node server.js

# In a new terminal, serve the frontend
python3 -m http.server 8000
```

The application will be available at:
- Frontend: http://localhost:8000
- Backend: http://localhost:5000

## API Connection

### Using Replicate API
1. Sign up at [replicate.com](https://replicate.com/)
2. Get your API key from account settings
3. Update the API call in `server.js`:

```javascript
const response = await axios.post(
  'https://api.replicate.com/v1/predictions',
  {
    version: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
    input: {
      image: `data:image/png;base64,${base64Image}`,
      prompt: prompt,
      mask: `data:image/png;base64,${base64Mask}`
    }
  },
  {
    headers: {
      'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }
);
```

### Alternative APIs
You can also use:
- OpenAI's DALL·E Inpainting
- Blackbox AI API
- Custom trained model

## Project Structure
```
inpainting-ai/
├── public/            # Frontend files
│   ├── index.html     # Landing page
│   ├── dashboard.html # Inpainting interface
│   └── assets/        # Images, styles, scripts
├── server.js          # Backend server
├── uploads/           # Temporary image storage
├── .env               # Environment variables
└── README.md          # This file
```

## Deployment
For production deployment:
1. Set up a cloud server (AWS, GCP, Azure)
2. Configure environment variables
3. Use PM2 or similar process manager:
```bash
npm install -g pm2
pm2 start server.js
```

## License
MIT License