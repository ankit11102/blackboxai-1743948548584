// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    console.log('Application loaded');
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });

    // Global event listeners
    document.addEventListener('click', handleGlobalClicks);
});

function showTooltip(e) {
    const tooltipText = e.target.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg';
    tooltip.textContent = tooltipText;
    tooltip.style.top = `${e.target.offsetTop - 40}px`;
    tooltip.style.left = `${e.target.offsetLeft}px`;
    tooltip.id = 'current-tooltip';
    document.body.appendChild(tooltip);
}

function hideTooltip() {
    const tooltip = document.getElementById('current-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function handleGlobalClicks(e) {
    // Handle global click events
    console.log('Global click handler', e.target);
}

// Image processing functions
function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('imageCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            document.getElementById('imagePreview').classList.remove('hidden');
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

// Initialize brush tools
function initBrushTools() {
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentTool = 'brush';
    let brushSize = 10;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentTool === 'brush' ? 'rgba(255,0,0,0.5)' : 'rgba(0,0,0,1)';
        ctx.globalCompositeOperation = currentTool === 'brush' ? 'source-over' : 'destination-out';
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }
}