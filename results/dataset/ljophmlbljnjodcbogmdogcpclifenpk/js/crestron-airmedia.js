const MDCTextField = mdc.textField.MDCTextField;
const mdcTextFieldFoundation = mdc.textField.MDCTextFieldFoundation;
const MDCFormField = mdc.formField.MDCFormField;
const MDCRadio = mdc.radio.MDCRadio;

const mdc_buttons = document.querySelectorAll('.mdc-button');
mdc_buttons.forEach(function (entry) {
    mdc.ripple.MDCRipple.attachTo(entry);
});

const endpoint_textfield = new MDCTextField(document.querySelector('.crestron-endpoint-text-field'));
const pincode_textfield = new MDCTextField(document.querySelector('.pincode'));

const is_locale_rtl = function (locale) {
    if (!locale) return false;
    const rtl_languages = ['ar', 'he'];
    locale = locale.toLowerCase();
    for (let i = 0; i < rtl_languages.length; i++) {
        if (locale === rtl_languages[i]) return true;
    }
    return false;
};

const is_current_locale_rtl = function() {
    return is_locale_rtl(chrome.i18n.getUILanguage());
};

const locale_direction = is_current_locale_rtl() ? 'rtl' : 'ltr';

const mdc_text_field_group = document.querySelectorAll('.crestron-endpoint-text-field-group');
mdc_text_field_group.forEach(function (entry) {
    entry.setAttribute("dir", locale_direction);
});

const page_connect_element = document.querySelector("#page_connect");

let refresh_layout_oneshot_id = 0;

const refresh_layout = function () {
    endpoint_textfield.layout();
    endpoint_textfield.focus();
};

const stop_refresh_layout_oneshot = function () {
    if (refresh_layout_oneshot_id > 0) {
        clearTimeout(refresh_layout_oneshot_id);
        refresh_layout_oneshot_id = 0;
    }
};

const start_refresh_layout_oneshot = function () {
    refresh_layout_oneshot_id = setTimeout(function () {
        refresh_layout();
        refresh_layout_oneshot_id = 0;
    }, 350);
};

if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.target === page_connect_element) {
                if (entry.isIntersecting) {
                    refresh_layout();
                    start_refresh_layout_oneshot();
                } else {
                    stop_refresh_layout_oneshot();
                }
            }
        });
    }, {
        root: document.querySelector("#main_page"),
        threshold: 1.0
    });
    observer.observe(page_connect_element);
}