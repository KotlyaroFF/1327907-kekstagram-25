import {isEscapeKey, isEnterKey} from './utils.js';


const loadingImg = () => {
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const imgUploadCancel = document.querySelector('.img-upload__cancel');
  const uploadFile = document.querySelector('#upload-file');
  const body = document.querySelector('body');
  const form = document.querySelector('.img-upload__form');
  const successModal = document.querySelector('#success').content;
  const allowedАileЕypes = /(.jpg|.jpeg|.png)$/i;
  const errorModal = document.querySelector('#error').content;
  const imgUploadLabel = document.querySelector('.img-upload__label');


  const onModalEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePictureModal();
    };
  };

  const onModalEnterKeydown = (evt) => {
    if (isEnterKey(evt)) {
      evt.preventDefault();
      closePictureModal();
    };
  };

  const openPictureModal = () => {
    imgUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    imgUploadCancel.addEventListener('keydown', onModalEnterKeydown);
    imgUploadCancel.addEventListener('click', closePictureModal);
    document.addEventListener('keydown', onModalEscKeydown);
  };

  const closePictureModal = () => {
    imgUploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    imgUploadCancel.removeEventListener('keydown', onModalEnterKeydown);
    document.removeEventListener('keydown', onModalEscKeydown);
    imgUploadCancel.removeEventListener('click', closePictureModal);
  };

  const successModalOpen =() => {
    document.querySelector('.successOpend').remove();

    document.removeEventListener('keydown', successModalOpenEscKeydown);
  };

  const successModalOpenEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successModalOpen();
    };
  };

  const errorModalOpen =() => {
    document.querySelector('.errorOpend').remove();
    document.removeEventListener('keydown', errorModalOpenEscKeydown);
  };

  const errorModalOpenEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorModalOpen();
    };
  };



  const successModalOpend = () => {
    const successModalFragment = successModal.cloneNode(true);
    const successButton = successModalFragment.querySelector('.success__button');
    const successOpend = successModalFragment.querySelector('.success');
    successOpend.classList.add('successOpend');
    successButton.addEventListener('click', () => {successModalOpen()});
    document.addEventListener('keydown', successModalOpenEscKeydown);
    body.appendChild(successModalFragment);
    closePictureModal();
  };

  uploadFile.addEventListener('change', () => {
    if (allowedАileЕypes.test(uploadFile.value)) {
      openPictureModal()
    } else {
      const errorModalFragment = errorModal.cloneNode(true);
      const errorButton = errorModalFragment.querySelector('.error__button');
      const errorOpend = errorModalFragment.querySelector('.error');
      errorOpend.classList.add('errorOpend');
      errorButton.addEventListener('click', () => {errorModalOpen()});
      document.addEventListener('keydown', errorModalOpenEscKeydown);
      body.appendChild(errorModalFragment);
      closePictureModal();
    };
  });

  const textHashtag = document.querySelector('.text__hashtags');
  const pristine = new Pristine(form, {
    classTo: 'img-upload__text',
    errorClass: 'img-upload__text--invalid',
    successClass: 'img-upload__text--valid',
    errorTextParent: 'img-upload__text',
    errorTextTag: 'p',
    errorTextClass: 'img-upload__text--error'
  });

  function validateHashtag (value) {
    const hashtagUnvalid = [];

    if (value.length !== 0) {
      const arrHashtags = value.split(' ');
      const hashtagRules = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;


      for (let i= 0; i < arrHashtags.length; i ++) {

        if (!hashtagRules.test(arrHashtags[i])) {
          hashtagUnvalid.push(arrHashtags[i]);
        };
      };

      if (hashtagUnvalid.length === 0 && arrHashtags.length <= 5) {
        return true;
      } else {
        return false;
      };

    } else {
      return true;
    };
  };

  pristine.addValidator(textHashtag, validateHashtag, 'ХешТег должен начинаться символом"#", Длина не более 20 символов, разделяются ХешТеги пробелами. Не более пяти ХешТегов. Не должны включать в себя спец.символы.');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    console.log(isValid);

    if (isValid) {
      successModalOpend();
    } else {
      console.log('Форма невалидна');
    }
});
};

export {loadingImg};
