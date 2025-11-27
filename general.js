document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");

    // แทรก header HTML
    header.innerHTML = `
    <div class="container header-container">
        <a href="index.html" class="logo">Naphat's <span>Course</span></a>
        
        <div class="menu-toggle">
            <i class="fas fa-bars active"></i>
            <i class="fas fa-xmark"></i>
        </div>
        
        <ul class="nav-menu">
            <li><a href="index.html" class="active">หน้าแรก</a></li>
            <li><a href="courses.html">คอร์สเรียนทั้งหมด</a></li>
            <li><a href="instructors.html">ผู้สอน</a></li>
            <li><a href="about.html">เกี่ยวกับเรา</a></li>
            <li><a href="contact.html">ติดต่อเรา</a></li>
        </ul>
        
        <div class="header-actions">
            <a href="login.html" class="btn btn-outline">เข้าสู่ระบบ</a>
            <a href="register.html" class="btn">สมัครสมาชิก</a>
        </div>
    </div>
    `;

    // 🔹 ตอนนี้ header ถูกแทรกแล้ว → จึงสามารถ select element ได้
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    const bars = toggle.querySelector('.fa-bars');
    const xmark = toggle.querySelector('.fa-xmark');

    // ✅ Mobile Menu Toggle
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        bars.classList.toggle('active');
        xmark.classList.toggle('active');
    });

    // ✅ Testimonials Slider (รอ header เสร็จแล้วค่อย init)
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    if (testimonialsContainer && dots.length > 0) {
        function showSlide(index) {
            testimonialsContainer.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentSlide = index;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        setInterval(() => {
            currentSlide = (currentSlide + 1) % dots.length;
            showSlide(currentSlide);
        }, 5000);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("footer");

    footer.innerHTML = `
    <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h3>Naphat's Course</h3>
                    <p>แพลตฟอร์มการเรียนรู้ออนไลน์ที่มุ่งมั่นพัฒนาทักษะสำหรับทุกคน</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                
                <div class="footer-col">
                    <h3>คอร์สเรียน</h3>
                    <ul>
                        <li><a href="#">การพัฒนาเว็บ</a></li>
                        <li><a href="#">วิทยาศาสตร์ข้อมูล</a></li>
                        <li><a href="#">การพัฒนาแอปพลิเคชัน</a></li>
                        <li><a href="#">การออกแบบ UX/UI</a></li>
                        <li><a href="#">การตลาดดิจิทัล</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h3>ลิงก์ด่วน</h3>
                    <ul>
                        <li><a href="#">หน้าแรก</a></li>
                        <li><a href="#">เกี่ยวกับเรา</a></li>
                        <li><a href="#">ผู้สอน</a></li>
                        <li><a href="#">บทความ</a></li>
                        <li><a href="#">ติดต่อเรา</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h3>ติดต่อเรา</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> กรุงเทพมหานคร, ประเทศไทย</li>
                        <li><i class="fas fa-phone"></i> +6663 686 9505</li>
                        <li><i class="fas fa-envelope"></i> 68010304@kmitl.ac.th</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 Naphat's Course. สงวนลิขสิทธิ์</p>
            </div>
        </div>
  `;
});