document.addEventListener('DOMContentLoaded', function () {

  var closeButtons = document.getElementsByClassName('btn-close'),
      openButtons = document.getElementsByClassName('btn-play'),
      radios = document.querySelectorAll('input[name="select-advantage"]'),
      thumbs = document.getElementsByClassName('thumb');

  for(var r = 0; r < radios.length; r++) {
    radios[r].addEventListener('change', setadvantageClasses, this);
  }
  for(var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', onCloseFrame, this);
  }
  for(var j = 0; j < openButtons.length; j++) {
    openButtons[j].addEventListener('click', onOpenFrame, this);
  }
  for(var t = 0; t < thumbs.length; t++) {
    thumbs[t].addEventListener('touchstart', onStartTouch, this);
  }
  for(var e = 0; e < thumbs.length; e++) {
    thumbs[e].addEventListener('touchend', onEndTouch, this);
  }

  setadvantageCaroussel();
});

function setadvantageCaroussel() {
  setadvantageClasses();
}

function setadvantageClasses() {
  var input = document.getElementById('advantage-caroussel').querySelector('input:checked'),
      items = document.getElementsByClassName('advantage-carrousel__item'),
      classes = ['right-out', 'right', 'center', 'left', 'left-out'];

  for(var i = 0; i < items.length; i++) {
    for(var c = 0; c < classes.length; c++) {
      items[i].classList.remove(classes[c]);
    }
  }

  setLeftside(input, items.length > 4);
  getSibling(input, 1, 'next').classList.add('center');
  setRightside(input, items.length > 4);

  setActiveDot();
}

function setLeftside(input, moreThenFour) {
  if(getSibling(input, 1, 'prev') === null) {
    getLastChild(input).classList.add('left');
    if(moreThenFour) {
      getSibling(getLastChild(input), 2, 'prev').classList.add('left-out');
    }
  } else {
    getSibling(input, 1, 'prev').classList.add('left');
    if(moreThenFour) {
      if(getSibling(input, 3, 'prev') === null) {
        getLastChild(input).classList.add('left-out');
      } else {
        getSibling(input, 3, 'prev').classList.add('left-out');
      }
    }
  }
}

function setRightside(input, moreThenFour) {
  if(getSibling(input, 2, 'next') === null) {
    getSibling(getFirstChild(input), 1, 'next').classList.add('right');
    if(moreThenFour) {
      getSibling(getFirstChild(input), 3, 'next').classList.add('right-out');
    }
  } else {
    getSibling(input, 3, 'next').classList.add('right');
    if(moreThenFour) {
      if(getSibling(input, 4, 'next') === null) {
        getSibling(getFirstChild(input), 1, 'next').classList.add('right-out');
      } else {
        getSibling(input, 5, 'next').classList.add('right-out');
      }
    }
  }
}

function getSibling(elem, num, target) {
  var tempElem = elem;
  for(var i = 0; i < num; i++) {
    if(tempElem !== null) {
      tempElem = target === 'next' ? tempElem.nextElementSibling : tempElem.previousElementSibling;
    }
  }
  return tempElem;
}

function getFirstChild(node) {
  var tempObj = node.parentNode.firstChild;
  while(tempObj.nodeType !== 1 && tempObj.nextSibling !== null){
    tempObj = tempObj.nextSibling;
  }
  return (tempObj.nodeType === 1) ? tempObj : false;
}

function getLastChild(node) {
  var tempObj = node.parentNode.lastChild;
  while(tempObj.nodeType !== 1 && tempObj.previousSibling !== null){
    tempObj = tempObj.previousSibling;
  }
  return (tempObj.nodeType === 1) ? tempObj : false;
}

function onStartTouch(e) {
  this.touchStartX = e.changedTouches[0].pageX;
}

function onEndTouch(e) {
  if(e.changedTouches[0].pageX - this.touchStartX > 100) {
    selectadvantage('prev');
  } else if(e.changedTouches[0].pageX - this.touchStartX < -100) {
    selectadvantage('next');
  }
}

function selectadvantage(target) {
  var input = document.getElementById('advantage-caroussel').querySelector('input:checked'),
      elem;
  if(getSibling(input, 2, target) === null) {
    elem = target === 'next' ? getFirstChild(input) : getSibling(getLastChild(input), 1, 'prev');
  } else {
    elem = getSibling(input, 2, target);
    
  }
  elem.click();
  setActiveDot(input, elem);
}

function setActiveDots() {
  var l = document.getElementsByClassName('advantage-carrousel__item').length,
      items = document.getElementsByClassName('advantage-carrousel__item'),
      dot = undefined;

  for(var i = 0; i < items.length; i++) {
    dot = items[i].getElementsByClassName('active-dot')[0];
    if(dot) {
      dot.style.marginLeft = ((i - (l/2)) * 25) + 12 + 'px';
    }
  }
}

function setActiveDot() {
  var navItems = document.getElementsByClassName('advantage-carousel-nav')[0].querySelectorAll('li > label'),
      thumb = document.getElementById('advantage-caroussel').querySelector('input:checked').nextElementSibling;

  for(var n = 0; n < navItems.length; n++) {
    navItems[n].classList.remove('active');
  }

  document.getElementById(thumb.getAttribute('data-id')).classList.add('active');

}

function onCloseFrame(e) {
  var frame = e.currentTarget.nextElementSibling;
  frame.setAttribute('data-src', frame.src);
  frame.src = '';
}

function onOpenFrame(e) {
  var frame = document.getElementById(e.currentTarget.getAttribute('for')).nextElementSibling.querySelector('iframe');
  frame.src = frame.getAttribute('data-src');
  console.log(frame.src);
}

function onYouTubeIframeAPIReady() {
  var event = document.createEvent('Event');
  event.initEvent('youtube-api-ready', true, true);
  window.dispatchEvent(event);
}