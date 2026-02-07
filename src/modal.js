
document.addEventListener("DOMContentLoaded", () => {
    const open = document.querySelector("#openModal");
    const close = document.querySelector("#closeModal");
    const overlay = document.querySelector("#overlay");

    open.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
