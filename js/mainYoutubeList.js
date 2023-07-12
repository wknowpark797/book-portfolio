const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&part=snippet`;

const mainYoutubeWrap = document.querySelector('#mainYoutubeWrap');

bookListFecth();

async function bookListFecth() {
	const playlistId = 'PLuYjs7JL1VFB-ciaLcIPXzqp2xmSiL_Wd';
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
