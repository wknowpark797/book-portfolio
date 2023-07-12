const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;

const musicListWrap = document.querySelector('#musicListWrap');
const bestListWarp = document.querySelector('#bestListWarp');
const bookListWrap = document.querySelector('#bookListWrap');

musicListFetch();
readListFetch();

// music 재생목록 fetching
async function musicListFetch() {
	const playlistId = 'PLuYjs7JL1VFD0-B09gEumiJn43AM-qpNR';
	const maxResults = 3;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const res = await fetch(listURL);
	const data = await res.json();

	createBasicTags(musicListWrap, data.items);
}

// read 재생목록 fetching
async function readListFetch() {
	const playlistId = 'PLuYjs7JL1VFB-ciaLcIPXzqp2xmSiL_Wd';
	const maxResults = 4;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const res = await fetch(listURL);
	const data = await res.json();

	createBestTags(bestListWarp, data.items.slice(0, 1));
	createBasicTags(bookListWrap, data.items.slice(1, 4));
}

// 기본 목록 생성 함수
function createBasicTags(wrap, items) {
	let tags = '';

	items.forEach((item) => {
		tags += `
      <article>
        <h3>${item.snippet.title}</h3>
        <p class="date">${item.snippet.publishedAt.split('T')[0].split('-').join('.')}</p>

        <div class="video thumb" 
						data-videoid="${item.snippet.resourceId.videoId}">
          <img src="${item.snippet.thumbnails.standard.url}" alt="">
        </div>

        <button type="button" 
							class="btn-more thumb"
							data-videoid="${item.snippet.resourceId.videoId}">
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
          <p class="date">${item.snippet.publishedAt.split('T')[0].split('-').join('.')}</p>
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
	if (e.target.closest('.pop-close')) removePop();
});

// 팝업 생성 함수
function createPop(id) {
	const tags = `
		<div class="inner-pop">
      <div class="inner-content">
				<div class="media-box">
					<iframe src="https://www.youtube.com/embed/${id}"></iframe>
				</div>
			</div>

      <button type="button" class="pop-close">
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
    </div>
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
	}, 400);

	document.body.style.overflow = 'auto';
}
