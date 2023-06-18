const bookListPanel = document.querySelector('#bookListPanel');
const btnPrevBook = document.querySelector('#btnPrevBook');
const btnNextBook = document.querySelector('#btnNextBook');

const userId = '105834502729522452212';
const shelf = '1001';
const url = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=30`;

fetchData(url);

btnPrevBook.addEventListener('click', () => {
	bookListPanel.prepend(bookListPanel.lastElementChild);
});

btnNextBook.addEventListener('click', () => {
	bookListPanel.append(bookListPanel.firstElementChild);
});

async function fetchData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();

		createDOM(data.items);
		console.log(data.items);
	} catch (err) {
		console.log('err: ', err);
	}
}

function createDOM(arr) {
	let tags = '';

	arr.forEach((item) => {
		const imgReplace = item.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=10');

		tags += `
      <div>
        <div class="ratio-wrap">
          <div class="img-box">
            <img src="${imgReplace}" alt="">
          </div>
        </div>

        <div class="info-box">
          <h2>${item.volumeInfo.title}</h2>
          <p>${item.volumeInfo.authors}</p>
        </div>
      </div>
    `;

		bookListPanel.innerHTML = tags;
	});
}
