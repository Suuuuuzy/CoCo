// original file:/Users/jianjia/Documents/COCO_results/12_doublex_empoweb_api_result/detected/gkcaldngjihkfdllegnaniclnpdfcaid/content.js

/*
 Content scripts are JavaScript files that run in the context of web pages. By using the standard Document Object Model (DOM), they can read details of the web pages the browser visits, or make changes to them.
 */

/**
 @typedef {Object.<any>} Dispositions_Pendings_Object
 @property {?text|string} _id
 @property {string} _id_error
 @property {?boolean} actual_transferee
 @property {string} actual_transferee_error
 @property {?text|string} after_response
 @property {string} after_response_error
 @property {string} after_response_date
 @property {string} after_response_date_error
 @property {?text|string} alien_number
 @property {string} alien_number_error
 @property {?text|string} alternate_documentation
 @property {string} alternate_documentation_error
 @property {string} background_checked
 @property {string} background_checked_error
 @property {?number|int} background_checker
 @property {string} background_checker_error
 @property {?text|string} background_checker_binary_id
 @property {string} background_checker_binary_id_error
 @property {?text|string} binary_id
 @property {string} binary_id_error
 @property {?text|string} birth_city
 @property {string} birth_city_error
 @property {?text|string} birth_country
 @property {string} birth_country_error
 @property {string} birth_date
 @property {string} birth_date_error
 @property {?text|string} birth_state
 @property {string} birth_state_error
 @property {?text|string} city
 @property {string} city_error
 @property {?text|string} county
 @property {string} county_error
 @property {string} created
 @property {string} created_error
 @property {?number|int} creator
 @property {string} creator_error
 @property {?text|string} creator_binary_id
 @property {string} creator_binary_id_error
 @property {?number|int} customer
 @property {string} customer_error
 @property {?text|string} customer_binary_id
 @property {string} customer_binary_id_error
 @property {?boolean} customer_completed
 @property {string} customer_completed_error
 @property {string} date
 @property {string} date_error
 @property {string} delayed_date
 @property {string} delayed_date_error
 @property {?text|string} delayed_response
 @property {string} delayed_response_error
 @property {?boolean} dishonorable_discharge
 @property {string} dishonorable_discharge_error
 @property {?boolean} domestic_violence
 @property {string} domestic_violence_error
 @property {?boolean} drug_user
 @property {string} drug_user_error
 @property {?boolean} editing
 @property {string} editing_error
 @property {?text|string} email
 @property {string} email_error
 @property {?boolean} ethnicity_hispanic
 @property {string} ethnicity_hispanic_error
 @property {?number|int} event
 @property {string} event_error
 @property {?text|string} event_binary_id
 @property {string} event_binary_id_error
 @property {?text|string} examiner_brady
 @property {string} examiner_brady_error
 @property {?text|string} examiner_name
 @property {string} examiner_name_error
 @property {?boolean} fall_within_exceptions
 @property {string} fall_within_exceptions_error
 @property {?boolean} felony_convicted
 @property {string} felony_convicted_error
 @property {?boolean} felony_indictment
 @property {string} felony_indictment_error
 @property {?text|string} foreign_citizenship
 @property {string} foreign_citizenship_error
 @property {?boolean} fugitive
 @property {string} fugitive_error
 @property {?text|string} gender
 @property {string} gender_error
 @property {?number|int} height_ft
 @property {string} height_ft_error
 @property {?number|int} height_in
 @property {string} height_in_error
 @property {?text|string} identification_authority
 @property {string} identification_authority_error
 @property {string} identification_expiration
 @property {string} identification_expiration_error
 @property {?text|string} identification_image
 @property {string} identification_image_error
 @property {?text|string} identification_image_back
 @property {string} identification_image_back_error
 @property {string} identification_issue
 @property {string} identification_issue_error
 @property {?text|string} identification_number
 @property {string} identification_number_error
 @property {?text|string} identification_type
 @property {string} identification_type_error
 @property {?boolean} ignore_duplicate
 @property {string} ignore_duplicate_error
 @property {?boolean} illegal_alien
 @property {string} illegal_alien_error
 @property {?text|string} items
 @property {string} items_error
 @property {?number|int} kiosk
 @property {string} kiosk_error
 @property {?text|string} kiosk_binary_id
 @property {string} kiosk_binary_id_error
 @property {?number|int} location
 @property {string} location_error
 @property {?text|string} location_binary_id
 @property {string} location_binary_id_error
 @property {string} mdi_date
 @property {string} mdi_date_error
 @property {?boolean} mentally_stable
 @property {string} mentally_stable_error
 @property {?text|string} military_city
 @property {string} military_city_error
 @property {?text|string} military_county
 @property {string} military_county_error
 @property {?text|string} military_pcs_city
 @property {string} military_pcs_city_error
 @property {string} military_pcs_date
 @property {string} military_pcs_date_error
 @property {?text|string} military_pcs_order_number
 @property {string} military_pcs_order_number_error
 @property {?text|string} military_pcs_state
 @property {string} military_pcs_state_error
 @property {?text|string} military_state
 @property {string} military_state_error
 @property {?text|string} military_street_1
 @property {string} military_street_1_error
 @property {?text|string} military_street_2
 @property {string} military_street_2_error
 @property {?text|string} military_zip
 @property {string} military_zip_error
 @property {string} modified
 @property {string} modified_error
 @property {?number|int} modifier
 @property {string} modifier_error
 @property {?text|string} modifier_binary_id
 @property {string} modifier_binary_id_error
 @property {?text|string} name_first
 @property {string} name_first_error
 @property {?text|string} name_last
 @property {string} name_last_error
 @property {?text|string} name_middle
 @property {string} name_middle_error
 @property {?boolean} national_fire_arms_act
 @property {string} national_fire_arms_act_error
 @property {string} nics_date
 @property {string} nics_date_error
 @property {?text|string} nics_number
 @property {string} nics_number_error
 @property {?text|string} nics_response
 @property {string} nics_response_error
 @property {?boolean} nonimmigrant_visa
 @property {string} nonimmigrant_visa_error
 @property {?text|string} nonimmigrant_visa_prohibition
 @property {string} nonimmigrant_visa_prohibition_error
 @property {?text|string} notes
 @property {string} notes_error
 @property {?text|string} number
 @property {string} number_error
 @property {?boolean} partial
 @property {string} partial_error
 @property {?boolean} paused
 @property {string} paused_error
 @property {?boolean} pawn_redemption
 @property {string} pawn_redemption_error
 @property {?number|int} pending
 @property {string} pending_error
 @property {?text|string} pending_binary_id
 @property {string} pending_binary_id_error
 @property {string} permit_date
 @property {string} permit_date_error
 @property {string} permit_expiration
 @property {string} permit_expiration_error
 @property {?text|string} permit_image
 @property {string} permit_image_error
 @property {?text|string} permit_image_back
 @property {string} permit_image_back_error
 @property {?text|string} permit_number
 @property {string} permit_number_error
 @property {?text|string} permit_state
 @property {string} permit_state_error
 @property {?text|string} permit_type
 @property {string} permit_type_error
 @property {?number|int} pkey
 @property {string} pkey_error
 @property {?boolean} private_party_transfer
 @property {string} private_party_transfer_error
 @property {?boolean} race_african_american
 @property {string} race_african_american_error
 @property {?boolean} race_american_indian
 @property {string} race_american_indian_error
 @property {?boolean} race_asian
 @property {string} race_asian_error
 @property {?boolean} race_native_hawaiian
 @property {string} race_native_hawaiian_error
 @property {?boolean} race_white
 @property {string} race_white_error
 @property {?boolean} renounced_citizenship
 @property {string} renounced_citizenship_error
 @property {?boolean} restraining_order
 @property {string} restraining_order_error
 @property {?string} signature_14
 @property {string} signature_14_error
 @property {string} signature_14_date
 @property {string} signature_14_date_error
 @property {?string} signature_22
 @property {string} signature_22_error
 @property {string} signature_22_date
 @property {string} signature_22_date_error
 @property {?string} signature_35
 @property {string} signature_35_error
 @property {string} signature_35_date
 @property {string} signature_35_date_error
 @property {?text|string} ssn
 @property {string} ssn_error
 @property {?text|string} state
 @property {string} state_error
 @property {?text|string} state_of_residence
 @property {string} state_of_residence_error
 @property {?text|string} street_1
 @property {string} street_1_error
 @property {?text|string} street_2
 @property {string} street_2_error
 @property {?text|string} upin
 @property {string} upin_error
 @property {?boolean} us_citizen
 @property {string} us_citizen_error
 @property {?boolean} valid_permit
 @property {string} valid_permit_error
 @property {?number|int} weight
 @property {string} weight_error
 @property {?text|string} zip
 @property {string} zip_error
 @property {?array} customers_existing
 @property {string} customers_existing_error
 @property {?boolean} duplicate_customer
 @property {string} duplicate_customer_error
 @property {?boolean} ignore_actual_transferee
 @property {string} ignore_actual_transferee_error
 @property {?boolean} ignore_dishonorable_discharge
 @property {string} ignore_dishonorable_discharge_error
 @property {?boolean} ignore_domestic_violence
 @property {string} ignore_domestic_violence_error
 @property {?boolean} ignore_drug_user
 @property {string} ignore_drug_user_error
 @property {?boolean} ignore_expired_nics_date
 @property {string} ignore_expired_nics_date_error
 @property {?boolean} ignore_expired_pending_date
 @property {string} ignore_expired_pending_date_error
 @property {?boolean} ignore_fall_within_exceptions
 @property {string} ignore_fall_within_exceptions_error
 @property {?boolean} ignore_felony_convicted
 @property {string} ignore_felony_convicted_error
 @property {?boolean} ignore_felony_indictment
 @property {string} ignore_felony_indictment_error
 @property {?boolean} ignore_fugitive
 @property {string} ignore_fugitive_error
 @property {?boolean} ignore_identification_expired
 @property {string} ignore_identification_expired_error
 @property {?boolean} ignore_identification_future_issued
 @property {string} ignore_identification_future_issued_error
 @property {?boolean} ignore_illegal_alien
 @property {string} ignore_illegal_alien_error
 @property {?boolean} ignore_mentally_stable
 @property {string} ignore_mentally_stable_error
 @property {?boolean} ignore_nonimmigrant_visa
 @property {string} ignore_nonimmigrant_visa_error
 @property {?boolean} ignore_out_of_state
 @property {string} ignore_out_of_state_error
 @property {?boolean} ignore_permit_expired
 @property {string} ignore_permit_expired_error
 @property {?boolean} ignore_permit_future_issued
 @property {string} ignore_permit_future_issued_error
 @property {?boolean} ignore_possible_duplicate_customer
 @property {string} ignore_possible_duplicate_customer_error
 @property {?boolean} ignore_renounced_citizenship
 @property {string} ignore_renounced_citizenship_error
 @property {?boolean} ignore_restraining_order
 @property {string} ignore_restraining_order_error
 @property {?boolean} ignore_under_age
 @property {string} ignore_under_age_error
 @property {?boolean} ignore_under_eighteen
 @property {string} ignore_under_eighteen_error
 @property {?boolean} is_military
 @property {string} is_military_error
 @property {?array} products
 @property {string} products_error
 @property {?boolean} us_born
 @property {string} us_born_error
 @property {array} flags
 @property {array} leep
 */

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, response) {
	console.log('Received Message - ' + request.from + ' - ' + request.subject);

	let site = window.location.hostname;
	let location = window.location.pathname.replace(new RegExp("[\-0-9]", "g"), "")

	console.log(window.location.href, site, location);

	if (site === 'app.fflboss.com' || site === 'beta.fflboss.com' || site === 'dev.fflboss.com') {
		if (location === '/dispositions/pendings//leep') {
			if ((request.from === 'background') && (request.subject === 'request_data')) {
				console.log('LP - Registering For a Thing');
				if (window.fnFFLBossMessages) {
					window.removeEventListener('message', window.fnFFLBossMessages, false);
				}
				let backgroundResponse = response;
				window.addEventListener("message", window.fnFFLBossMessages = (event) => {
					//debugger;
					// Only accept messages from the same frame
					// if (event.source !== window) {
					// 	return;
					// }
					let message = event.data;
					// Only accept messages that we know are ours
					if (typeof message !== "object" || message === null || !!message.source && message.source !== "fflboss") {
						return;
					}
					console.log('LP - Thing Was Called');
					let data = respondWithData(message['payload'] || null);
					chrome.runtime.sendMessage({
						from: 'content',
						subject: 'receive_data',
						tab_id: request.tab_id,
						payload: data
					});

				}, false);
			}
			if ((request.from === 'background') && (request.subject === 'autosave')) {
				requestAutosavePermission();
			}
			if ((request.from === 'background') && (request.subject === 'save_question')) {
				saveSecurityQuestion(request.data);
			}
			if ((request.from === 'background') && (request.subject === 'save_login')) {
				saveLeepLogin(request.data);
			}
		}
		if (location === '/dispositions/pendings//status') {
			if ((request.from === 'background') && (request.subject === 'request_data')) {
				window.recordDispositionData = () => {
					respondWithDataPartial(response);
				}
			}
			if ((request.from === 'background') && (request.subject === 'autosave')) {
				requestAutosavePermission();
			}
			if ((request.from === 'background') && (request.subject === 'save_question')) {
				saveSecurityQuestion(request.data);
			}
			if ((request.from === 'background') && (request.subject === 'save_login')) {
				saveLeepLogin(request.data);
			}
		}
	}

	if (site === 'www.cjis.gov') {
		if ((request.from === 'background') && (request.subject === 'autofill')) {
			//https://www.cjis.gov/CJISEAI/EAIController
			//"https://www.cjis.gov/CJISEAI/TAMOperationHandler?TAM_OP=logout&ERROR_CODE=0x00000000&URL=%2Fpkmslogout&AUTHNLEVEL="
			if (location.startsWith('/CJISEAI/EAIController') ||
				location.startsWith("/CJISEAI/TAMOperationHandler?TAM_OP=logout")) {
				autoFillLeepUsername(request.data);
				autoFillLeepPassword(request.data);
			}

			//https://www.cjis.gov/nics/PRServletSSO
			if (location.startsWith('/nics/PRServletSSO')) {
				autoFillLeepDataHook(request.data);
			}
		}
	}


	if (request.from === 'background' && request.subject === 'process_submit') {
		setTimeout(function () {
			readData('page', function (page) {
				let menuContainer = document.querySelector('#EXPAND-INNERDIV');
				let menuBarItems = menuContainer !== null ? menuContainer.querySelectorAll('.menuItem') : null;
				if (menuBarItems !== null && menuBarItems.length > 0) {

					if (page === 'enics') {
						let submitRequest = menuBarItems.length >= 4 ? menuBarItems[3] : null;
						if (submitRequest !== null) {
							submitRequest.children[1].click();
						}
					}
					if (page === 'enics_status') {
						let checkStatus = menuBarItems.length >= 1 ? menuBarItems[0] : null;
						if (checkStatus !== null) {
							checkStatus.children[1].click();
						}
					}
				}
			});
		}, 1000);

	}

});

