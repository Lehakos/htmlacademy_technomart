// ~~~~~~~~~~~~~~~~~~ SLIDER ~~~~~~~~~~~~~~~~~~~~

$('.slider-nav').on('click', function(e) {

  e.preventDefault();

  var 
    slider = $(this).closest('.slider'),
    container = slider.find('.slider-container'),
    items = slider.find('.slider-item'),
    activeSlide = items.filter('.active'),
    nextSlide = activeSlide.next(),
    prevSlide = activeSlide.prev(),
    firstSlide = items.first(),
    lastSlide = items.last(),
    sliderOffset = slider.offset().left,
    reqPos = 0,
    nav = slider.find('.slider-dot'),
    activeNav = nav.filter('.active'),
    nextNav = activeNav.next(),
    prevNav = activeNav.prev(),
    firstNav = nav.first(),
    lastNav = nav.last();
    target = $(e.target);

  function activeClass(reqElement) {
    reqElement.addClass('active').siblings().removeClass('active');
  }

  function findReqPos(slide) {
    reqPos = slide.offset().left - sliderOffset;
  }

  if (target.parent().hasClass('slider-next')) {

    if (nextSlide.length) {
      findReqPos(nextSlide);
      activeClass(nextSlide);
      activeClass(nextNav);
    } else {
      findReqPos(firstSlide);
      activeClass(firstSlide);
      activeClass(firstNav);
    }   

  } else if (target.parent().hasClass('slider-prev')) {

    if (prevSlide.length) {
      findReqPos(prevSlide);
      activeClass(prevSlide);
      activeClass(prevNav);
    } else {
      findReqPos(lastSlide);
      activeClass(lastSlide);
      activeClass(lastNav);
    }

  } else if (target.hasClass('slider-dot')) {

    var 
      navPosition = target.index(),
      slidePosition = items.eq(navPosition);

    findReqPos(slidePosition);
    activeClass(target);
    activeClass(slidePosition);

  }

  container.css('left', '-=' + reqPos + 'px');

});

// ~~~~~~~~~ SERVICE - TABS ~~~~~~~~~~~~~

$('.service-menu li').on('click', function(e) {

  e.preventDefault();

  var 
    item = $(this),
    itemContent = $('.service-column'),
    itemPosition = item.data('class');

  itemContent.filter('.' + itemPosition)
    .add(item)
    .addClass('active')
    .siblings()
    .removeClass('active');
    
});

// ~~~~~~~~~~~ PRICE - RANGE ~~~~~~~~~~~~~~

$('.toggle').on('mousedown', function(e) {
  e.preventDefault();

  var 
    slider = $(this).closest('.catalog-filter_price'),
    scale = slider.find(".scale"),
    bar = slider.find(".bar"),
    minToggle = slider.find('.min-toggle'),
    maxToggle = slider.find('.max-toggle'),
    $this = $(this);

  function moveAt(e) {
    $this.css({
      left: e.pageX - 20 + "px"
    });
  }

  moveAt(e);
  top: 

  slider.on('mousemove', function(e) {
    moveAt(e);
  });

  $(document).on('mouseup', function(e) {
    slider.off('mousemove');
    $(document).off('mouseup');
  });

});


// ~~~~~~~~~~ POPUPS ~~~~~~~~~~~

var closeWrite = document.querySelector(".js-popup-write .popup-close");
var cancelBtn = document.querySelector(".js-cancel");
var writeLink = document.querySelector(".js-write");
var writePopup = document.querySelector(".js-popup-write");
var popupAppear = document.querySelector(".popup-appear")
var writeForm = document.querySelector(".js-write-form");
var userName = document.querySelector("[name=user-name]");
var userEmail = document.querySelector("[name=user-email]");
var userMessage = document.querySelector("[name=user-message]");
var buyPopup = document.querySelector(".js-buy");
var catalog = document.querySelector(".catalog");

if(writeLink){
  writeLink.addEventListener("click", function(event) {
  event.preventDefault();
  writePopup.classList.add("popup-show"); 
  writePopup.classList.add("popup-appear"); // Добавил анимацию отдельным классом, иначе она запускалась каждый раз после анимации ошибки
  setTimeout(function() {writePopup.classList.remove("popup-appear");}, 500);
  userName.focus();
});
}

document.onclick = function(event) {
  var target = event.target;
  if(target.classList.contains("popup-close")){
    event.preventDefault();
    target.parentNode.classList.remove("popup-show");
  }
};

cancelBtn.addEventListener("click", function(event) {
  event.preventDefault();
  if (writePopup) {
      writePopup.classList.remove("popup-show");
    }
  if (buyPopup) {
    buyPopup.classList.remove("popup-show");
  }
})

if(writeForm) {
  writeForm.addEventListener("submit", function(event) {
  if (!(userName.value && userEmail.value && userMessage.value)) {
    event.preventDefault();
    writePopup.classList.add("popup-error");
    setTimeout(function() {writePopup.classList.remove("popup-error");}, 600);
  } else {
    localStorage.setItem("userName", userName.value);
    localStorage.setItem("userEmail", userEmail.value);
  }
});
}

window.addEventListener("keydown", function(event) {
  if (event.keyCode == 27) {
    if (writePopup) {
      writePopup.classList.remove("popup-show");
    }
    if (mapPopup) {
      mapPopup.classList.remove("map-show");
    }
    if (buyPopup) {
      buyPopup.classList.remove("popup-show");
    }
  }
});

if(catalog) {
  catalog.onclick = function(event) {
  var target = event.target;
  if (target.classList.contains("btn-buy")||target.classList.contains("icon-basket")) {
      event.preventDefault();
      buyPopup.classList.add("popup-show");
      buyPopup.classList.add("popup-appear");
  }
};
}


// ~~~~~~~~~~~ MAP ~~~~~~~~~~~~~~

function initialize() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(59.9391597,30.3176009),
    mapTypeControl: false
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var image = "img/map-marker.png";
  var myLatLng = new google.maps.LatLng(59.9387942,30.3230833);
  var beachMarker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image,
    title: "Большая Конюшенная ул., 19"
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

var closeMap = document.querySelector(".contacts-map .popup-close");
var mapPopup = document.querySelector(".contacts-map");

mapPopup.addEventListener("mouseover", function(event) {
  event.preventDefault();
  mapPopup.classList.add("map-show");
});

closeMap.addEventListener("click", function(event) {
  event.preventDefault();
  mapPopup.classList.remove("map-show");
});

 