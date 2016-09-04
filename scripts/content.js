// Copyright (c) 2016 Andrew Palmer. All rights reserved.
// https://github.com/apalmer0/

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = chrome.extension.getURL('css/custom.css');
  (document.head || document.documentElement).appendChild(style);
  const resultsList = document.querySelectorAll('li');
  const imgSrc = chrome.extension.getURL('images/remove.png');

  [].forEach.call(resultsList, function(header) {
    header.style.position = 'relative';
    const clearButton = document.createElement("img");
    clearButton.setAttribute("class", "removeItem");
    clearButton.setAttribute("title", "delete this result");
    clearButton.src = imgSrc;
    header.insertBefore(clearButton, header.children[0]);
  });

  document.addEventListener('click', function(e) {
    e = e || window.event;
    console.log(e.target.parentElement);
    const unwantedResult = e.target.parentElement;
    const allResults = e.target.parentElement.parentElement;
    // allResults.removeChild(unwantedResult);
  }, false);
});