//CHROME RUNTIME SEND MESSAGE - Sends to the Background
chrome.runtime.sendMessage({from: 'content', subject: 'show_page'}, function (response) {
	if (typeof response === 'undefined' || response === null || !response.hasOwnProperty('message')) return;
	console.log(response.message);
});

/*
	REQUEST AUTO FILL
 */

//https://www.cjis.gov/CJISEAI/EAIController
if (location.href.startsWith('https://www.cjis.gov/CJISEAI/EAIController') ||
	location.href.startsWith('https://www.cjis.gov/CJISEAI/TAMOperationHandler?TAM_OP=logout')) {
	window.addEventListener("load", function () {

		let signInButtons = document.getElementsByName('x_signInButton');
		let signInButton = signInButtons.length > 0 ? signInButtons[0] : null;
		if (signInButton !== null) {
			let txtUsername = document.getElementById('x_username');
			readData('leep_username', autoFillLeepUsername);
			readData('leep_username', function (leep_username) {
				if ((leep_username === null || leep_username === "") && txtUsername !== null) {
					txtUsername.addEventListener("keyup", function (e) {
						// noinspection JSDeprecatedSymbols
						if (e.which == 13 || e.keyCode == 13) {
						} else {
							storeData('stored_username', txtUsername.value);
						}

					});
				}
			});
		}

		let nextButtons = document.getElementsByName('x_NEXT');
		let nextButton = nextButtons.length > 0 ? nextButtons[0] : null;
		if (nextButton !== null) {
			let txtPassword = document.getElementById('x_password');
			let isErrored = document.getElementById('alert_container');
			readData('login_attempts', (attempts) => {
				console.log('LEEP ATTEMPTS - ' + attempts);
				if (!attempts || attempts === 0) {
					readData('leep_password', autoFillLeepPassword);
				}
			});
			readData('leep_password', function (leep_password) {
				if ((leep_password === null || leep_password === "") && txtPassword !== null && (isErrored == null)) {
					txtPassword.addEventListener("keyup", function (e) {
						// noinspection JSDeprecatedSymbols
						if (e.which == 13 || e.keyCode == 13) {
						} else {
							storeData('stored_password', txtPassword.value);
						}

					});
				}
			});
		}

		let questionInterrupt = document.getElementById('lbl_x_CHALLENGE_ANSWER');
		if (questionInterrupt !== null && questionInterrupt.textContent !== "") {
			chrome.runtime.sendMessage({from: 'content', subject: 'process_submit'}, function (response) {
			});
		}


		//div_terminate > a
		setTimeout(function () {
			let terminateSession = document.getElementById('div_terminate');
			if (terminateSession !== null) {
				let terminateButton = terminateSession.children[0];
				if (terminateButton !== null) {
					terminateButton.click();
				}
			}
		}, 1000);

	}, false);
}


