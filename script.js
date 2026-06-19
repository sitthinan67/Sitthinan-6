// 1. ดักจับตำแหน่งเมาส์เพื่อให้วงกลมขยับไล่ตาม
const cursorBlur = document.querySelector('.cursor-blur');

document.addEventListener('mousemove', (e) => {
    cursorBlur.style.left = e.clientX + 'px';
    cursorBlur.style.top = e.clientY + 'px';
});

// 2. ดึงปีปัจจุบันมาแสดงตรง Footer โดยอัตโนมัติ
document.getElementById("year").textContent = new Date().getFullYear();
