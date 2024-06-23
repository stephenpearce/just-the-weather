/**
 * content.js
 * Copyright (C) 2024 Stephen Pearce <hello@stephenpearce.dev>
 */
chrome.runtime.sendMessage({ action: 'redirectIfNeeded' }, (response) => {
	console.log('Message sent to background script to redirect if needed.');
});
