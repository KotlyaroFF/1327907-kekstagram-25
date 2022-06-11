import {data} from './usersMiniatures.js';
import {isEscapeKey} from './utils.js'

const getBigPictutes = () => {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = document.querySelector('.big-picture__img');
  const likesCount = document.querySelector('.likes-count');
  const picture = document.querySelectorAll('.picture');
  const commentsCount = document.querySelector('.comments-count')
  const socialComments = document.querySelector('.social__comments')
  const socialComment = socialComments.querySelector('.social__comment');
  const socialCommentsFragment = document.createDocumentFragment();
  const socialCommentCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  const bigPictureCancel = document.querySelector('.big-picture__cancel');

  const onModalEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePictureModal();
    };
  };

  const openPictureModal = () => {
    bigPictureCancel.addEventListener('click', closePictureModal);
    document.addEventListener('keydown', onModalEscKeydown);
  };

  const closePictureModal = () => {
    document.querySelector('body').classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onModalEscKeydown);
    bigPictureCancel.removeEventListener('click', closePictureModal);
  };

  picture.forEach((element) => {

    element.addEventListener('click', () => {
      bigPictureImg.querySelector('img').src = element.querySelector('.picture__img').src;
      likesCount.textContent = element.querySelector('.picture__likes').textContent;
      commentsCount.textContent = element.querySelector('.picture__comments').textContent;

        if (picture[element.id].id = data[element.id].id) {
          socialComments.textContent = '';

          data[element.id - 1].comments.forEach ((ides) => {
            const usersPicture = socialComment.cloneNode(true);

            usersPicture.querySelector('.social__picture').src = ides.avatar;
            usersPicture.querySelector('.social__picture').alt = ides.name;
            usersPicture.querySelector('.social__text').textContent = ides.message;

            socialCommentsFragment.appendChild(usersPicture);
            socialComments.appendChild(socialCommentsFragment);
          });
        }

      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      bigPicture.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
      openPictureModal();
    });
  });
};

export {getBigPictutes};
