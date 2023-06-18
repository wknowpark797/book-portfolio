const mapContainer = document.querySelector('#map');
const btns = document.querySelectorAll('.list-branch li');

const markerInfo = [
	{
		title: '국회도서관',
		position: new kakao.maps.LatLng(37.531117, 126.917035),
		imgSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
		imgSize: new kakao.maps.Size(64, 69),
		imgOption: { offset: new kakao.maps.Point(27, 69) },
		button: btns[0],
	},
	{
		title: '남산도서관',
		position: new kakao.maps.LatLng(37.552923, 126.981457),
		imgSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
		imgSize: new kakao.maps.Size(64, 69),
		imgOption: { offset: new kakao.maps.Point(27, 69) },
		button: btns[1],
	},
	{
		title: '별마당 도서관',
		position: new kakao.maps.LatLng(37.50999, 127.059986),
		imgSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
		imgSize: new kakao.maps.Size(64, 69),
		imgOption: { offset: new kakao.maps.Point(27, 69) },
		button: btns[2],
	},
	{
		title: '국립중앙도서관',
		position: new kakao.maps.LatLng(37.497669, 127.002837),
		imgSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
		imgSize: new kakao.maps.Size(64, 69),
		imgOption: { offset: new kakao.maps.Point(27, 69) },
		button: btns[3],
	},
];

// 지도 생성
const mapOption = { center: markerInfo[1].position, level: 3 };
const map = new kakao.maps.Map(mapContainer, mapOption);

markerInfo.forEach((item) => {
	const markerImage = new kakao.maps.MarkerImage(item.imgSrc, item.imgSize, item.imgOption);
	const marker = new kakao.maps.Marker({
		position: item.position,
		image: markerImage,
	});
	marker.setMap(map);

	item.button.addEventListener('click', () => map.panTo(item.position));
});
