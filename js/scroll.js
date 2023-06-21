const sections = document.querySelectorAll('.my-scroll');
const btns = document.querySelectorAll('.scroll-navi li');

// section의 높이값이 일괄적 100vh가 아닐 경우 고정 px로 지정
const baseline = -200;

window.addEventListener('scroll', () => {
	activation();
});

function activation() {
	const scroll = window.scrollY;

	if (scroll <= 500) {
		for (const el of sections) el.classList.remove('on');
	}

	sections.forEach((_, idx) => {
		if (scroll >= sections[idx].offsetTop + baseline) {
			for (const btn of btns) btn.classList.remove('on');
			btns[idx].classList.add('on');

			sections[idx].classList.add('on');
		}
	});
}

btns.forEach((btn, idx) => {
	btn.addEventListener('click', () => {
		window.scrollTo({
			top: sections[idx].offsetTop,
			behavior: 'smooth',
		});
	});
});
