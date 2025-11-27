const apiUrl = "https://script.google.com/macros/s/AKfycbwc2QQ0kwsG3wavTujR6xKkcVSFix4XZxUgLDhdbNbpvoyWKKTH1oBRIszyFElMY9ZT/exec";
const params = new URLSearchParams(window.location.search);
const courseId = params.get("courseId");

// โหลดข้อมูลทันที
const dataPromise = fetch(apiUrl).then(res => res.json()).catch(() => []);

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("my-course");
  const titleEl = document.getElementById("title");
  const subjectEl = document.getElementById("subject");
  const linkEl = document.getElementById("file-url");
  const iframeEl = document.getElementById("iframe");
  const preBtn = document.querySelector(".pre");
  const nextBtn = document.querySelector(".next");

  // ใช้ข้อมูลที่โหลดไปแล้ว (ถ้าเสร็จทัน)
  const data = await dataPromise;
  const course = data.find(item => item.courseId === courseId);

  if (!course) {
    container.innerHTML = `<p style="color:red; text-align:center;">❌ ไม่พบข้อมูลคอร์สนี้</p>`;
    return;
  }

  titleEl.textContent = course.title;
  subjectEl.textContent = course.subject;
  linkEl.href = course.link || "#";
  linkEl.textContent = course.link ? "เปิดไฟล์" : "ไม่มีไฟล์ให้ดาวน์โหลด";
  iframeEl.src = course.embed_link || "";
  container.setAttribute("courseId", course.courseId);

  if (course.pre === "none") {
    preBtn.classList.add("none");
  } else {
    preBtn.addEventListener("click", () => {
      window.location.href = `study.html?courseId=${course.pre}`;
    });
  }

  if (course.next === "dash") {
    nextBtn.addEventListener("click", () => {
      window.location.href = `index.html`;
    });
  } else if (course.next && course.next !== "") {
    nextBtn.addEventListener("click", () => {
      window.location.href = `study.html?courseId=${course.next}`;
    });
  } else {
    nextBtn.classList.add("none");
  }
});
