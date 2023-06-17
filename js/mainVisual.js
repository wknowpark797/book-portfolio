const visualPanel = document.querySelector('#visualPanel');
const userId = '105834502729522452212';
const shelf = '1001';
const url = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes`;

fetchData(url);

async function fetchData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		console.log(data.items);

		createDOM(data.items);
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
        <div class="detail-wrap">
          <h1>${item.volumeInfo.title}</h1>

          <div class="rating-wrap">
            <div class="star-box">
              <span class="on"><i class="fa-solid fa-star"></i></span>
              <span class="on"><i class="fa-solid fa-star"></i></span>
              <span class="on"><i class="fa-solid fa-star"></i></span>
              <span><i class="fa-solid fa-star"></i></span>
              <span><i class="fa-solid fa-star"></i></span>
            </div>
            <p>3.0</p>
          </div>

          <p class="content">${item.volumeInfo.description}</p>

          <button type="button" class="btn-more">VIEW DETAIL</button>
        </div>

        <div class="ratio-wrap">
          <div class="double-wrap">

            <div class="img-box origin">
              <img src="${imgReplace}" alt="">
            </div>

            <div class="img-box shadow">
              <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="">
            </div>

          </div>
        </div>
      </div>
    `;

		visualPanel.innerHTML = tags;
	});
}
