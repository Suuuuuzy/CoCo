async function namik() {
	while(!document.querySelector("body #main")){
		await wakanda(100);
	}

	(new MutationObserver(mytaticos)).observe(document.querySelector("body #main"), {
		attributes: false,
		childList: true,
		characterData: false,
		subtree: true
	});
}
