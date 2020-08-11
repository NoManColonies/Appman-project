onStartUp.addNewTask(() => {
    const navBar = new IntersectionObserver((entries, oberver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.navbar')!.classList.add('white');
            } else {
                document.querySelector('.navbar')!.classList.remove('white');
            }
        });
    });

    navBar.observe(document.querySelector('.nav__detector')!);
});