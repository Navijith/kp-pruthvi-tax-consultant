/**
 * Business Scanner Job
 * Note: External discovery is deferred per project specification until a legitimate
 * data source and verified permission model is established.
 */

async function runScheduledScanner() {
  // Graceful no-op placeholder
  return { status: 'idle', message: 'Discovery scanner deferred per specification' }
}

module.exports = {
  runScheduledScanner,
}
