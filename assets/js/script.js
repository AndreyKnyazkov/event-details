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
    navigation: {
      nextEl: '.swiper-mobile-block .swiper-button-next',
      prevEl: '.swiper-mobile-block .swiper-button-prev',
    },
  })

  function popUpSlider({initialSlide, destroy} = {}) {

    let galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.slider-event-arrows .swiper-button-next',
        prevEl: '.slider-event-arrows .swiper-button-prev',
      },
	 		loop: true,
			loopedSlides: 4,
      initialSlide: initialSlide ? initialSlide : 0,
    });


    document.querySelectorAll('.gallery-thumbs-counter span')[0].textContent = galleryTop.realIndex + 1
    document.querySelectorAll('.gallery-thumbs-counter span')[1].textContent = document.querySelectorAll('.event-information__price__slider-slide').length + 1

    galleryTop.on('slideChange', function () {
      document.querySelectorAll('.gallery-thumbs-counter span')[0].textContent = galleryTop.realIndex + 1
      console.log(galleryTop)
    });
  
    let galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
      loop: true,
      loopedSlides: 4,
      initialSlide: initialSlide ? initialSlide : 0,
      on: {
        // slideChange: function () {
        //   document.querySelectorAll('.gallery-thumbs-counter span')[0].textContent = galleryTop.realIndex + 1
        // }
      }
    });
  
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;

    if (destroy === true) {
      setTimeout(() => {
        document.querySelector('.slider-event').classList.remove('fade-out')
        galleryTop.destroy()
        galleryThumbs.destroy()
        
        document.querySelector('.slider-event').classList.remove('slider-event-active')
        clearTimeout()
      }, 260);
    }
  }
  

  function popUp() {
    const eventSlider = document.querySelector('.slider-event')
    const popUpClose = document.querySelector('.slider-event-close')
    const sliderItemsToClick = document.querySelectorAll('.event-information__price__slider-slide')

    function closePopUp() {
      eventSlider.classList.remove('fade-in')
      eventSlider.classList.add('fade-out')
      popUpSlider({destroy: true})
    }

    document.addEventListener('keydown', e => e.keyCode === 27 ? closePopUp() : null)
    popUpClose.addEventListener('click', e => closePopUp())
    document.querySelector('.swiper-slider-container').addEventListener('click', e => e.target.className === 'swiper-slider-container' ? closePopUp() : null)
    document.querySelector('.slider-event-overlay').addEventListener('click', e => closePopUp())

    sliderItemsToClick.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        eventSlider.classList.add('slider-event-active')
        eventSlider.classList.add('fade-in')
        popUpSlider({initialSlide: index})
      })
    })
  }

  popUp()
  
});