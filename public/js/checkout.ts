onStartUp.addNewTask(() => {
    document.querySelector('#next1')!.addEventListener('click', () => {
        document.querySelector('.first-page')!.classList.toggle('none');
        document.querySelector('.sec-page')!.classList.toggle('none');
    });
    document.querySelector('#next2')!.addEventListener('click', async() => {
        const result = await fetch("/api/checkout", { method: "post" });
        if (result) {
            document.querySelector('.third-page')!.classList.toggle('none');
            document.querySelector('.sec-page')!.classList.toggle('none');
        }
    });
    document.querySelector('#next3')!.addEventListener('click', () => {
        window.location.href = "/shop";
    });
});