if (location.href.startsWith('https://www.cjis.gov/nics/PRServletSSO')) {
	window.addEventListener("load", function () {
		setTimeout(function () {

			readData('enics', autoFillLeepDataHook);

			readData('should_store_data', function (should_store_data) {
				console.log('Should Store ' + should_store_data);
				if (should_store_data == true) {
					readMultiples(['stored_username', 'stored_password'], function (fields) {
						chrome.runtime.sendMessage({
							from: 'content',
							subject: 'save_login',
							data: fields
						}, function (response) {
						});
					});
				}
			});

			//Page
			//https://www.cjis.gov/nics/PRServletSSO/UHko3oflAhsa1kUS6YCor2Phv4EAVa66*/!STANDARD?
			//iFrame
			///nics/PRServletSSO/UHko3oflAhsa1kUS6YCor2Phv4EAVa66*/!TABTHREAD0?pyActivity=%40baseclass.doUIAction&action=display&className=Data-Portal&harnessName=ExternalDashboard&pzHarnessID=HIDC8E958362ACDEF38019C576A04158CB1
			//ExternalDashboardTermsAndConditions_pyDisplayHarness_10
			//ExternalDashboardTermsAndConditions_pyDisplayHarness_10
			let possible_accept_tos = document.getElementsByName('ExternalDashboardTermsAndConditions_pyDisplayHarness_10');
			let accept_tos = possible_accept_tos.length > 0 ? possible_accept_tos[0] : null;
			if (accept_tos !== null) {
				// accept_tos.click();
				return;
			}


			let home_tab = document.getElementById('INNERDIV-SubSectionExternalWATabB');
			let homeTabIsVisible = home_tab !== null ? home_tab.style.display : null;
			if (homeTabIsVisible === 'block') {
				chrome.runtime.sendMessage({from: 'content', subject: 'process_submit'}, function (response) {
				});
			}

		}, 1000);
	}, false);
}


