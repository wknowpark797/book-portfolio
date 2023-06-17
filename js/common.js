// Top Button
const btnTop = document.querySelector('#btnTop');
let eventBlocker = null;
let speed = 200;

window.addEventListener('scroll', () => {
	if (eventBlocker) return;

	eventBlocker = setTimeout(() => {
		activation();
		eventBlocker = null;
	}, speed);
});

btnTop.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

function activation() {
	const scroll = window.scrollY;
	const limit = window.innerHeight / 2;

	if (scroll > limit) {
		btnTop.classList.add('on');
	} else {
		btnTop.classList.remove('on');
	}
}
