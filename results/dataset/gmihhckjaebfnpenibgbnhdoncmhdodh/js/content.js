var ksCurrency = {
  settings: {},
  formatNumber: function (val) {
    return {
      int: parseInt(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      dec: parseInt(val % 1 * 100)
    };
  },
  getProjectCurrency: function () {
    if (window.current_project && window.current_project.data && window.current_project.data.currency) {
      return window.current_project.data.currency;
    }
    var $elem = $(".money.project_currency_code");
    if ($elem.length > 0) {
      return $elem.attr("class").replace("money", "").replace("project_currency_code", "").trim().toUpperCase();
    }
    return null;
  },
  applyExchange: function (defaultCurrency) {
    $(".money").each(function () {
      try {
        var val = parseFloat($(this).text().replace(",", "").trim().match(/\d+/)[0]);
        var converted = val / ksCurrency.settings.rates[defaultCurrency];
        var formatted = ksCurrency.formatNumber(converted);
        console.log(defaultCurrency + " " + val + " -> " + ksCurrency.settings.base + " " + formatted.int + "dot" + formatted.dec + " (" + converted + ")");

        $(this).find(".ksCurrency-money").remove();
        $(this).append(
          "<div class='ksCurrency-money'>" +
          "<span class='ksCurrency-currency'>" +
          ksCurrency.settings.base +
          "</span>" +
          "<span class='ksCurrency-value'>" +
          formatted.int +
          "<span class='ksCurrency-decimal'>" +
          formatted.dec +
          "</span>" +
          "</span>" +
          "<span class='ksCurrency-date'>" +
          ksCurrency.settings.date +
          "</span>" +
          "</div>");

      } catch (err) {
        console.log("failed while processing " + $(this).text());
      }
    });
  },
  initialize: function () {
    console.log("initializing ksCurrency")
    window.addEventListener("message", function (event) {
      if (event.data.ksCurrency && event.data.type) {
        if (event.data.type == "update") {
          ksCurrency.settings = event.data.settings;
          console.log("loaded ksCurrency");

          var projectCurrency = ksCurrency.getProjectCurrency();
          if (ksCurrency.settings.rates[projectCurrency]) {
            ksCurrency.applyExchange(projectCurrency);
          } else {
            console.log("cannot find currency on page or is uknown " + projectCurrency);
          }
        }
      }
    }, false);
    window.postMessage({
      type: "get",
      ksCurrency: true
    }, "*");
  }
};
ksCurrency.initialize();