function storeData(name, data) {
	if (typeof data !== 'undefined' && data !== null) {
		// Save it using the Chrome extension storage API.
		let store = {};
		store[name] = data;
		chrome.storage.sync.set(store, function () {
			if (data !== '')
				console.log('Data Saved for ' + name + ' with ' + data);
		});
	}
}

function readData(name, reply) {
	// Read it using the storage API
	chrome.storage.sync.get([name], function (items) {
		if (items.hasOwnProperty(name)) {
			console.log('Found Data for ' + name);
			if (name == 'page') {
				console.log(items[name]);
			}
			reply(items[name]);
		}
	});
}

function readMultiples(names, reply) {
	// Read it using the storage API
	chrome.storage.sync.get(names, function (items) {
		console.log('Found Data for ' + names);
		reply(items);
	});
}


function requestAutosavePermission() {
	let leep_username = document.getElementById('leep_username');
	let leep_password = document.getElementById('leep_password');

	if ((leep_username !== null && leep_username.value == '') && (leep_password !== null && leep_password.value == '')) {
		let permission_request_script = document.getElementById('permission_request_script');
		if (permission_request_script !== null) return;

		let injectedCode = 'window.requestPermissionToAutosave()';
		let script = document.createElement('script');
		script.id = 'permission_request_script';
		//script.appendChild(document.createTextNode('('+ injectedCode +')();'));
		script.appendChild(document.createTextNode('' + injectedCode + ';'));

		let injectPoint = document.getElementById('automated-instructions');
		injectPoint.appendChild(script);

	}
}

function saveSecurityQuestion(question) {

	if (question !== null && question !== '') {
		let permission_request_script = document.getElementById('save_question_script');
		if (permission_request_script !== null) return;

		let injectedCode = 'window.saveSecurityQuestion("' + question.replace(/"/g, '') + '")';
		let script = document.createElement('script');
		script.id = 'save_question_script';
		//script.appendChild(document.createTextNode('('+ injectedCode +')();'));
		script.appendChild(document.createTextNode('' + injectedCode + ';'));

		let injectPoint = document.getElementById('automated-instructions');
		injectPoint.appendChild(script);

	}
}

function saveLeepLogin(data) {

	if (data !== null && data !== '' && typeof data['stored_username'] !== 'undefined' && typeof data['stored_password'] !== 'undefined') {
		let permission_request_script = document.getElementById('save_leep_login');
		if (permission_request_script !== null) return;

		let injectedCode = 'window.saveLeepLogin("' + data['stored_username'].replace(/"/g, '') + '", "' + data['stored_password'].replace(/"/g, '') + '")';
		let script = document.createElement('script');
		script.id = 'save_leep_login';
		//script.appendChild(document.createTextNode('('+ injectedCode +')();'));
		script.appendChild(document.createTextNode('' + injectedCode + ';'));

		let injectPoint = document.getElementById('automated-instructions');
		injectPoint.appendChild(script);

	}
}

/**
 * @param {Dispositions_Pendings_Object} disposition
 * @return object
 */
