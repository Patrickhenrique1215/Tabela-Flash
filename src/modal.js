
document.addEventListener("DOMContentLoaded", () => {
    const open = document.querySelector("#openModal");
    const close = document.querySelector("#closeModal");
    const overlay = document.querySelector("#overlay");

    open.addEventListener('click', () => {
        overlay.classList.add('active');
    });

    close.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});
