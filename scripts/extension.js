document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('status').textContent = "Click below to add delete option";
  const button = document.getElementById('changelinks');
  button.addEventListener('click', function () {
    $('#status').html('Delete option added');

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {data: 'culled'}, function(response) {
        $('#status').html('now click the results list to add a delete option');
        button.parentElement.removeChild(button)
        console.log('success');
      });
    });
  });
});
