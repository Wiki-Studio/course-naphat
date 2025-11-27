const scriptURL = "https://script.google.com/macros/s/AKfycbwWTWQ8aLmDJ8u8Fcnup53yWHD4SgRVb2Kj0G6pZ33n77DcPmyiyOTs3x2Z9A3e3PGvZA/exec?action=getUsers"; // เปลี่ยนเป็น URL ของ sheet sign-in

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    // msg.textContent = "กำลังตรวจสอบข้อมูล...";

    try {
        const res = await fetch(scriptURL);
        const users = await res.json();

        // แปลง password ให้เป็น hash (ใช้ SHA-256)
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

        // หา user ใน sheet
        const user = users.find(u => u.Email === email);

        if (!user) {
            msg.textContent = "ไม่พบบัญชีผู้ใช้งานนี้";
            msg.style.color = "red";
            return;
        }

        if (user.PasswordHash !== hashHex) {
            msg.textContent = "รหัสผ่านไม่ถูกต้อง";
            msg.style.color = "red";
            return;
        }

        // บันทึกข้อมูลผู้ใช้ใน localStorage
        localStorage.setItem("user", JSON.stringify(user));

        msg.style.color = "green";
        msg.textContent = "เข้าสู่ระบบสำเร็จ กำลังไปหน้าแดชบอร์ด...";
        setTimeout(() => {
            window.location.href = "dashboard/index.html";
        }, 1000);

    } catch (err) {
        console.error(err);
        msg.textContent = "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์";
        msg.style.color = "red";
    }
});