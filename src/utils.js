// Don't allow users to get a new quote until they've thought about the old one
// for at least 10 seconds
export function userHasWaited(start) {
  var secondsSincePageLoad = (new Date() - start) / 1000
  return secondsSincePageLoad > 10 ? true : false
}
