
const canvas = document.getElementById('stockAnimation');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const screenSizeFactor = Math.min(canvas.width, canvas.height) / 1080;
const iconSize = 100 * screenSizeFactor;
const speedFactor = Math.min(canvas.width, canvas.height) / 1080;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const initialCanvasWidth = 1440;
const initialCanvasHeight = 744;

const ellipseWidthFactor = canvas.width / initialCanvasWidth;
const ellipseHeightFactor = canvas.height / initialCanvasHeight;

const ellipseParams = [
    {
        width: Math.min(canvas.width * 0.9, 1310.73 * ellipseWidthFactor),
        height: Math.min(canvas.height * 0.9, 508.33 * ellipseHeightFactor),
        rotation: -2.35 * (Math.PI / 180)
    },
    {
        width: Math.min(canvas.width * 0.9, 1027.36 * ellipseWidthFactor),
        height: Math.min(canvas.height * 0.9, 593.42 * ellipseHeightFactor),
        rotation: 20.87 * (Math.PI / 180)
    }
];

const iconsSrc = [
    [
        'https://static.wixstatic.com/shapes/69b209_6ccd5cd65f344a888890fd589ea05de4.svg',
        'https://static.wixstatic.com/shapes/69b209_71146384278d4c0f9f560e944e51e776.svg',
        'https://static.wixstatic.com/shapes/69b209_daa9d92ad10e468f843780c784e01af3.svg',
        'https://static.wixstatic.com/shapes/69b209_d742815d9bf9473080d20bdf2689ecb9.svg',
        'https://static.wixstatic.com/shapes/69b209_16734c85b9c64b16a15272844d096fb7.svg',
    ],
    [
        'https://static.wixstatic.com/shapes/69b209_a4c2cd9892284f7ca0a9c3c312f35903.svg',
        'https://static.wixstatic.com/shapes/69b209_3505b6eae3cd45e1846cd729f425bc3e.svg',
        'https://static.wixstatic.com/shapes/69b209_46cd96b2e30a4b9a97db0501a81d3a1e.svg',
        'https://static.wixstatic.com/shapes/69b209_b45e89ea2a9d4f55943d582fd375ad2a.svg',
        'https://static.wixstatic.com/shapes/69b209_b3e81823eb684efeb06416eb3641b99a.svg',
    ]
];

class StockIcon {
    constructor(angle, ellipseIndex, iconIndex) {
        this.image = new Image();
        this.image.src = iconsSrc[ellipseIndex][iconIndex];
        this.size = iconSize;
        this.angle = angle;
        this.speed = 0.0026 * speedFactor;
        this.ellipseIndex = ellipseIndex;
    }

    draw() {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(this.angle);
        ctx.translate(ellipseParams[this.ellipseIndex].width * Math.cos(this.angle), -ellipseParams[this.ellipseIndex].height * Math.sin(this.angle));
        ctx.rotate(-this.angle);
        ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }

    update() {
        this.angle += this.speed;
    }
}

const stockIcons = [];
for (let i = 0; i < 5; i++) {
    stockIcons.push(new StockIcon((i * (Math.PI * 2)) / 5, 0, i));
    stockIcons.push(new StockIcon((i * (Math.PI * 2)) / 5, 1, i));
}

function drawEllipses() {
    ctx.save();
    ctx.translate(centerX, centerY);

    for (let i = 0; i < ellipseParams.length; i++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, ellipseParams[i].width, ellipseParams[i].height, ellipseParams[i].rotation, 0, Math.PI * 2);
        let gradient = ctx.createLinearGradient(0, -ellipseParams[i].height, 0, ellipseParams[i].height);
        gradient.addColorStop(0, 'rgba(0, 224, 145, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEllipses();

    for (const icon of stockIcons) {
        icon.draw();
    }
}

function update() {
    for (const icon of stockIcons) {
        icon.update();
    }
}

function captureFrame() {
    let base64Image = canvas.toDataURL("image/png");
    pngFrames.push(base64Image);
  }
  
  function renderAnimation() {
    draw();
    update();
  }
  
  function mainLoop() {
    renderAnimation();
    captureFrame();
    setTimeout(mainLoop, frameDuration);
  }
  
  let frameDuration = 1000 / desiredFrameRate;
  let pngFrames = [];
  let desiredFrameRate = 30; // Adjust frame rate as needed
  mainLoop();
  
  // ... [FFmpeg.js function encodeVideo] ...
  
  // ... [createDownloadLink function] ...
  
  // Trigger the encodeVideo() function when your animation is complete or when a button is clicked.
  document.getElementById("your-button-id").addEventListener("click", encodeVideo);
  const exportVideoBtn = document.getElementById("export-video-btn");
  exportVideoBtn.addEventListener("click", () => {
    encodeVideo();
  });
