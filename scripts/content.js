// Copyright (c) 2016 Andrew Palmer. All rights reserved.
// https://github.com/apalmer0/

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = chrome.extension.getURL('css/custom.css');
  (document.head || document.documentElement).appendChild(style);
  const resultsList = document.querySelectorAll('a');
  const imgSrc = chrome.extension.getURL('images/remove.png');

  document.addEventListener('click', function(e) {
    e = e || window.event;
    let element = e.target;
    if(element.className === 'removeItem') {
      let unwantedResult = element.parentElement;
      let allResults = unwantedResult.parentElement;
      allResults.removeChild(unwantedResult);
    } else {
      getResultsList(element);
    }
  }, false);

  let getResultsList = function(element) {
    let parentElement = element.parentElement;
    let elementSiblings = parentElement.children;
    let siblingsMatch = [].every.call(elementSiblings, function(currentElement) {
      return currentElement.class === element.class;
    });
    if(siblingsMatch && elementSiblings.length > 3) {
      const resultsList = elementSiblings;
      [].forEach.call(resultsList, function(header) {
        header.style.position = 'relative';
        const clearButton = document.createElement("img");
        clearButton.setAttribute("class", "removeItem");
        clearButton.setAttribute("title", "delete this result");
        clearButton.src = imgSrc;
        header.insertBefore(clearButton, header.children[0]);
      });
    } else {
      getResultsList(parentElement);
    }
  };
});
