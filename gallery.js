import images from "./app.js";

const gallary = document.querySelector(".gallery");
const bigImg = document.querySelector(".lightbox__image");
const lightbox = document.querySelector(".lightbox");
const closeBtn = document.querySelector(`button[data-action="close-lightbox"]`);
const closeOverlay = document.querySelector(".lightbox__overlay");
const markup = images.map((image, index) => {
    return `<li class="gallery__item">
        <a
        class="gallery__link"
        href="${image.original}"
        >
        <img
            class="gallery__image"
            src="${image.preview}"
            data-source="${image.original}"
            data-index="${index}"
            alt="${image.description}"
        />
        </a>
    </li>`
}).join("");
gallary.insertAdjacentHTML("beforeend", markup);
const imagesArr = document.querySelectorAll(".gallery__image");
gallary.addEventListener("click", event => {
    event.preventDefault();
    const url = event.target.dataset.source;
    const alt = event.target.getAttribute("alt");
    if(event.target.nodeName !== "IMG"){
        return;
    }
    lightbox.classList.add("is-open");
    bigImg.setAttribute("src", url);
    bigImg.setAttribute("alt", alt);
    window.addEventListener("keydown", keyPress);
});
closeBtn.addEventListener("click", closeModal);
closeOverlay.addEventListener("click", closeModal);
function closeModal () {
    lightbox.classList.remove("is-open");
    bigImg.setAttribute("src", "");
    bigImg.setAttribute("alt", "");
    window.removeEventListener("keydown", keyPress);
};
function keyPress(event) {
    if(event.code === "Escape"){
        closeModal();
    };
    if (event.code === "ArrowLeft") {
        clickLeft(event);
    };
    if (event.code === "ArrowRight") {
        clickRight(event);
    };
};

function clickLeft(event) {
    const currentIndex = event.target.firstElementChild.dataset.index;
    const newIndex = currentIndex - 1;

   const image = [...imagesArr].find((el) => el.dataset.index == newIndex)
    console.log(image);
}
