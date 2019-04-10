var $ = require('jquery')
import { userHasWaited } from './utils.js'

// Keep track of how long it's been since page load
var start = new Date()

// When a user clicks the button, give them a new quote if they've waited
$(document).on('click', '#nextButton', function() {
  if(userHasWaited(start) === true) {
    window.location.reload()
  } else {
    alert("Think about the current quote before asking for another!")
  }
});
