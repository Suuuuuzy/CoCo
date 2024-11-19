$(document).ready(function () {
    $("a").click(function () {
        chrome.tabs.create({ active: true, url: $(this).attr("href") });
    });

    fillDdlFromRates = function (rates) {
        var currencies = Object.keys(rates.rates).concat(rates.base);
        currencies.sort();

        $("#ddlCurrency").append(currencies.map(function (currency) {
            return $("<option name='rates' value='" + currency + "'" + (rates.base == currency ? "selected='selected'" : "") + ">" + currency + "</option>")
        }));
        $("#ddlCurrency").prop("disabled", false);
        $("#ddlCurrency").change(function () {
            $("#ddlCurrency").prop("disabled", true);
            var currency = $(this).val();
            fetchRates(currency,function(){
                $("#ddlCurrency").prop("disabled", false);
            });
        });
    }
    fetchRates = function (base, callback) {
        $.ajax({
            url: "https://api.fixer.io/latest?base=" + base,
            success: function (response) {
                chrome.storage.sync.set({ 'rates': response }, function () {
                    callback(response);
                });
            }
        });
    }

    chrome.storage.sync.get(null, function (settings) {
        if (settings.rates) {
            fillDdlFromRates(settings.rates, settings.base);
        } else {
            fetchRates((settings.rates ? settings.rates.base : 'USD'), function (response) {
                fillDdlFromRates(response, response.base);
            });
        }
    });
});