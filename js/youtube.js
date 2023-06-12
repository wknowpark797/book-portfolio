const key = 'AIzaSyDwb_57BfoNHLxlZ-Mwn2O3VNVt2tFNNMw';
const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;

const musicListWrap = document.querySelector('#musicListWrap');
const bestListWarp = document.querySelector('#bestListWarp');
const bookListWrap = document.querySelector('#bookListWrap');

musicListFetch();
bestListFetch();
bookListFecth();

// Music Playlist Fetching 함수
async function musicListFetch() {
	const playlistId = 'PLEJLcTMBRARd4AKwM7CM_0gf2mKviNR3J';
	const maxResults = 6;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const res = await fetch(listURL);
	const data = await res.json();

	createBasicTags(musicListWrap, data.items);
}

// Best Playlist Fetching 함수
async function bestListFetch() {
	const playlistId = 'PLEJLcTMBRARf9Oh5Ba53RTD69_uhRbXqS';
	const maxResults = 1;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const res = await fetch(listURL);
	const data = await res.json();

	createBestTags(bestListWarp, data.items);
}

// Book Playlist Fetching 함수
async function bookListFecth() {
	const playlistId = 'PLEJLcTMBRAReQQjFb4VKHfgOsgE1Yj8d-';
	const maxResults = 3;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const res = await fetch(listURL);
	const data = await res.json();

	createBasicTags(bookListWrap, data.items);
}

// 기본 목록 생성 함수
function createBasicTags(wrap, items) {
	let tags = '';

	items.forEach((item) => {
		tags += `
      <article>
        <h3>${item.snippet.title}</h3>
        <p class="date">${item.snippet.publishedAt}</p>

        <div class="video thumb" 
						data-videoid="${item.snippet.resourceId.videoId}">
          <img src="${item.snippet.thumbnails.standard.url}" alt="">
        </div>

        <button type="button" class="btn-more thumb">
          <i class="fa-regular fa-circle-play"></i>
          <span>VIEW VIDEO</span>
        </button>
      </article>
    `;
	});

	wrap.innerHTML = tags;
}

// Best 목록 생성 함수
function createBestTags(wrap, items) {
	let tags = '';

	items.forEach((item) => {
		tags += `
      <div class="title-wrap">
        <p>Best Pick</p>

        <div class="inner-title">
          <h2>${item.snippet.title}</h2>
          <p class="date">${item.snippet.publishedAt}</p>
        </div>
      </div>

      <div class="video thumb" 
					data-videoid="${item.snippet.resourceId.videoId}">
        <img src="${item.snippet.thumbnails.maxres.url}" alt="">
      </div>
    `;
	});

	wrap.innerHTML = tags;
}

// 이벤트 위임
document.body.addEventListener('click', (e) => {
	if (e.target.closest('.thumb')) createPop(e.target.closest('.thumb').dataset.videoid);
	if (e.target.className === 'pop-close') removePop();
});

// 팝업 생성 함수
function createPop(id) {
	const tags = `
		<div class="inner-pop">
			<iframe src="https://www.youtube.com/embed/${id}"></iframe>
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
	}, 1000);

	document.body.style.overflow = 'auto';
}
