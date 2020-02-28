filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("col-md-6 col-lg-4 filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("tag");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("tag active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// cursor
const cursorVT = document.querySelector('.vt')
const cursorHL = document.querySelector('.hl')

document.addEventListener('mousemove', e => {
  cursorVT.setAttribute('style', `left: ${e.clientX}px;`)
  cursorHL.setAttribute('style', `top: ${e.clientY}px;`)
})

//

function setupTypewriter(t) {
  var HTML = t.innerHTML;

  t.innerHTML = "";

  var cursorPosition = 0,
      tag = "",
      writingTag = false,
      tagOpen = false,
      typeSpeed = 100,
  tempTypeSpeed = 0;

  var type = function() {
  
      if (writingTag === true) {
          tag += HTML[cursorPosition];
      }

      if (HTML[cursorPosition] === "<") {
          tempTypeSpeed = 0;
          if (tagOpen) {
              tagOpen = false;
              writingTag = true;
          } else {
              tag = "";
              tagOpen = true;
              writingTag = true;
              tag += HTML[cursorPosition];
          }
      }
      if (!writingTag && tagOpen) {
          tag.innerHTML += HTML[cursorPosition];
      }
      if (!writingTag && !tagOpen) {
          if (HTML[cursorPosition] === " ") {
              tempTypeSpeed = 0;
          }
          else {
              tempTypeSpeed = (Math.random() * typeSpeed) + 50;
          }
          t.innerHTML += HTML[cursorPosition];
      }
      if (writingTag === true && HTML[cursorPosition] === ">") {
          tempTypeSpeed = (Math.random() * typeSpeed) + 50;
          writingTag = false;
          if (tagOpen) {
              var newSpan = document.createElement("span");
              t.appendChild(newSpan);
              newSpan.innerHTML = tag;
              tag = newSpan.firstChild;
          }
      }

      cursorPosition += 1;
      if (cursorPosition < HTML.length - 1) {
          setTimeout(type, tempTypeSpeed);
      }

  };

  return {
      type: type
  };
}

var typer = document.getElementById('typewriter');

typewriter = setupTypewriter(typewriter);

typewriter.type();