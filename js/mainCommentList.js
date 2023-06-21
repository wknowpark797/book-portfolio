const commentListPanel = document.querySelector('#commentListPanel');
const btnPrevComment = document.querySelector('#btnPrevComment');
const btnNextComment = document.querySelector('#btnNextComment');

btnPrevComment.addEventListener('click', () => {
	commentListPanel.prepend(commentListPanel.lastElementChild);
});

btnNextComment.addEventListener('click', () => {
	commentListPanel.append(commentListPanel.firstElementChild);
});

fetchData('DB/comments.json');

async function fetchData(url) {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data.comments);
	createDOM(data.comments);
}

function createDOM(items) {
	let tags = '';

	items.forEach((item) => {
		tags += `
      <div>
        <div class="profile-box">
          <img src="img/${item.profileImg}" alt="">
        </div>
        <div class="info-box">
          <p>${item.content}</p>
          <p class="user">${item.name}</p>
          <p>${item.date}</p>
        </div>
      </div>
    `;
	});

	commentListPanel.innerHTML = tags;
}
