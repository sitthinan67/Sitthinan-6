// ปีลิขสิทธิ์ปัจจุบัน
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll reveal: section ค่อยๆ ปรากฏตอนเลื่อนเข้ามาในจอ
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // ถ้าเป็น section ทักษะ ให้เริ่มเติมแถบ progress bar
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

// เติมแถบ progress bar ตาม data-percent
function animateSkillBars() {
    document.querySelectorAll('.bar-fill').forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
}
