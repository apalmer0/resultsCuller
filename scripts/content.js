// Copyright (c) 2016 Andrew Palmer. All rights reserved.
// https://github.com/apalmer0/

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = chrome.extension.getURL('css/custom.css');
  (document.head || document.documentElement).appendChild(style);
  const imgSrc = chrome.extension.getURL('images/remove.png');

  const addDeleteButton = function(list) {
    [].forEach.call(list, function(header) {
      header.style.position = 'relative';
      const clearButton = document.createElement("img");
      clearButton.setAttribute("class", "removeItem");
      clearButton.setAttribute("title", "delete this result");
      clearButton.src = imgSrc;
      header.insertBefore(clearButton, header.children[0]);
    });
  };

  const getResultsList = function(element) {
    let parentElement = element.parentElement;
    let elementSiblings = parentElement.children;
    let siblingsMatch = [].every.call(elementSiblings, function(currentElement) {
      return currentElement.classList[0] === element.classList[0];
    });
    if(siblingsMatch && elementSiblings.length > 3) {
      const resultsList = elementSiblings;
      addDeleteButton(resultsList);
    } else {
      getResultsList(parentElement);
    }
  };

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
});
