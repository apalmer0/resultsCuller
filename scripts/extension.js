document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('status').textContent = "Click below to activate extension";
  const button = document.getElementById('changelinks');
  button.addEventListener('click', function () {
    $('#status').html('now click the results list to add a delete option');
    button.parentElement.removeChild(button)

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {data: 'culled'}, function(response) {
        console.log('success');
      });
    });
  });
});