function respondWithData(disposition) {

	console.log('Leep - Responding With A Thing');

	let leep_username = disposition.leep['leep_username'] || '';
	let leep_password = disposition.leep['leep_password'] || '';

	let name_last = disposition.name_last;
	let name_first = disposition.name_first;
	let name_middle = disposition.name_middle;
	let state_of_residence = disposition.state_of_residence;
	let birth_city = disposition.birth_city;
	let birth_state = disposition.birth_state;
	let birth_country = disposition.birth_country;
	// noinspection JSUnresolvedVariable
	let height = disposition.height;
	let weight = disposition.weight;
	let gender = disposition.gender;
	let birth_date = disposition.birth_date;
	let ssn = disposition.ssn;
	let ethnicity_hispanic = disposition.ethnicity_hispanic;
	let race_american_indian = disposition.race_american_indian;
	let race_asian = disposition.race_asian;
	let race_african_american = disposition.race_african_american;
	let race_native_hawaiian = disposition.race_native_hawaiian;
	let race_white = disposition.race_white;
	let us_citizenship = disposition.us_citizen ? 'US Citizen' : disposition.foreign_citizenship;
	let foreign_citizenship = disposition.us_citizen ? null : disposition.foreign_citizenship;

	let identification_type = disposition.identification_type;
	let identification_number = disposition.identification_number;

	let leep_isChecked1 = disposition.flags['isChecked1'] || '';
	let leep_isChecked2 = disposition.flags['isChecked2'] || '';
	let leep_isChecked3 = disposition.flags['isChecked3'] || '';
	let leep_isChecked4 = disposition.flags['isChecked4'] || '';
	let leep_isChecked5 = disposition.flags['isChecked5'] || '';
	let leep_isChecked6 = disposition.flags['isChecked6'] || '';
	let leep_isChecked7 = disposition.flags['isChecked7'] || '';
	let leep_isChecked8 = disposition.flags['isChecked8'] || '';
	let leep_isChecked9 = disposition.flags['isChecked9'] || '';
	let leep_isChecked10 = disposition.flags['isChecked10'] || '';
	let leep_isChecked11 = disposition.flags['isChecked11'] || '';
	let leep_isChecked12 = disposition.flags['isChecked12'] || '';
	let leep_isChecked13 = disposition.flags['isChecked13'] || '';
	let leep_isChecked14 = disposition.flags['isChecked14'] || '';
	let leep_isChecked15 = disposition.flags['isChecked15'] || '';

	return {
		leep_username: leep_username,
		leep_password: leep_password,
		enics: {
			name_last: name_last,
			name_first: name_first,
			name_middle: name_middle,
			state_of_residence: state_of_residence,
			birth_city: birth_city,
			birth_state: birth_state,
			birth_country: birth_country,
			height: height,
			weight: weight,
			gender: gender,
			birth_date: birth_date,
			ssn: ssn,
			ethnicity_hispanic: ethnicity_hispanic,
			race_american_indian: race_american_indian,
			race_asian: race_asian,
			race_african_american: race_african_american,
			race_native_hawaiian: race_native_hawaiian,
			race_white: race_white,
			us_citizenship: us_citizenship,
			foreign_citizenship: foreign_citizenship,
			identification_type: identification_type,
			identification_number: identification_number,
			leep_isChecked1: leep_isChecked1,
			leep_isChecked2: leep_isChecked2,
			leep_isChecked3: leep_isChecked3,
			leep_isChecked4: leep_isChecked4,
			leep_isChecked5: leep_isChecked5,
			leep_isChecked6: leep_isChecked6,
			leep_isChecked7: leep_isChecked7,
			leep_isChecked8: leep_isChecked8,
			leep_isChecked9: leep_isChecked9,
			leep_isChecked10: leep_isChecked10,
			leep_isChecked11: leep_isChecked11,
			leep_isChecked12: leep_isChecked12,
			leep_isChecked13: leep_isChecked13,
			leep_isChecked14: leep_isChecked14,
			leep_isChecked15: leep_isChecked15,
		}
	};
}

function respondWithDataPartial(response) {

	let enics_row = document.getElementById('enics_helper');
	if (enics_row == null) return;

	let leep_username = document.getElementById('leep_username');
	let leep_password = document.getElementById('leep_password');

	let data = {
		leep_username: leep_username !== null ? leep_username.value : '',
		leep_password: leep_password !== null ? leep_password.value : '',
	};

	// Directly respond to the sender (popup),
	// through the specified callback */
	response(data);
}

function autoFillLeepUsername(leep_username) {
	let USERNAME = document.getElementById('x_username');
	if (typeof leep_username !== 'undefined' &&
		leep_username !== null &&
		leep_username !== "" &&
		USERNAME !== null) {
		USERNAME.value = leep_username;
		if (leep_username.trim() === "") return;
		storeData('login_attempts', 0);
		let button = document.getElementsByName('x_signInButton');
		button = button.length > 0 ? button[0] : null;
		if (button !== null) {
			button.click();
		}
	}
}

function autoFillLeepPassword(leep_password) {
	let PASSWORD = document.getElementById('x_password');
	let ALERT = document.getElementById('alert_container');
	if (typeof leep_password !== 'undefined' &&
		leep_password !== null &&
		leep_password !== "" &&
		PASSWORD !== null &&
		(typeof ALERT === 'undefined' || ALERT === null)
	) {
		PASSWORD.value = leep_password;
		if (leep_password.trim() === "") return;
		storeData('login_attempts', 1);
		let button = document.getElementsByName('x_NEXT');
		button = button.length > 0 ? button[0] : null;
		//alert('im trying to fill');
		if (button !== null) {
			button.click();
		}
	}
}

