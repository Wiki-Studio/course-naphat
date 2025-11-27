const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html";
}

const allCourse = document.getElementById("allcourse");
const searchInput = document.getElementById("Search");
const levelSelect = document.getElementById("level");

let allCourses = []; // เก็บ JSON ทั้งหมด
let ownedIds = [];   // เก็บ ID คอร์สที่ผู้ใช้มี

// ------------------------------
// โหลดข้อมูลทั้งหมด
// ------------------------------
async function loadCourses() {
  try {
    allCourse.innerHTML = `<p class="loading">⏳ กำลังโหลดบทเรียนทั้งหมด...</p>`;

    const [courseRes, userRes] = await Promise.all([
      fetch("https://script.google.com/macros/s/AKfycbyX3FddB-UA2m1J9mcnRiXEX7TGp1tNKMla6IucuqMlxGwzUQyRS0_sVn67rfGYo7oN/exec"),
      fetch("https://script.google.com/macros/s/AKfycbwqrsNdbVnQ3U3EGHYTONvEN2w2ge2950q4TWau8xuvGkfNjnFzYxy1gPpa5a7I0H_y/exec")
    ]);

    const [courseData, userData] = await Promise.all([courseRes.json(), userRes.json()]);
    allCourses = courseData;
    allCourse.innerHTML = "";

    // หา user ที่อีเมลตรงกัน
    const matchedUser = userData.find(u => u.Email === user.Email);
    ownedIds = [];

    if (matchedUser) {
      for (let i = 1; i <= 10; i++) {
        const id = matchedUser[`id${i}`];
        if (id) ownedIds.push(id);
      }
    }

    // เติม option ของระดับ (level)
    const uniqueLevels = [...new Set(allCourses.map(c => c.level))];
    levelSelect.innerHTML = `<option value="">ทั้งหมด</option>`;
    uniqueLevels.forEach(lv => {
      levelSelect.innerHTML += `<option value="${lv}">${lv}</option>`;
    });

    renderCourses(allCourses);

  } catch (err) {
    console.error(err);
    allCourse.innerHTML = `<p style="color:red;">❌ โหลดข้อมูลไม่สำเร็จ</p>`;
  }
}

// ------------------------------
// ฟังก์ชันแสดงคอร์ส
// ------------------------------
function renderCourses(list) {
  allCourse.innerHTML = "";

  if (!list || list.length === 0) {
    allCourse.innerHTML = `<p>ไม่พบบทเรียนที่ตรงกับการค้นหา</p>`;
    return;
  }

  list.forEach(c => {
    const haveCourse = ownedIds.includes(c.id);
    const status = haveCourse ? "have" : "have-not";
    const buttonText = haveCourse ? "เรียนแล้ว" : "ซื้อคอร์ส";
    const buttonDisabled = haveCourse ? "disabled" : "";

    const item = document.createElement("div");
    item.classList.add("course-card");
    item.innerHTML = `
      <div class="course-image">
        <img src="${c.image}" alt="${c.title}">
      </div>
      <div class="course-content">
        <span class="course-category">${c.subject}</span>
        <h3 class="course-title">${c.title}</h3>
        <div class="course-instructor">
          <img src="${c.image_teacher}" alt="${c.teacher}">
          <span>${c.teacher}</span>
        </div>
        <div class="course-meta">
          <span><i class="far fa-clock"></i> ${c.hours}</span>
          <span><i class="far fa-user"></i> ${c.level}</span>
        </div>
        <div class="course-price">
          <div class="price">
            <s style="color: #ccc; user-select: none;">${c.price_s}</s> ${c.price}
          </div>
          <div class="addToCart" status="${status}">
            <button id="add" ${buttonDisabled} data-id="${c.id}">${buttonText}</button>
          </div>
        </div>
      </div>
    `;
    allCourse.appendChild(item);
  });
}

// ------------------------------
// ฟังก์ชันกรองข้อมูล
// ------------------------------
function filterCourses() {
  const searchText = searchInput.value.trim().toLowerCase();
  const levelValue = levelSelect.value;

  const filtered = allCourses.filter(c => {
    const matchSearch =
      c.title.toLowerCase().includes(searchText) ||
      c.subject.toLowerCase().includes(searchText) ||
      c.teacher.toLowerCase().includes(searchText);
    const matchLevel = !levelValue || c.level === levelValue;
    return matchSearch && matchLevel;
  });

  renderCourses(filtered);
}

// ------------------------------
// Event ค้นหา / กรอง
// ------------------------------
searchInput.addEventListener("input", filterCourses);
levelSelect.addEventListener("change", filterCourses);

// ------------------------------
// คลิกปุ่มซื้อคอร์ส
// ------------------------------
document.addEventListener("click", (e) => {
  if (e.target.id === "add" && e.target.closest(".addToCart").getAttribute("status") === "have-not") {
    const courseId = e.target.getAttribute("data-id");
    window.location.href = `cart.html?id=${courseId}`;
  }
});

// ------------------------------
// เริ่มต้นโหลด
// ------------------------------
loadCourses();
