const content = document.getElementById("cart-content");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// โหลดข้อมูลคอร์สทั้งหมดจาก Google Script
async function loadCourses() {
    content.innerHTML = `<p class="loading">⏳ กำลังโหลดข้อมูล...</p>`;
    try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbyX3FddB-UA2m1J9mcnRiXEX7TGp1tNKMla6IucuqMlxGwzUQyRS0_sVn67rfGYo7oN/exec");
        const data = await res.json();

        if (!id) {
            content.innerHTML = `<p class="notfound">ยังไม่มีคอร์สที่เลือกไว้ 😅</p>`;
            return;
        }

        const found = data.find(c => c.id === id);

        if (!found) {
            content.innerHTML = `<p class="notfound">❌ ไม่พบคอร์สที่คุณเลือก</p>`;
            return;
        }

        renderCourse(found);
    } catch (err) {
        content.innerHTML = `<p class="notfound">⚠️ เกิดข้อผิดพลาดในการโหลดข้อมูล</p>`;
        console.error(err);
    }
}

// แสดงข้อมูลคอร์สที่เลือก
function renderCourse(course) {
    content.innerHTML = `
        <div class="course">
          <img src="${course.image}" alt="${course.title}">
          <div>
            <h3>${course.title}</h3>
            <p>${course.subject} (${course.level})</p>
            <p>สอนโดย: ${course.teacher}</p>
            <div class="price">ราคา: ${course.price}</div>
          </div>
        </div>
        <button class="btn-pay" id="pay">💳 ชำระเงิน</button>
      `;
}

// ปุ่มชำระเงิน
document.addEventListener("click", (e) => {
    if (e.target.id === "pay") {
        alert("✅ ชำระเงินสำเร็จ! ระบบจะเพิ่มคอร์สให้ในบัญชีของคุณ");
        window.location.href = "course.html"; // กลับไปหน้าคอร์สทั้งหมด
    }
});

// ออกจากระบบ
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
});

loadCourses();