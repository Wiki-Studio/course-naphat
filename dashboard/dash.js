const user = JSON.parse(localStorage.getItem("user"));
const profile = document.getElementById("profile");

if (!user) {
  window.location.href = "/login.html";
} else {
  profile.innerHTML = `
    <p><b>อีเมล:</b> ${user.Email}</p>
    <p><b>ชื่อ:</b> ${user.FirstName} ${user.LastName}</p>
    <p><b>เบอร์โทร:</b> ${user.Tel}</p>
  `;
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/login.html";
});

// ------------------------------
// ดึงคอร์สจาก Google Script JSON
// ------------------------------

const courseList = document.getElementById("courseList");

async function fetchCourses() {
  try {
    // แสดงข้อความกำลังโหลด
    courseList.innerHTML = `<p class="loading">⏳ กำลังโหลดข้อมูล...</p>`;

    const res = await fetch("https://script.google.com/macros/s/AKfycbwqrsNdbVnQ3U3EGHYTONvEN2w2ge2950q4TWau8xuvGkfNjnFzYxy1gPpa5a7I0H_y/exec");
    const data = await res.json();

    // เคลียร์ข้อความโหลด
    courseList.innerHTML = "";

    // หา user ที่อีเมลตรงกัน
    const matchedUser = data.find(item => item.Email === user.Email);

    if (!matchedUser) {
      courseList.innerHTML = `<p>ไม่พบข้อมูลคอร์สของผู้ใช้นี้</p>`;
      return;
    }

    // วนดูคอร์สที่มีใน id1–id10
    let foundAny = false;
    for (let i = 1; i <= 10; i++) {
      const courseId = matchedUser[`id${i}`];
      const courseTitle = matchedUser[`course${i}`];

      if (courseId && courseTitle) {
        foundAny = true;
        const item = document.createElement("div");
        item.classList.add("course-item");
        item.innerHTML = `
          <strong>${courseTitle}</strong>
          <div id="right">
              <button class="study-btn" data-id="${courseId}">เข้าเรียนต่อ</button>
          </div>
        `;
        courseList.appendChild(item);
      }
    }

    if (!foundAny) {
      courseList.innerHTML = `<p>ยังไม่มีคอร์สที่ลงทะเบียน</p>`;
    }

  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการโหลดคอร์ส:", error);
    courseList.innerHTML = `<p style="color:red;">ไม่สามารถโหลดข้อมูลได้</p>`;
  }
}

fetchCourses();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("study-btn")) {
    const courseId = e.target.getAttribute("data-id");
    window.location.href = `study.html?courseId=${courseId}`;
  }
});
