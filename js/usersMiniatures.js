import {getPhotoCards} from './data.js';
let data = [];

const greatePhotoCard = () => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const picture = pictureTemplate.querySelector('.picture');

  const DataPhotoCard = getPhotoCards();

  const photoCardsFragment = document.createDocumentFragment();

  DataPhotoCard.forEach(({url, likes, comments, id}) => {

    const usersPicture = picture.cloneNode(true);
    usersPicture.querySelector('.picture__img').src = url;
    usersPicture.querySelector('.picture__likes').textContent = likes;
    usersPicture.querySelector('.picture__comments').textContent = comments.length;
    usersPicture.id = id
    photoCardsFragment.appendChild(usersPicture);

  });

  picturesContainer.appendChild(photoCardsFragment);

  data.push(...DataPhotoCard);
};

export {greatePhotoCard, data};
