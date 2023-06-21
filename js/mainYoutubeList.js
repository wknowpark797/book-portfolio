const key = 'AIzaSyDwb_57BfoNHLxlZ-Mwn2O3VNVt2tFNNMw';
const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;

const mainYoutubeWrap = document.querySelector('#mainYoutubeWrap');

bookListFecth();

async function bookListFecth() {
	const playlistId = 'PLEJLcTMBRAReQQjFb4VKHfgOsgE1Yj8d-';
	const maxResults = 2;
	const listURL = `${baseURL}&playlistId=${playlistId}&maxResults=${maxResults}`;

	const res = await fetch(listURL);
	const data = await res.json();

	createDOM(data.items);
}

function createDOM(items) {
	let tags = '';

	items.forEach((item) => {
		tags += `
      <article>
        <img src="${item.snippet.thumbnails.standard.url}" alt="">
      </article>
    `;
	});

	mainYoutubeWrap.innerHTML = tags;
}
