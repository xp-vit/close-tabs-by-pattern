const {browserAction, storage, tabs} = browser;

/**
 * Init extention by assigning onClicked to Icon.
 */
function init() {
  browserAction.onClicked.addListener(closeTabsByPattern);
}

function closeTabs(tabsToClose) {
  for (let tab of tabsToClose) {
    tabs.remove(tab.id);
  }
}

function onTabsQueryError(error) {
  console.log(`Error: ${error}`);
}

/**
 * Main callback. Get the patterns from storage, query tabs matching them and
 * close corresponding tabs.
 */
async function closeTabsByPattern() {
  const settings = await storage.sync.get();
  if (settings.patterns) {
    tabs.query({pinned: false, url: settings.patterns}).then(closeTabs, onTabsQueryError);
  }
}

init();
