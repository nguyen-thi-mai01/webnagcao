let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  for (i = 0; i < slides.length; i++) { // Thêm vòng lặp này để loại bỏ class 'fade'
    slides[i].classList.remove('fade');
  }
  slides[slideIndex-1].style.display = "block";
  slides[slideIndex-1].classList.add('fade'); // Thêm lại class fade cho slide hiện tại
  setTimeout(showSlides, 5000); // Chuyển slide sau 5 giây
}