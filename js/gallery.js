const wrap = document.querySelector('#galleryWrap');
const loading = document.querySelector('.loading-wrap');

const api_key = '7f259a4112d06fbef0736c84af20f014';
const myId = '198471371@N05';
const length = 30;

fetchData(setURL('interest'));

async function fetchData(url) {
	wrap.classList.remove('on');
	loading.classList.remove('off');

	const res = await fetch(url);
	const data = await res.json();
	console.log(data.photos.photo);

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

function setURL(type, opt) {
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${length}&method=`;

	const methodInterest = 'flickr.interestingness.getList';
	const methodUser = 'flickr.people.getPhotos';
	const methodSearch = 'flickr.photos.search';

	if (type === 'interest') return `${baseURL}${methodInterest}`;
	if (type === 'user') return `${baseURL}${methodUser}&user_id=${opt}`;
	if (type === 'search') return `${baseURL}${methodSearch}&tags=${opt}`;
}

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.3s',
	});

	wrap.classList.add('on');
	loading.classList.add('off');
}
