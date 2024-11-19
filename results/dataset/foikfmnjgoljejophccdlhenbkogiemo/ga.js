var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-144707660-4']);
_gaq.push(['_setCustomVar',1,'Version',chrome.runtime.getManifest().version]);
_gaq.push(['_trackPageview']);
console.log(_gaq);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
