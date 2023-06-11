const key = 'AIzaSyDwb_57BfoNHLxlZ-Mwn2O3VNVt2tFNNMw';
const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;

const musicListWrap = document.querySelector('#musicListWrap');
const bestListWarp = document.querySelector('#bestListWarp');
const bookListWrap = document.querySelector('#bookListWrap');

musicListFetch();
bestListFetch();
bookListFecth();

// Music Playlist 생성 함수
async function musicListFetch() {
	const playlistId = 'PLEJLcTMBRARd4AKwM7CM_0gf2mKviNR3J';
	const maxResults = 6;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const res = await fetch(listURL);
	const data = await res.json();

	createBasicTags(musicListWrap, data.items);
}

// Best Playlist 생성 함수
async function bestListFetch() {
	const playlistId = 'PLEJLcTMBRARf9Oh5Ba53RTD69_uhRbXqS';
	const maxResults = 1;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const res = await fetch(listURL);
	const data = await res.json();

	createBestTags(bestListWarp, data.items);
}

// Book Playlist 생성 함수
async function bookListFecth() {
	const playlistId = 'PLEJLcTMBRAReQQjFb4VKHfgOsgE1Yj8d-';
	const maxResults = 3;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const res = await fetch(listURL);
	const data = await res.json();

	createBasicTags(bookListWrap, data.items);
}

// 기본 리스트 생성 함수
function createBasicTags(wrap, items) {
	let tags = '';

	items.forEach((item) => {
		tags += `
      <article>
        <h3>${item.snippet.title}</h3>
        <p class="date">${item.snippet.publishedAt}</p>

        <div class="video">
          <img src="${item.snippet.thumbnails.standard.url}" 
              alt="${item.snippet.resourceId.videoId}">
        </div>

        <button type="button" class="btn-more">
          <i class="fa-regular fa-circle-play"></i>
          <span>VIEW VIDEO</span>
        </button>
      </article>
    `;
	});

	wrap.innerHTML = tags;
}

// Best 리스트 생성 함수
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

      <div class="video">
        <img src="${item.snippet.thumbnails.maxres.url}" 
            alt="${item.snippet.resourceId.videoId}">
      </div>
    `;
	});

	wrap.innerHTML = tags;
}
