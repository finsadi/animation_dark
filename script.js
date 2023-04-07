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
        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.restore();
    }

    update() {
        this.angle += this.speed;

        const ellipse = ellipseParams[this.ellipseIndex];
        this.x = centerX + (ellipse.width / 2) * Math.cos(this.angle) * Math.cos(ellipse.rotation) - (ellipse.height / 2) * Math.sin(this.angle) * Math.sin(ellipse.rotation);
        this.y = centerY + (ellipse.width / 2) * Math.cos(this.angle) * Math.sin(ellipse.rotation) + (ellipse.height / 2) * Math.sin(this.angle) * Math.cos(ellipse.rotation);
    }
}

const stockIcons = [];
for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 5; j++) {
        const angle = (j / 5) * (2 * Math.PI);
        stockIcons.push(new StockIcon(angle, i, j));
    }
}


function drawEllipse(ellipse) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, ellipse.width / 2, ellipse.height / 2, ellipse.rotation, 0, 2 * Math.PI);

    // Create a gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(0, 224, 145, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
    ctx.strokeStyle = gradient;
    
    ctx.lineWidth = 1;
    ctx.filter = 'blur(1px)';
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ellipseParams.forEach(ellipse => drawEllipse(ellipse));

    stockIcons.forEach(stockIcon => {
        stockIcon.update();
        stockIcon.draw();
    });

    requestAnimationFrame(animate);
}


animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ellipseWidthFactor = canvas.width / initialCanvasWidth;
    const ellipseHeightFactor = canvas.height / initialCanvasHeight;

    ellipseParams[0].width = Math.min(canvas.width * 0.9, 1310.73 * ellipseWidthFactor);
    ellipseParams[0].height = Math.min(canvas.height * 0.9, 508.33 * ellipseHeightFactor);

    ellipseParams[1].width = Math.min(canvas.width * 0.9, 1027.36 * ellipseWidthFactor);
    ellipseParams[1].height = Math.min(canvas.height * 0.9, 593.42 * ellipseHeightFactor);

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    const speedFactor = Math.min(canvas.width, canvas.height) / 1080;
    stockIcons.forEach(stockIcon => {
        stockIcon.speed = 0.0026 * speedFactor;
    });
});