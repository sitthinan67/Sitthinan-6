// ==========================================
// 1. ระบบเอฟเฟกต์ระเบิดเมื่อเข้าหน้าเว็บ (Explosion Effect)
// ==========================================
const canvas = document.getElementById('explosion-canvas');
const ctx = canvas.getContext('2d');

// ปรับขนาดคานวาสให้เต็มจอเสมอ
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// สร้างอาร์เรย์สำหรับเก็บสะเก็ดระเบิด
let particles = [];

// คลาสจำลองคุณสมบัติของแต่ละสะเก็ดระเบิด
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // กำหนดความเร็วและทิศทางแบบสุ่มรอบทิศทาง
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 5; // เพิ่มความเร็วให้ระเบิดแรงขึ้น
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.radius = Math.random() * 5 + 2; // ขนาดของสะเก็ด
        // สีโทนนีออนวิทยาศาสตร์
        const colors = ['#38bdf8', '#0ea5e9', '#7dd3fc', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1; 
        this.decay = Math.random() * 0.02 + 0.015; // ความเร็วในการจางหาย
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15; // เพิ่มความเรืองแสงให้ชัดขึ้น
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96; // แรงต้านอากาศ
        this.vy *= 0.96;
        this.alpha -= this.decay; 
    }
}

// ฟังก์ชันเริ่มจุดระเบิดกลางหน้าจอ
function createExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 150; i++) { // เพิ่มจำนวนสะเก็ดเป็น 150 ชิ้นให้ตูมตามขึ้น
        particles.push(new Particle(centerX, centerY));
    }
}

// แอนิเมชันรันเฟรมภาพต่อเนื่อง
function animateExplosion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }
    
    if (particles.length > 0) {
        requestAnimationFrame(animateExplosion);
    }
}

// สั่งให้ระเบิดทำงานทันทีที่โค้ดบรรทัดนี้ถูกอ่าน (ไม่ต้องรอโหลดหน้าเว็บเสร็จ)
createExplosion();
animateExplosion();


// ==========================================
// 2. ระบบดักจับตำแหน่งเมาส์ (Mouse Trail)
// ==========================================
const cursorBlur = document.querySelector('.cursor-blur');

document.addEventListener('mousemove', (e) => {
    if(cursorBlur) {
        cursorBlur.style.left = e.clientX + 'px';
        cursorBlur.style.top = e.clientY + 'px';
    }
});


// ==========================================
// 3. ดึงปีปัจจุบันมาแสดงตรง Footer โดยอัตโนมัติ
// ==========================================
const yearSpan = document.getElementById("year");
if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
