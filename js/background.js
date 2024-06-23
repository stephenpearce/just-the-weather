/**
 * background.js
 * Copyright (C) 2024 Stephen Pearce <hello@stephenpearce.dev>
 */
const browser = (typeof chrome !== "undefined") ? chrome : browser;

chrome.runtime.onInstalled.addListener(() => {
	console.log('Extension installed');
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'redirectIfNeeded') {
		browser.storage.sync.get('locationID', (data) => {
			const locationID = data.locationID;
			console.log('Background script retrieved locationID:', locationID);

			browser.webNavigation.onBeforeNavigate.addListener((details) => {
				const url = new URL(details.url);
				if (url.hostname.endsWith('bbc.co.uk')) {
					const allowedPaths = [
						'/iplayer',
						'/sounds',
						'/bitesize',
						'/cbbc',
						'/cbeebies',
						'/food',
						'/search'
					];

					const isAllowedPath = allowedPaths.some(path => url.pathname.startsWith(path));

					let redirectUrl = null;
					if (url.pathname === '/weather') {
						redirectUrl = locationID ? `https://www.bbc.co.uk/weather/${locationID}` : null;
					} else if (!url.pathname.startsWith('/weather') && !isAllowedPath) {
						redirectUrl = locationID ? `https://www.bbc.co.uk/weather/${locationID}` : `https://www.bbc.co.uk/weather`;
					}

					if (redirectUrl) {
						browser.tabs.update(details.tabId, { url: redirectUrl });
						console.log(`Redirecting to: ${redirectUrl}`);
					}
				}
			});
		});
	}
});