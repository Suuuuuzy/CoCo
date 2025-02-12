app.controller("XtdZonesSettingsController", function($scope) {
    
    // List of Xtended data to be customize
    $scope.xtdListOptions = [{
        name: 'Cycling Speed',
        value: 'speed',
        units: 'KPH',
        step: 1,
        min: 0,
        max: 999
    }, {
        name: 'Running Pace',
        value: 'pace',
        units: 'Seconds', // s/mi?!
        step: 5,
        min: 0,
        max: 3599
    }, {
        name: 'Cycling Power',
        value: 'power',
        units: 'Watts',
        step: 10,
        min: 0,
        max: 9999
    }, {
        name: 'Cycling Cadence',
        value: 'cyclingCadence',
        units: 'RPM',
        step: 1,
        min: 0,
        max: 999
    }, {
        name: 'Running Cadence',
        value: 'runningCadence',
        units: 'SPM',
        step: 1,
        min: 0,
        max: 999
    }, {
        name: 'Grade',
        value: 'grade',
        units: '%',
        step: 1,
        min: -100,
        max: 100
    }, {
        name: 'Elevation',
        value: 'elevation',
        units: 'm',
        step: 10,
        min: 0,
        max: 9999
    }, {
        name: 'Ascent speed',
        value: 'ascent',
        units: 'Vm/h',
        step: 5,
        min: 0,
        max: 9999
    }];

    ChromeStorageModule.fetchUserSettings(function(userSettingsSynced) {

        $scope.zones = userSettingsSynced.zones;
        // Select cycling speed by default
        // $scope.switchZonesFromXtdItem(_.first($scope.xtdListOptions));

    }.bind(this));

    $scope.switchZonesFromXtdItem = function(xtdData) {

        // Select cycling speed by default
        $scope.xtdData = xtdData;
        $scope.xtdZones = $scope.zones[xtdData.value];
    };

    $scope.toggleSelectOption = function(listItem) {
        // Load source on toggle option
        // And inject
        // Mocking xtd source
        $scope.switchZonesFromXtdItem(listItem);
    };
});
