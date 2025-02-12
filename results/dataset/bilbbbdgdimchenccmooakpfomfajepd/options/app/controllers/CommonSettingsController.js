app.controller("CommonSettingsController", ['$scope', 'Notifier', '$timeout', '$location', function($scope, Notifier, $timeout, $location) {

    // Define options structure
    $scope.sections = settingsSectionsModule.data;

    ChromeStorageModule.fetchUserSettings(function(userSettingsSynced) {

        $scope.userMaxHr = parseInt(userSettingsSynced.userMaxHr);
        $scope.userRestHr = parseInt(userSettingsSynced.userRestHr);
        $scope.userFTP = parseInt(userSettingsSynced.userFTP);

        _.each($scope.sections, function(section) {

            _.each(section.sectionContent, function(option) {

                if (option.optionType === 'checkbox') {
                    option.active = userSettingsSynced[option.optionKey];

                    if (option.optionEnableSub) {
                        $scope.displaySubOption(option.optionEnableSub, userSettingsSynced[option.optionKey]);
                    }

                } else if (option.optionType === 'list') {
                	//if (option.optionKey == "customMapboxStyle" ) userSettings.customMapboxStyle = window.prompt("User Mapbox Style",userSettings.customMapboxStyle);
                    option.active = _.findWhere(option.optionList, {
                        key: userSettingsSynced[option.optionKey]
                    });
                }
            });
        });

        $scope.$apply();
    });

    $scope.toggleCheckOption = function(option) {

        var bool = option.active;

        ChromeStorageModule.updateUserSetting(option.optionKey, bool, function() {
            console.log(option.optionKey + ' has been updated to ' + bool);
        });

        // Enable/disable sub option if needed
        if (option.optionEnableSub) {
            // Replace this to find option object from option.optionEnableSub
            $scope.displaySubOption(option.optionEnableSub, option.active);
        }
    };

    $scope.displaySubOption = function(subOptionKey, show) {
        _.each($scope.sections, function(section) {
            var optionFound = _.findWhere(section.sectionContent, {
                optionKey: subOptionKey
            });
            if (optionFound) {
                optionFound.hidden = !show;
            }
        });
    };

    $scope.toggleSelectOption = function(option) {
       	if (option.optionKey == "customMapboxStyle" && option.active.name == 'custom') option.active.key = window.prompt("Custom Mapbox Style",option.active.key);
        ChromeStorageModule.updateUserSetting(option.optionKey, option.active.key, function() {
            console.log(option.optionKey + ' has been updated to ' + option.active.key + ' (' + option.active.name + ')' );
            
        });
    };

    $scope.displayOptionHelper = function(optionKeyParam) {

        var option = null;

        _.each($scope.sections, function(section) {

            var optionSearch = _.findWhere(section.sectionContent, {
                optionKey: optionKeyParam
            });

            if (optionSearch) {
                option = optionSearch;
                return;
            }
        });

        if (option) {
            Notifier(option.optionTitle, option.optionHtml);
        }
    }

    // Trigger auto click on activity page extended data click
    var viewOptionHelperId = $location.search().viewOptionHelperId;

    if (!_.isUndefined(viewOptionHelperId)) {
        $scope.displayOptionHelper(viewOptionHelperId);
    }

}]);
