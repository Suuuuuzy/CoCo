try {
	//Removed the hardcoded URL to the Adapter package, instead pass it when injecting this script.
	// see background.js in function showAdapterInstallationInstructions
	var modal = new tingle.modal({
		footer: true,
		stickyFooter: false,
		closeMethods: [],
		closeLabel: "Close",
		cssClass: ['custom-class-1', 'custom-class-2'],
		onOpen: function () {
		},
		onClose: function () {
			modal.close();
			modal.destroy();
		},
		beforeClose: function () {
			return true; // close the modal
		}
	});

	// set content texts for popup
	function setPopup(contentElement) {

		modal.addFooterBtn(translation.btn_download, 'tingle-btn tingle-btn--default tingle-btn--pull-right', function () {
			window.open(downloadLink);
		});

		//cancel button
		modal.addFooterBtn(translation.btn_cancel, 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function () {
			modal.close();
		});

		//add Nuance logo
		//must be called with "file_path", "css class", "callback function"
		var imageURL = chrome.extension.getURL("installation_steps/NuanceLogo_Horz_k.png");
		modal.addLogo(imageURL, 'tingle--nuance-logo', function () {
		});

		//main text
		modal.addContentText(translation.adapterIntro, 'tingle-modal-box__content', function () {
		});

		//add help link
		//must be called with "text", "css class", "callback function"
		//modal.addAdapterHelpHyperlink(translation.manual_download, "tingle-help--hyperlink", function() {
		//	mainContent.innerHTML = translation.step_1 + '<br>' + translation.step_2;
		//});

	}
	//document.cookie = "shouldDisablePopup=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

	setPopup(translation.adapterIntro);

	modal.open();
} catch (error) {
	console.error('Error in Tingle:', error);
}