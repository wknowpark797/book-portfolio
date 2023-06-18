const sections = document.querySelectorAll('.my-scroll');
const btns = document.querySelectorAll('.scroll-navi li');

// section의 높이값이 일괄적 100vh가 아닐 경우 고정 px로 지정
const baseline = -100;

window.addEventListener('scroll', () => {
	sections.forEach((_, idx) => {
		activation(idx);
	});
});

function activation(idx) {
	const scroll = window.scrollY;

	if (scroll >= sections[idx].offsetTop + baseline) {
		for (const btn of btns) btn.classList.remove('on');
		btns[idx].classList.add('on');

		if (!sections[idx].classList.contains('on')) {
			sections[idx].classList.add('on');
		}
	}
}

btns.forEach((btn, idx) => {
	btn.addEventListener('click', () => {
		window.scrollTo({
			top: sections[idx].offsetTop,
			behavior: 'smooth',
		});
	});
});
