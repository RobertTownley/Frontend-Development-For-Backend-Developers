// Keep track of how long it's been since page load
var start = new Date()

// Don't allow users to get a new quote until they've thought about the old one
// for at least 10 seconds
function userHasWaited() {
  var secondsSincePageLoad = (new Date() - start) / 1000
  return secondsSincePageLoad > 10 ? true : false
}

// When a user clicks the button, give them a new quote if they've waited
$(document).on('click', '#nextButton', function() {
  if(userHasWaited() === true) {
    window.location.reload()
  } else {
    alert("Think about the current quote before asking for another!")
  }
});
