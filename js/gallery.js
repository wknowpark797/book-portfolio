const wrap = document.querySelector('#galleryWrap');
const loading = document.querySelector('.loading-wrap');

// Search
const inputSearch = document.querySelector('#search');
const btnSearch = document.querySelector('.btn-search');
const btnInterest = document.querySelector('.option-interest');
const btnMine = document.querySelector('.option-mine');

const api_key = '7f259a4112d06fbef0736c84af20f014';
const myId = '198471371@N05';
const length = 30;

fetchData(setURL('interest'));
btnSearch.addEventListener('click', getSearch);
inputSearch.addEventListener('keypress', (e) => e.code === 'Enter' && getSearch());
btnInterest.addEventListener('click', () => fetchData(setURL('interest')));
btnMine.addEventListener('click', () => fetchData(setURL('user', myId)));

async function fetchData(url) {
	wrap.classList.remove('on');
	loading.classList.remove('off');

	const res = await fetch(url);
	const data = await res.json();
	console.log(data.photos.photo);

	if (data.photos.photo.length === 0) {
		wrap.classList.add('on');
		loading.classList.add('off');
		return alert('해당 검색어의 결과가 없습니다.');
	}

	createList(data.photos.photo);
}

function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		tags += `
      <li class="item">
        <div>
          <div class="img-box">
            <img class="picture" 
                src="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg" 
                alt="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg">
          </div>

          <div class="info-wrap">
            <p>${item.owner}</p>
            <h3>${item.title}</h3>
          </div>
        </div>
      </li>
    `;
	});

	wrap.innerHTML = tags;

	setImgLoading();
}

function setImgLoading() {
	const imgArr = wrap.querySelectorAll('img');
	let count = 0;

	for (const img of imgArr) {
		img.onload = () => {
			count++;
			count === imgArr.length && isoLayout();
		};
	}
}

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.3s',
	});

	wrap.classList.add('on');
	loading.classList.add('off');
}

// Flickr 메서드별 URL 생성
function setURL(type, opt) {
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${length}&method=`;

	const methodInterest = 'flickr.interestingness.getList';
	const methodUser = 'flickr.people.getPhotos';
	const methodSearch = 'flickr.photos.search';

	if (type === 'interest') return `${baseURL}${methodInterest}`;
	if (type === 'user') return `${baseURL}${methodUser}&user_id=${opt}`;
	if (type === 'search') return `${baseURL}${methodSearch}&tags=${opt}`;
}

// 이벤트 위임
document.body.addEventListener('click', (e) => {
	if (e.target.className === 'picture') createPop(e.target.getAttribute('alt'));
	if (e.target.className === 'pop-close') removePop();
});

// 팝업 생성 함수
function createPop(img) {
	const tags = `
		<div class="inner-pop">
			<img src="${img}" >
		</div>
		<button type="button" class="pop-close">close</button>
	`;

	const pop = document.createElement('aside');
	pop.className = 'pop-wrap';
	pop.innerHTML = tags;
	document.body.append(pop);

	setTimeout(() => {
		document.querySelector('.pop-wrap').classList.add('on');
	}, 0);

	document.body.style.overflow = 'hidden';
}

// 팝업 제거 함수
function removePop() {
	document.querySelector('.pop-wrap').classList.remove('on');

	setTimeout(() => {
		document.querySelector('.pop-wrap').remove();
	}, 200);

	document.body.style.overflow = 'auto';
}

// 검색 이벤트
function getSearch() {
	const inputVal = inputSearch.value.trim();
	inputSearch.value = '';

	if (inputVal === '') return alert('검색어를 입력해주세요.');

	fetchData(setURL('search', inputVal));
}
