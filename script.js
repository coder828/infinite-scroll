const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let numberOfImagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const apiKey = "sjKvHrPv6R_fG4EwDwfs7Bzn_ZK_kMWof6Cfkjp-ZUg";
const secretKey = "6AETndofOXYuPz2mwo6Hu1oUOjGkIanfECnDn9M3lDY";
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function imageLoaded() {
  numberOfImagesLoaded++;

  if (numberOfImagesLoaded === totalImages) {
    // page is ready and everything
    // has finished loading
    ready = true;
    loader.hidden = true;
  }
}

function displayPhotos() {
  numberOfImagesLoaded = 0;

  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // anchor tag
    const anchor = document.createElement("a");
    setAttributes(anchor, {
      href: photo.links.html,
      target: "_blank",
    });

    // image
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // add image inside anchor tag
    // then put both inside image-container element
    anchor.appendChild(img);
    imageContainer.appendChild(anchor);
  });
}

async function getPhotosFromUnsplashApi() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log("getPhotosFromUnsplashApi", error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotosFromUnsplashApi();
  }
});

getPhotosFromUnsplashApi();
