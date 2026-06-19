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
        // กำหนดความเร็วและทิศทางแบบสุ่มรอบทิศทาง (ระเบิดวงกลม)
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4; // ความเร็วพุ่งตัวออก
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.radius = Math.random() * 4 + 2; // ขนาดของสะเก็ด
        // สุ่มสีโทนนีออนวิทยาศาสตร์ (ฟ้า/น้ำเงิน/ขาว)
        const colors = ['#38bdf8', '#0ea5e9', '#7dd3fc', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1; // ค่าความโปร่งแสงเริ่มต้น
        this.decay = Math.random() * 0.015 + 0.01; // ความเร็วในการจางหาย
    }

    // วาดสะเก็ดระเบิดลงบนจอ
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // ใส่เอฟเฟกต์เรืองแสงให้ตัวระเบิด
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }

    // อัปเดตพิกัดและการจางหาย
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98; // แรงต้านอากาศทำให้ช้าลงเรื่อยๆ
        this.vy *= 0.98;
        this.alpha -= this.decay; // ค่อยๆ จางลง
    }
}

// ฟังก์ชันเริ่มจุดระเบิดกลางหน้าจอ
function createExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // สร้างเศษสะเก็ดระเบิดจำนวน 120 ชิ้น
    for (let i = 0; i < 120; i++) {
        particles.push(new Particle(centerX, centerY));
    }
}

// แอนิเมชันรันเฟรมภาพต่อเนื่อง
function animateExplosion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        // ถ้าจางจนมองไม่เห็นแล้ว ให้ลบออกจากระบบเพื่อประหยัดแรมคอมพิวเตอร์
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }
    
    // ถ้ายังมีเศษระเบิดเหลืออยู่ ให้ทำแอนิเมชันต่อ
    if (particles.length > 0) {
        requestAnimationFrame(animateExplosion);
    }
}

// สั่งให้ระเบิดทำงานทันทีที่โหลดหน้าเว็บเสร็จ
window.addEventListener('DOMContentLoaded', () => {
    createExplosion();
    animateExplosion();
});


// ==========================================
// 2. ระบบดักจับตำแหน่งเมาส์ (Mouse Trail)
// ==========================================
const cursorBlur = document.querySelector('.cursor-blur');

document.addEventListener('mousemove', (e) => {
    cursorBlur.style.left = e.clientX + 'px';
    cursorBlur.style.top = e.clientY + 'px';
});


// ==========================================
// 3. ดึงปีปัจจุบันมาแสดงตรง Footer โดยอัตโนมัติ
// ==========================================
document.getElementById("year").textContent = new Date().getFullYear();