function autoFillLeepDataHook(enics) {
	let verification_yes = document.getElementById("pyWorkPageSearchRequestPurgeFFLVerificationYes");
	let FFLVerification = document.getElementById("1738dd72Yes");
	//Force the YES
	if (typeof verification_yes !== 'undefined' && verification_yes !== null) {
		verification_yes.click();
	}
	if (typeof FFLVerification !== "undefined" && FFLVerification !== null) {
		FFLVerification.click();
	}
	//tab1

	//setTimeout(function () {
	//TODO: needs to possibly have a var to tell if fields have already been filled in
	autoFillLEEPDataTab1(enics);
	//}, 1500);

	//click continue
	//TODO: there needs to be a counter var here, so if someone goes back to review data it wont auto pull them forward

	// const buttonPage1Continue = document.querySelector('button[name="pyCaseActionAreaButtons_pyWorkPage_26"]');
	// if (buttonPage1Continue) {
	 	//buttonPage1Continue.click();
	// }

	//tab2
	//setTimeout(function () {
	autoFillLEEPDataTab2(enics);
	//}, 1500);
}

//$PpyWorkPage$pLAST_NAME
//$PpyWorkPage$pFIRST_NAME
//$PpyWorkPage$pMIDDLE_NAME

function autoFillLEEPDataTab1(enics) {

	let LAST_NAME_VERIFY = getFirstInputByName('$PpyWorkPage$pLAST_NAME');
	if (typeof LAST_NAME_VERIFY !== "undefined" && LAST_NAME_VERIFY !== null) {
		let FIRST_NAME_VERIFY = getFirstInputByName('$PpyWorkPage$pFIRST_NAME');
		let MIDDLE_NAME_VERIFY = getFirstInputByName('$PpyWorkPage$pMIDDLE_NAME');

		if (typeof enics.name_last !== 'undefined') LAST_NAME_VERIFY.value = enics.name_last;
		if (typeof enics.name_first !== 'undefined' && FIRST_NAME_VERIFY !== null) FIRST_NAME_VERIFY.value = enics.name_first;
		if (typeof enics.name_middle !== 'undefined' && MIDDLE_NAME_VERIFY !== null) MIDDLE_NAME_VERIFY.value = enics.name_middle;
		return;
	}

	let LAST_NAME = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pLAST_NAME');
	if (typeof LAST_NAME === "undefined" || LAST_NAME === null) return;

	let FIRST_NAME = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pFIRST_NAME');
	let MIDDLE_NAME = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pMIDDLE_NAME');
	let STATE_CODE = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pSTATE_CODE');
	let POB_CODE = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pPOB_CODE');
	let HEIGHT = getFirstNumberByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pHEIGHT');
	let WEIGHT = getFirstNumberByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pWEIGHT');
	let GENDER_CODE = getFirstSelectByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pGENDER_CODE'); //M/F Select

	let DOB = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pDOB');
	let SSN = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pSSN');
	//let UPIN = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pUPIN');

	//DOM MANIPULATION AFTER EVENT FROM POPUP IS FIRED
	if (typeof enics.name_last !== 'undefined') LAST_NAME.value = enics.name_last;
	if (typeof enics.name_first !== 'undefined' && FIRST_NAME !== null) FIRST_NAME.value = enics.name_first;
	if (typeof enics.name_middle !== 'undefined' && MIDDLE_NAME !== null) {
		const el = document.querySelector('#e9981bac');
		el.focus();
		el.select();
		document.execCommand('insertText', false, enics.name_middle);
	}
	if (typeof enics.state_of_residence !== 'undefined' && STATE_CODE !== null) STATE_CODE.value = enics.state_of_residence;

	if (POB_CODE !== null) {
		if (typeof enics.birth_country !== 'undefined' && enics.birth_country !== '') {
			POB_CODE.value = enics.birth_country;
		}
		//typeof enics.birth_city !== 'undefined' && enics.birth_city !== '' &&
		if (typeof enics.birth_state !== 'undefined' && enics.birth_state !== '') {
			POB_CODE.value = enics.birth_state;
		}
	}

	console.log("Testing Height");
	console.log(HEIGHT);
	console.log(enics.height);
	if (typeof enics.height !== 'undefined' && HEIGHT !== null) HEIGHT.value = enics.height;
	if (typeof enics.weight !== 'undefined' && WEIGHT !== null) WEIGHT.value = enics.weight;

	if (typeof enics.gender !== 'undefined' && GENDER_CODE !== null) GENDER_CODE.value = enics.gender == 'O' ? 'U' : enics.gender;

	if (typeof enics.birth_date !== 'undefined' && DOB !== null) DOB.value = enics.birth_date;
	if (typeof enics.ssn !== 'undefined' && SSN !== null) SSN.value = enics.ssn;

	//TODO: there needs to be a counter var here, so if someone goes back to review data it wont auto pull them forward
	const buttonPage1Continue = document.querySelector('button[name="pyCaseActionAreaButtons_pyWorkPage_26"]');
	if (buttonPage1Continue) {
		//buttonPage1Continue.click();
	}
}

