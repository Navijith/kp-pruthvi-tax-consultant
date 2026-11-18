/**
 * Sync Service
 * Deferred per project architecture specification.
 */

async function syncExternalData() {
  return { status: 'idle', synced: 0 }
}

module.exports = {
  syncExternalData,
}
