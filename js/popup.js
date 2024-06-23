/**
 * popup.js
 * Copyright (C) 2024 Stephen Pearce <hello@stephenpearce.dev>
 */
document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementById('location-id');
	const saveButton = document.getElementById('save-location');

	chrome.storage.sync.get('locationID', (data) => {
		const storedLocationID = data.locationID;
		if (storedLocationID) {
			input.value = storedLocationID;
		}
		console.log('Got locationID from storage:', storedLocationID);
	});

	saveButton.addEventListener('click', () => {
		const locationID = input.value.trim();
		chrome.storage.sync.set({ locationID }, () => {
			console.log('Location ID saved:', locationID);
			alert('Location ID saved!');
		});
	});
});