async function autoFillLEEPDataTab2(enics) {

	let isHispanicOrLatinotrue = document.getElementById('895018eftrue');
	let isHispanicOrLatinofalse = document.getElementById('895018effalse');

	let isChecked1 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pRace$l1$pisChecked'); //Asian
	let isChecked2 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pRace$l2$pisChecked'); //Black or African American
	let isChecked4 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pRace$l4$pisChecked'); //American Indian
	let isChecked5 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pRace$l5$pisChecked'); //Native Hawaiian
	let isChecked6 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pRace$l6$pisChecked'); //White

	let CITIZEN_STATUS_CODE = getFirstSelectByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pCITIZEN_STATUS_CODE'); //C/F Select
	let CITIZEN_COUNTRY_CODE = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pCITIZEN_COUNTRY_CODE'); //

	//let EXC_CODE = getFirstSelectByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pEXC_CODE'); //12.d.2 Non-Immigrant w/ Visa Exception

	let misc_numbers_1 = getFirstSelectByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pMiscNo$l1$pMNU_TYPE_CODE');
	let misc_value = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pMiscNo$l1$pMNU');

	let purp_isChecked1 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l1$pisChecked');
	let purp_isChecked2 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l2$pisChecked');
	let purp_isChecked3 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l3$pisChecked');
	let purp_isChecked4 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l4$pisChecked');
	let purp_isChecked5 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l5$pisChecked');
	let purp_isChecked6 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l6$pisChecked');
	let purp_isChecked7 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l7$pisChecked');
	let purp_isChecked8 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l8$pisChecked');
	let purp_isChecked9 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l9$pisChecked');
	let purp_isChecked10 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l10$pisChecked');
	let purp_isChecked11 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l11$pisChecked');
	let purp_isChecked12 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l12$pisChecked');
	let purp_isChecked13 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l13$pisChecked');
	let purp_isChecked14 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l14$pisChecked');
	let purp_isChecked15 = getFirstCheckboxByName('$PpyWorkPage$pSearchRequest$pPurge$pTransPurpose$l15$pisChecked');

	//DOM MANIPULATION AFTER EVENT FROM POPUP IS FIRED
	//NOTE: can't do clicks here unless this is completely split out because on the last page the click will uncheck it (and that's bad)
	if (typeof enics.ethnicity_hispanic !== 'undefined' && isHispanicOrLatinotrue !== null && isHispanicOrLatinofalse !== null) {
		if (!enics.ethnicity_hispanic) {
			isHispanicOrLatinotrue.checked = false;
			isHispanicOrLatinofalse.checked = true;
		} else {
			isHispanicOrLatinotrue.checked = true;
			isHispanicOrLatinofalse.checked = false;
		}
	}


	if (typeof enics.race_asian !== 'undefined' && isChecked1 !== null && enics.race_asian) isChecked1.checked = true;
	if (typeof enics.race_african_american !== 'undefined' && isChecked2 !== null && enics.race_african_american) isChecked2.checked = true;
	if (typeof enics.race_american_indian !== 'undefined' && isChecked4 !== null && enics.race_american_indian) isChecked4.checked = true;
	if (typeof enics.race_native_hawaiian !== 'undefined' && isChecked5 !== null && enics.race_native_hawaiian) isChecked5.checked = true;
	if (typeof enics.race_white !== 'undefined' && isChecked6 !== null && enics.race_white) isChecked6.checked = true;

	if (CITIZEN_STATUS_CODE !== null && CITIZEN_COUNTRY_CODE !== null) {
		if (typeof enics.us_citizenship !== 'undefined' && enics.us_citizenship == 'US Citizen') {
			CITIZEN_STATUS_CODE.value = 'C';
			//<input data-test-id="2017052416545505002848349" type="text" data-ctl="[&quot;AutoCompleteAG&quot;]" autocomplete="off" name="$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pCITIZEN_COUNTRY_CODE" id="CITIZEN_COUNTRY_CODE" data-skip-ac="yes" validationtype="required" class="autocomplete_input ac_" value="" data-attributes="[ &quot;EXPANDEDSubSectionSearchRequestCitizenshipDataGather1&quot;,0,0,{&quot;CodeName&quot; : &quot;Literal_COUNTRY_CODE&quot;,&quot;SourceProperty&quot; : &quot;.PartialPurge.Subject.CITIZEN_COUNTRY_CODE&quot;,&quot;ExcludeWhen&quot; : &quot;Literal_&quot;},&quot;pyWorkPage.SearchRequest&quot;]" data-old-value="">
			//value="US"
			//<div id="CT" swp=".PartialPurge.Subject.CITIZEN_STATUS_CODE" show_when=".PartialPurge.Subject.CITIZEN_STATUS_CODE !== 'C' || .PartialPurge.Subject.CITIZEN_STATUS_CODE = ''" height="0px" style="display:none; " class="content-item content-field item-1   " string_type="field" reserve_space="false" fullprops="pyWorkPage.SearchRequest.PartialPurge.Subject.CITIZEN_STATUS_CODE" sec_baseref="pyWorkPage.SearchRequest"><div class="content-inner "><label data-test-id="2017052416545505002848349-Label" class="field-caption dataLabelForWrite" for="CITIZEN_COUNTRY_CODE"><span class="iconRequired standard_iconRequired">Country of Citizenship</span><strong class="required-field-accessibility">Required</strong></label><div class="field-item dataValueWrite"><input data-test-id="2017052416545505002848349" type="text" data-ctl="[&quot;AutoCompleteAG&quot;]" autocomplete="off" name="$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pCITIZEN_COUNTRY_CODE" id="CITIZEN_COUNTRY_CODE" data-skip-ac="yes" validationtype="required" class="autocomplete_input ac_" value="US" data-attributes="[ &quot;EXPANDEDSubSectionSearchRequestCitizenshipDataGather1&quot;,0,0,{&quot;CodeName&quot; : &quot;Literal_COUNTRY_CODE&quot;,&quot;SourceProperty&quot; : &quot;.PartialPurge.Subject.CITIZEN_COUNTRY_CODE&quot;,&quot;ExcludeWhen&quot; : &quot;Literal_&quot;},&quot;pyWorkPage.SearchRequest&quot;]"><span class="autocomplete_span"><div class="autocomplete_icon" id="acspin"></div></span></div></div></div>
			setTimeout(function () {
				CITIZEN_STATUS_CODE.value = 'C';

				if ("createEvent" in document) {
					let evt = document.createEvent("HTMLEvents");
					evt.initEvent("change", false, true);
					CITIZEN_STATUS_CODE.dispatchEvent(evt);
				} else {
					CITIZEN_STATUS_CODE.fireEvent("onchange");
				}

				if (CITIZEN_COUNTRY_CODE.value.trim() == '') {
					CITIZEN_COUNTRY_CODE.value = "US";
				}
			}, 1000);
			//CITIZEN_COUNTRY_CODE.value = "United States of America";
		}
		if (typeof enics.foreign_citizenship !== 'undefined' && enics.foreign_citizenship !== '') {
			CITIZEN_STATUS_CODE.value = 'F';
			CITIZEN_COUNTRY_CODE.value = enics.foreign_citizenship;
		}
	}

	if (misc_numbers_1 !== null && typeof enics.identification_type !== 'undefined' && enics.identification_type !== '' && (
		enics.identification_type == 'DL' || enics.identification_type == 'Drivers License' || enics.identification_type == 'DriversLicense'
	)) {
		misc_numbers_1.value = "DL";
	}
	if (misc_value !== null && typeof enics.identification_number !== 'undefined' && enics.identification_number !== '') {
		misc_value.value = enics.identification_number;
	}
	//essentially if the 2 above did nothing, click the plus button and fill them out
	if (misc_value === null) {
		//click the plus button to render it
		document.querySelector("a[name='SearchRequestAddInfoSF_pyWorkPage.SearchRequest_27']").click();
		await new Promise(r => setTimeout(r, 2000));
		//get them again
		misc_numbers_1 = getFirstSelectByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pMiscNo$l1$pMNU_TYPE_CODE');
		misc_value = getFirstInputByName('$PpyWorkPage$pSearchRequest$pPartialPurge$pSubject$pMiscNo$l1$pMNU');
		misc_numbers_1.value = "DL";
		misc_value.value = enics.identification_number;
	}

	if (typeof enics.leep_isChecked1 !== 'undefined' && purp_isChecked1 !== null && enics.leep_isChecked1 == 1) purp_isChecked1.checked = true;
	if (typeof enics.leep_isChecked2 !== 'undefined' && purp_isChecked2 !== null && enics.leep_isChecked2 == 1) purp_isChecked2.checked = true;
	if (typeof enics.leep_isChecked3 !== 'undefined' && purp_isChecked3 !== null && enics.leep_isChecked3 == 1) purp_isChecked3.checked = true;
	if (typeof enics.leep_isChecked4 !== 'undefined' && purp_isChecked4 !== null && enics.leep_isChecked4 == 1) purp_isChecked4.checked = true;
	if (typeof enics.leep_isChecked5 !== 'undefined' && purp_isChecked5 !== null && enics.leep_isChecked5 == 1) purp_isChecked5.checked = true;
	if (typeof enics.leep_isChecked6 !== 'undefined' && purp_isChecked6 !== null && enics.leep_isChecked6 == 1) purp_isChecked6.checked = true;
	if (typeof enics.leep_isChecked7 !== 'undefined' && purp_isChecked7 !== null && enics.leep_isChecked7 == 1) purp_isChecked7.checked = true;
	if (typeof enics.leep_isChecked8 !== 'undefined' && purp_isChecked8 !== null && enics.leep_isChecked8 == 1) purp_isChecked8.checked = true;
	if (typeof enics.leep_isChecked9 !== 'undefined' && purp_isChecked9 !== null && enics.leep_isChecked9 == 1) purp_isChecked9.checked = true;
	if (typeof enics.leep_isChecked10 !== 'undefined' && purp_isChecked10 !== null && enics.leep_isChecked10 == 1) purp_isChecked10.checked = true;
	if (typeof enics.leep_isChecked11 !== 'undefined' && purp_isChecked11 !== null && enics.leep_isChecked11 == 1) purp_isChecked11.checked = true;
	if (typeof enics.leep_isChecked12 !== 'undefined' && purp_isChecked12 !== null && enics.leep_isChecked12 == 1) purp_isChecked12.checked = true;
	if (typeof enics.leep_isChecked13 !== 'undefined' && purp_isChecked13 !== null && enics.leep_isChecked13 == 1) purp_isChecked13.checked = true;
	if (typeof enics.leep_isChecked14 !== 'undefined' && purp_isChecked14 !== null && enics.leep_isChecked14 == 1) purp_isChecked14.checked = true;
	if (typeof enics.leep_isChecked15 !== 'undefined' && purp_isChecked15 !== null && enics.leep_isChecked15 == 1) purp_isChecked15.checked = true;

}

