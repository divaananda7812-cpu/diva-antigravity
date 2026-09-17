/* =========================================================
DIVA ANANDA - PERSONAL STUDENT PORTFOLIO
File: assets/js/script.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. SIDEBAR MOBILE
       ===================================================== */

    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", function () {
            sidebar.classList.toggle("active");

            if (overlay) {
                overlay.classList.toggle("active");
            }
        });
    }

    if (overlay) {
        overlay.addEventListener("click", function () {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });
    }


    /* =====================================================
       2. KONFIRMASI HAPUS DATA
       ===================================================== */

    const deleteButtons = document.querySelectorAll(".btn-delete");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {

            const message =
                button.getAttribute("data-confirm") ||
                "Apakah kamu yakin ingin menghapus data ini?";

            const confirmed = confirm(message);

            if (!confirmed) {
                event.preventDefault();
            }
        });
    });


    /* =====================================================
       3. PREVIEW FOTO SEBELUM UPLOAD
       ===================================================== */

    const imageInputs = document.querySelectorAll(
        'input[type="file"][accept*="image"]'
    );

    imageInputs.forEach(function (input) {

        input.addEventListener("change", function () {

            const file = input.files[0];

            if (!file) {
                return;
            }

            // Validasi tipe file
            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp"
            ];

            if (!allowedTypes.includes(file.type)) {
                alert(
                    "Format gambar tidak valid.\n" +
                    "Gunakan JPG, JPEG, PNG, atau WEBP."
                );

                input.value = "";
                return;
            }

            // Maksimal 2 MB
            const maxSize = 2 * 1024 * 1024;

            if (file.size > maxSize) {
                alert("Ukuran foto maksimal 2 MB.");
                input.value = "";
                return;
            }

            // Cari elemen preview
            let preview = input.parentElement.querySelector(".image-preview");

            if (!preview) {
                preview = document.createElement("img");
                preview.classList.add("image-preview");

                preview.style.width = "150px";
                preview.style.height = "150px";
                preview.style.objectFit = "cover";
                preview.style.marginTop = "10px";
                preview.style.borderRadius = "10px";

                input.parentElement.appendChild(preview);
            }

            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
            };

            reader.readAsDataURL(file);
        });
    });


    /* =====================================================
       4. AUTO HILANGKAN ALERT
       ===================================================== */

    const alerts = document.querySelectorAll(".alert");

    alerts.forEach(function (alert) {

        // Jangan auto-close alert yang memang dibuat permanen
        if (alert.classList.contains("alert-permanent")) {
            return;
        }

        setTimeout(function () {

            alert.style.transition = "opacity 0.5s ease";
            alert.style.opacity = "0";

            setTimeout(function () {
                alert.remove();
            }, 500);

        }, 3000);
    });


    /* =====================================================
       5. VALIDASI FORM
       ===================================================== */

    const forms = document.querySelectorAll("form");

    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            const requiredInputs =
                form.querySelectorAll("[required]");

            let valid = true;

            requiredInputs.forEach(function (input) {

                if (input.value.trim() === "") {

                    valid = false;

                    input.classList.add("is-invalid");

                } else {

                    input.classList.remove("is-invalid");
                }
            });

            if (!valid) {

                event.preventDefault();

                alert(
                    "Mohon lengkapi semua kolom yang wajib diisi."
                );
            }
        });
    });


    /* =====================================================
       6. HAPUS ERROR VALIDASI SAAT USER MENGETIK
       ===================================================== */

    const requiredInputs =
        document.querySelectorAll("[required]");

    requiredInputs.forEach(function (input) {

        input.addEventListener("input", function () {

            if (input.value.trim() !== "") {
                input.classList.remove("is-invalid");
            }

        });
    });


    /* =====================================================
       7. PENCARIAN DATA TABEL
       ===================================================== */

    const searchInputs =
        document.querySelectorAll(".table-search");

    searchInputs.forEach(function (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const keyword =
                searchInput.value.toLowerCase();

            const targetId =
                searchInput.getAttribute("data-target");

            const table =
                document.getElementById(targetId);

            if (!table) {
                return;
            }

            const rows =
                table.querySelectorAll("tbody tr");

            rows.forEach(function (row) {

                const text =
                    row.textContent.toLowerCase();

                if (text.includes(keyword)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    });


    /* =====================================================
       8. FILTER DATA
       ===================================================== */

    const filterButtons =
        document.querySelectorAll("[data-filter]");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const filter =
                button.getAttribute("data-filter");

            const target =
                button.getAttribute("data-target");

            const items =
                document.querySelectorAll(
                    target + " [data-category]"
                );

            items.forEach(function (item) {

                const category =
                    item.getAttribute("data-category");

                if (
                    filter === "all" ||
                    category === filter
                ) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            });

            // Tombol aktif
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");
        });
    });


    /* =====================================================
       9. PREVIEW GALERI
       ===================================================== */

    const galleryImages =
        document.querySelectorAll(".gallery-image");

    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {

            const imageSrc =
                image.getAttribute("src");

            const modalImage =
                document.getElementById("modalImage");

            if (modalImage) {
                modalImage.src = imageSrc;
            }
        });
    });


    /* =====================================================
       10. KONFIRMASI LOGOUT
       ===================================================== */

    const logoutButtons =
        document.querySelectorAll(".btn-logout");

    logoutButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const confirmed = confirm(
                "Apakah kamu yakin ingin keluar dari dashboard?"
            );

            if (!confirmed) {
                event.preventDefault();
            }
        });
    });


    /* =====================================================
       11. PASSWORD TOGGLE
       ===================================================== */

    const passwordToggles =
        document.querySelectorAll(".toggle-password");

    passwordToggles.forEach(function (button) {

        button.addEventListener("click", function () {

            const targetId =
                button.getAttribute("data-target");

            const passwordInput =
                document.getElementById(targetId);

            if (!passwordInput) {
                return;
            }

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                button.innerHTML =
                    '<i class="bi bi-eye-slash"></i>';

            } else {

                passwordInput.type = "password";

                button.innerHTML =
                    '<i class="bi bi-eye"></i>';
            }
        });
    });


    /* =====================================================
       12. SCROLL SMOOTH
       ===================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (
                targetId === "#" ||
                targetId === ""
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =====================================================
       13. TAHUN OTOMATIS DI FOOTER
       ===================================================== */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent =
            new Date().getFullYear();
    });


    /* =====================================================
       14. CONSOLE INFO
       ===================================================== */

    console.log(
        "Diva Ananda - Personal Student Portfolio berhasil dimuat."
    );
    function setTheme(theme) {
        document.body.classList.remove("dark", "purple", "green");

        if (theme !== "light") {
            document.body.classList.add(theme);
        }

        localStorage.setItem("portfolioTheme", theme);
    }

    const savedTheme = localStorage.getItem("portfolioTheme");

    if (savedTheme) {
        setTheme(savedTheme);
    }
});