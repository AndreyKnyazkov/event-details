document.addEventListener("DOMContentLoaded", function () {

  function changeHeightForWhen() {
    document.querySelectorAll('.event-information__price__slider__when__timelist-item').forEach((item, i) => {

        if (item.clientHeight > 22) {
          document.querySelectorAll('.event-information__price__slider__when__dates__datelist-item')[i].style.height = item.clientHeight + 'px'
          document.querySelectorAll('.event-information__price__slider__when__weekdaylist-item-mobile')[i].style.height = item.clientHeight + 'px'
        }

    })
  }

  changeHeightForWhen() 

  let swiperMobile = new Swiper('.swiper-mobile-block', {
    slidesPerView: 1,
    spaceBetween: 10,
  })

  function popUpSlider({initialSlide = 0, destroy} = {}) {

    let galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
      initialSlide: initialSlide,
      loopedSlides: 4
    });
  
    let galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      loop: true,
      loopedSlides: 4,
      initialSlide: initialSlide,
    });
  
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;

    if (destroy === true) {
      setTimeout(() => {
        galleryTop.destroy()
        galleryThumbs.destroy()
        destroy = false  
        console.log('fdfd');
        clearTimeout()      
      }, 400);
      return
    }
  }
  popUpSlider()
  

  function popUp() {
    const popUpSliderBlock = document.querySelector('.slider-event')
    const popUpClose = document.querySelector('.slider-event-close')
    const sliderItemsToClick = document.querySelectorAll('.event-information__price__slider-slide')

    function closePopUp() {
      document.querySelector('.slider-event').classList.remove('swiper-slider-show')
      popUpSlider({destroy: true})
    }

    document.addEventListener('keydown', e => e.keyCode === 27 ? closePopUp() : null) 
    popUpClose.addEventListener('click', e => closePopUp())
    document.querySelector('.swiper-slider-container').addEventListener('click', e => e.target.className === 'swiper-slider-container' ? closePopUp() : null)
    document.querySelector('.slider-event-overlay').addEventListener('click', e => closePopUp())
    


    sliderItemsToClick.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        document.querySelector('.slider-event').classList.add('swiper-slider-show')
        popUpSlider({initialSlide: index})
      })
    })
  }

  popUp()
  
});