function getFirstInputByName(element_name) {
	let elements = document.getElementsByName(element_name);
	if (elements.length) {
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].type == 'text') {
				return elements[i];
			}
		}
		return null;
	} else {
		return null;
	}
}

function getFirstNumberByName(element_name) {
	let elements = document.getElementsByName(element_name);
	if (elements.length) {
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].type == 'number') {
				return elements[i];
			}
		}
		return null;
	} else {
		return null;
	}
}

function getFirstSelectByName(element_name) {
	let elements = document.getElementsByName(element_name);
	if (elements.length) {
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].type == 'select-one') {
				return elements[i];
			}
		}
		return null;
	} else {
		return null;
	}
}

function getFirstCheckboxByName(element_name) {
	let elements = document.getElementsByName(element_name);
	if (elements.length) {
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].type == 'checkbox') {
				return elements[i];
			}
		}
		return null;
	} else {
		return null;
	}
}

function getFirstRadioByName(element_name) {
	let elements = document.getElementsByName(element_name);
	if (elements.length) {
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].type == 'radio') {
				return elements[i];
			}
		}
		return null;
	} else {
		return null;
	}
}

function getSecondRadioByName(element_name) {
	let elements = document.getElementsByName(element_name);
	console.log("second element name", element_name);
	if (elements.length) {
		let skipped = false;
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].type == 'radio') {
				if (skipped) {
					return elements[i];
				} else {
					skipped = true;
				}
			}
		}
		return null;
	} else {
		return null;
	}
}

