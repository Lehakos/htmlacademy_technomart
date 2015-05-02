
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

// ~~~~~~~~~ SERVICE-MENU ~~~~~~~~~~~~~

var serviceBtn = document.querySelectorAll(".service-menu li");
var serviceMain = document.querySelectorAll(".service-column");

function navActiveRemove(content, nav) {
  for(var i = 0; i < content.length; i++) {
    content[i].classList.remove("active");
    nav[i].classList.remove("active");
  }
}

function navActiveAdd(content, nav, counter) {
  content[counter].classList.add("active");
  nav[counter].classList.add("active");
}

function serviceNav(i) {
  serviceBtn[i].addEventListener("click", function(event) {
    navActiveRemove(serviceMain, serviceBtn)
    navActiveAdd(serviceMain, serviceBtn, i);
  });
};

for (var i = 0; i < serviceBtn.length; i++) {
    serviceNav(i);
}

// ~~~~~~~~~~~~~~~~~~ SLIDER ~~~~~~~~~~~~~~~~~~~~

var slider = document.querySelectorAll(".slider-item");
var slCurrent = 0;
var slPrev = document.querySelector(".slider-prev");
var slNext = document.querySelector(".slider-next");
var slNavDot = document.querySelectorAll(".slider-dot");

slPrev.addEventListener("click", function(event) {
  event.preventDefault();
  --slCurrent;
  if(slCurrent < 0) {
    slCurrent = slider.length - 1;
  } 
  navActiveRemove(slider, slNavDot);
  navActiveAdd(slider, slNavDot, slCurrent);
});

slNext.addEventListener("click", function(event) {
  event.preventDefault();
  ++slCurrent;
  if(slCurrent >= slider.length) {
    slCurrent = 0;
  }
  navActiveRemove(slider, slNavDot);
  navActiveAdd(slider, slNavDot, slCurrent);
});

function slNav(i) {
  slNavDot[i].addEventListener("click", function(event) {
    navActiveRemove(slider, slNavDot)
    navActiveAdd(slider, slNavDot, i);
  });
}

for (var i = 0; i < slider.length; i++) {
    slNav(i);
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

 