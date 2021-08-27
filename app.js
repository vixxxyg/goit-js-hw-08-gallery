const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const modalWindow = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector('.lightbox__button');
const modalOverlay = document.querySelector('.lightbox__overlay');


const listOfPictures = document.querySelector('.js-gallery');
const picturesGallery = galleryItems.map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}" 
            alt="${description}"
          />
        </a>
      </li>
      `;
    })
    .join('');

listOfPictures.insertAdjacentHTML('beforeend', picturesGallery);

listOfPictures.addEventListener('click', onClickOpenModalWindow);
function onClickOpenModalWindow(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return
  };

  evt.preventDefault();
  modalImage.src = evt.target.dataset.source
  modalImage.alt = evt.target.alt
  modalWindow.classList.add('is-open');

  window.addEventListener('keydown', onEscapePress);
  window.addEventListener('keydown', onArrowPress);
};

modalCloseBtn.addEventListener('click', onCloseModalWindow);
function onCloseModalWindow(evt) {
  modalWindow.classList.remove('is-open');

  modalImage.src = '';
  modalImage.alt = '';

  window.removeEventListener('keydown', onEscapePress);
  window.removeEventListener('keydown', onArrowPress);
};

modalOverlay.addEventListener('click', onOverlayClick);
function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModalWindow();
  }
};

function onEscapePress(evt) {
  if (evt.key === 'Escape') {
    onCloseModalWindow();
  }
};

function onArrowPress(evt) {
  let newIndex;
  const items = galleryItems.map(({ original }) => original);
  const currentImgIndex = items.indexOf(modalImage.src);
  if (evt.key === 'ArrowLeft') {
    newIndex = currentImgIndex - 1;
    if (newIndex == -1) {
      newIndex = items.length - 1;
    }
  } else if (evt.key === 'ArrowRight') {
    newIndex = currentImgIndex + 1;
    if (newIndex === (items.length)) {
      newIndex = 0;
    }
  }

  modalImage.src = items[newIndex];
};