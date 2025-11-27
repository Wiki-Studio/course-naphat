document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const part1 = document.querySelector(".part1");
    const part2 = document.querySelector(".part2");
    const msg = document.getElementById("message");

    // toggle eye icon
    const togglePassword = document.querySelector('#togglePassword');
    const toggleConfirm = document.querySelector('#toggleConfirm');
    const password = document.querySelector('#password');
    const confirm = document.querySelector('#confirm_password');

    togglePassword.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    toggleConfirm.addEventListener('click', () => {
        const type = confirm.getAttribute('type') === 'password' ? 'text' : 'password';
        confirm.setAttribute('type', type);
        toggleConfirm.classList.toggle('fa-eye');
        toggleConfirm.classList.toggle('fa-eye-slash');
    });

    // handle submit
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        // msg.style.color = "black";
        // msg.textContent = "กำลังส่งข้อมูล...";

        const pw = password.value.trim();
        const cpw = confirm.value.trim();
        const policy = document.getElementById("policy").checked;

        if (pw !== cpw) {
            msg.style.color = "red";
            msg.textContent = "รหัสผ่านไม่ตรงกัน";
            return;
        }
        if (!policy) {
            msg.style.color = "red";
            msg.textContent = "กรุณายอมรับเงื่อนไขก่อนสมัคร";
            return;
        }

        // เตรียมข้อมูล
        const data = new FormData(form);

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbxo8vlBucT_Fz2RYMpVJOeBSRp9_RVPP9b8qV04trfIgg9nTwNkNmiIACffZXlx3Nku8Q/exec", {
                method: "POST",
                body: data
            });

            const resultText = await response.text();
            console.log("Response:", resultText);

            msg.style.color = "green";
            msg.textContent = "สมัครสำเร็จ!";

            // ✅ เปลี่ยนหน้าเป็น part2
            part1.classList.remove("active");
            part2.classList.add("active");

        } catch (error) {
            console.error("Error:", error);
            msg.style.color = "red";
            msg.textContent = "เกิดข้อผิดพลาดในการส่งข้อมูล";
        }
    });
});