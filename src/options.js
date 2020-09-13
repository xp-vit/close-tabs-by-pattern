const { storage } = browser;

/**
 * Init options page callback.
 */
function init() {
  const patternsTextArea = document.getElementById("patterns");
  setOptionsFromStorage(patternsTextArea);
  patternsTextArea.addEventListener("change", setPatternsInStorageFromOptions);
}

/**
 * Load from storage.
 */
async function setOptionsFromStorage(patternsTextArea) {
  const settings = await storage.sync.get();
  patternsTextArea.value = (settings.patterns || []).join("\n");
}

/**
 *
 * Store patterns from options page to storage.
 *
 */
function setPatternsInStorageFromOptions() {
  const patterns = this.value.split("\n");
  storage.sync.set({patterns});
}

init();
