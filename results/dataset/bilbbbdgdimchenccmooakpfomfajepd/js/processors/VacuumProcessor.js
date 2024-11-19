if (env.debugMode) console.info('Begin     VacuumProcessor.js');
/**
 *   Contructor
 */

function VacuumProcessor() {
}



VacuumProcessor.cachePrefix = 'StraTistiX_activityStream_';



/**
 * Define prototype
 */
VacuumProcessor.prototype = {





    /**
     *  Get the strava athlete id connected
     *  @returns the strava athlete id
     */
    getAthleteId: function getAthleteId() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
        var athleteId = null;
        try {
            if (!_.isUndefined(currentAthlete) && !_.isUndefined(currentAthlete.id)) {
                athleteId = currentAthlete.id;
            }
        } catch (err) {
if (env.debugMode) console.info(err);
        }

        return athleteId;
    },



    /**
     *  Get the strava athlete name connected
     *  @returns the strava athlete id
     */
    getAthleteName: function getAthleteName() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
        var athleteName = null;
        try {
            if (!_.isUndefined(currentAthlete) && !_.isUndefined(currentAthlete.get('display_name'))) {
                athleteName = currentAthlete.get('display_name');
            }
        } catch (err) {
if (env.debugMode) console.info(err);
        }

        return athleteName;
    },



    /**
     *  Get the strava athlete id connected
     *  @returns the strava athlete id
     */
    getAthleteIdAuthorOfActivity: function getAthleteIdAuthorOfActivity() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

        if (_.isUndefined(window.pageView)) {
            return null;
        }

        if (!window.pageView.activityAthlete()) {
            return null;
        }

        if (_.isUndefined(window.pageView.activityAthlete().get('id'))) {
            return null;
        }

        return window.pageView.activityAthlete().get('id');
    },



    /**
     *  Get the strava athlete premium status
     *  @returns premium status
     */
    getPremiumStatus: function getPremiumStatus() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

        var premiumStatus = null;
        try {
            if (!_.isUndefined(currentAthlete)) {
                premiumStatus = currentAthlete.attributes.premium;
            }
        } catch (err) {
if (env.debugMode) console.info(err);
        }

        return premiumStatus;
    },



    /**
     *  Get the strava athlete pro status
     *  @returns the strava pro athlete id
     */
    getProStatus: function getProStatus() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

        var proStatus = null;

        try {

            if (!_.isUndefined(currentAthlete)) {

                if (!_.isUndefined(currentAthlete.attributes.pro)) {

                    proStatus = currentAthlete.attributes.pro;

                } else {
                    return null;
                }

            }
        } catch (err) {
if (env.debugMode) console.info(err);
        }

        return proStatus;
    },



    /**
     *  ...
     *  @returns ActivityId
     */
    getActivityId: function getActivityId() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
        return (_.isUndefined(window.pageView)) ? null : pageView.activity().id;
    },



    /**
     *  ...
     *  @returns ActivityName
     */
    getActivityName: function getActivityName() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

        var actStatsContainer = $(".activity-summary-container");

        // Get Activity Name
// without var -> global scope (window.activityName)
        activityName = actStatsContainer.find('.marginless.activity-name').text();
        return activityName;
    },



    /**
     *  ...
     *  @returns ActivityTime
     */
    getActivityTime: function getActivityTime() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

        var actStatsContainer = $(".activity-summary-container");

        // Get Activity Time
// without var -> global scope (window.activityTime)
        activityTime = actStatsContainer.find('time').text();
        return activityTime;
    },



    /**
     *  ...
     *  @returns ActivityType and ActivitySubType
     */
    getActivityType: function getActivityType() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

		// get activity main type
        activityType = pageView.activity().get('type');

		// get activity sub type
		var tmp=$(".title:contains('"+window.pageView.activityAthlete().attributes.display_name+"')").text().split(String.fromCharCode(10)+String.fromCharCode(8211)+String.fromCharCode(10));
		activitySubType = tmp[tmp.length-1].slice(0, -1);

		return {
        	type: 		activityType,
        	subtype: 	activitySubType
    	};
    },










    /**
     *  ...
     *  @returns AthleteWeight
     */
    getAthleteWeight: function getAthleteWeight() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
        return (_.isUndefined(window.pageView)) ? null : pageView.activityAthleteWeight();
    },










    /**
     * @returns Common activity stats given by Strava throught right panel
     */
    getActivityCommonStats: function getActivityStats() {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

        var actStatsContainer = $(".activity-summary-container");



        // Get Distance
// without var -> global scope (window.distance)
        distance = this.formatActivityDataValue_(
            actStatsContainer.find('.inline-stats.section').children().first().text(),
            false, false, true, false);



// Elapsed and Moving time


        // Get Moving Time
        movingTime = this.formatActivityDataValue_(
            actStatsContainer.find('.inline-stats.section').children().first().next().text(),
            true, false, false, false);

        // Get Elapsed Time
        elapsedTime = this.formatActivityDataValue_(
            $('[data-glossary-term*=definition-elapsed-time]').parent().parent().children().last().text(),
            true, false, false, false);

        // Try to get it another way. (Running races)
        if (!elapsedTime) {
            elapsedTime = this.formatActivityDataValue_(
                $('.section.more-stats').children().last().text(),
                true, false, false, false);
        }

        // Invert movingTime and elapsedTime. Theses values seems to be inverted in running races (https://www.strava.com/activities/391338398)
        if (elapsedTime - movingTime < 0) {
            var elapsedTimeCopy = elapsedTime;
            elapsedTime = movingTime;
            movingTime = elapsedTimeCopy;
        }


        // Get Elevation
		switch (window.activityType) {
      case 'Ride':
        var elevation = this.formatActivityDataValue_(
            actStatsContainer.find('.inline-stats.section').children().first().next().next().text(),
            false, true, false, false);
				break;
    	case 'Run':
     		var elevation = this.formatActivityDataValue_(
          	$('[class*="section more-stats"]').children().children().first().next().text(),
            false, false, false, false);
        break;
      default:
        break;
			}



        // Get Estimated Average Power
        var avgPower = this.formatActivityDataValue_(
            $('[data-glossary-term*=definition-average-power]').parent().parent().children().first().text(),
            false, false, false, false);

        var weightedPower = this.formatActivityDataValue_(
            $('[data-glossary-term*=definition-weighted-average-power]').parent().parent().children().first().text(),
            false, false, false, false);

        

        // Get Calories
		switch (window.activityType) {
      case 'Ride':
     		var calories = this.formatActivityDataValue_(
            actStatsContainer.find('.section.more-stats').find('.unstyled').children().first().next().next().children().first().next().next().children().first().next().text(),
        false, false, false, false);
				break;
    	case 'Run':
     		var calories = this.formatActivityDataValue_(
          	$('[class*="section more-stats"]').children().children().first().next().next().next().text(),
            false, false, false, false);
        break;
      default:
        break;
			}



        // Get Energy Output
        var energyOutput = this.formatActivityDataValue_(
            actStatsContainer.find('.inline-stats.section.secondary-stats').children().first().next().children().first().text(),
            false, false, false, true);



        // Get Average speed
		switch (window.activityType) {
      case 'Ride':
// without var -> global scope (window.averageSpeed)		// TODO preveri pravilnost!
        averageSpeed = this.formatActivityDataValue_(
            actStatsContainer.find('.section.more-stats').find('.unstyled').children().first().next().children().first().children().first().next().text(),
            false, false, false, false);
				break;
    	case 'Run':
        break;
      default:
        break;
			}

        if (typeof averageSpeed === 'undefined') {
if (env.debugMode) console.debug("Can't get average speed... tryin' to get pace");
            averageSpeed = this.formatActivityDataValue_(			// If no average speed availabe, try to get pace instead and transform to speed
                $('[class*="inline-stats section"]').children().first().next().next().children().text()
//                $('[data-glossary-term*=definition-moving-time]').parent().parent().first().next().children().text()
                , true, false, false, false);
        		if (averageSpeed) {
            		averageSpeed = 1 / averageSpeed; // invert to km per seconds
            		averageSpeed = averageSpeed * 60 * 60; // We are in KPH here
        		}
				}

            var measurementPreference = currentAthlete.get('measurement_preference');
            var speedFactor = (measurementPreference == 'meters') ? 1 : 0.62137;
            averageSpeed = averageSpeed / speedFactor; // Always give PKH here


        // Get Average and Max Heartrate			*** done in ActivityProcesor.js


        // Create activityData Map ( ActivityStatsMap )
        return {
            'distance': distance,
            'movingTime': movingTime,
            'elevation': elevation,
            'avgPower': avgPower,
            'weightedPower': weightedPower,
            'energyOutput': energyOutput,
            'calories': calories,
            'elapsedTime': elapsedTime,
            'averageSpeed': averageSpeed
//            'averageHeartRate': averageHeartRate,	// calculated in ActivityProcessor.js
//            'maxHeartRate': maxHeartRate			// calculated in ActivityProcessor.js
//            'altitude_smooth': altitude_smooth,	// calculated in ActivityProcessor.js
        };
    },













    /**
     * @returns formated/cleaned activity data
     */
    formatActivityDataValue_: function formatActivityDataValue_(dataIn, parsingTime, parsingElevation, parsingDistance, parsingEnergy) {
env.debugMode>1   && console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );


        if (dataIn == "") {
            return null;
        }


        // Common clean
        var cleanData = dataIn.replace('/100mPace', '');  // remove /100mPace (for Swim Pace)
        cleanData = cleanData.replace('/', '');					// remove slash     (for Pace /km)
        cleanData = cleanData.replace(/\s/g, '').trim('string');
        cleanData = cleanData.replace(/[\n\r]/g, '');


				if (parsingDistance && (cleanData.indexOf("m") != -1)) {	// ce je m
        	if (cleanData.indexOf("km") == -1) { // ce ni km je m
	        	cleanData = cleanData.replace(/([a-z]|[A-Z])+/g, '').trim();
        		cleanData = cleanData.replace(',','');
        		cleanData = cleanData/1000; 	// change to km
        	}
				} else {
	        cleanData = cleanData.replace(/([a-z]|[A-Z])+/g, '').trim();
				}


        if (parsingTime) {
            // Remove text from date, format time to hh:mm:ss
            cleanData = Helper.HHMMSStoSeconds(cleanData);
        } else if (parsingElevation) {
            cleanData = cleanData.replace(' ', '').replace(',', '');
        } else if (parsingDistance) {
            if (typeof cleanData == 'string') cleanData = cleanData.replace(',', '.');
        } else if (parsingEnergy) {
            cleanData = cleanData.replace(',', '.').replace('.', '');
        } else {
            cleanData = cleanData.replace(',', '.');
        }
        return parseFloat(cleanData);
    },





	//------------------------------------------------------
    /**
     * @returns activity streams in callback
     */
    getActivityStream: function getActivityStream(callback) {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

if (env.debugMode) console.info('>>>(f: VacuumProcessor.js) >   Try to read  -Activity '+this.getActivityId()+' Streams-  from cache/sessionStorage (' + arguments.callee.toString().match(/function ([^\(]+)/)[1] + ')' )
      var cache = sessionStorage.getItem(VacuumProcessor.cachePrefix + this.getActivityId());
      if (cache) {
if (env.debugMode) console.info('...   Streams FOUND in cache - using cached Activity Streams   ...' );


            cache = JSON.parse(cache);
		if (typeof StravaStreams == "undefined") {	// don't reset the StravaStreams global variable from cache!
            StravaStreams=cache.stream;								// set StravaStreams from cache
        }
            callback( cache.activityCommonStats, cache.stream, cache.athleteWeight, cache.hasPowerMeter);
            return;
            

      } else {
if (env.debugMode) console.info('...   Streams NOT in cache - getting Activity Streams from Strava (async)   ...');


//        var url = "/activities/" + this.getActivityId() + "/streams?stream_types[]=watts_calc&stream_types[]=watts&stream_types[]=velocity_smooth&stream_types[]=time&stream_types[]=distance&stream_types[]=cadence&stream_types[]=heartrate&stream_types[]=grade_smooth&stream_types[]=altitude&stream_types[]=latlng";
        var url = "/activities/" + this.getActivityId() + "/streams";  // get all available streams for activity

        $.ajax(url).done( function ajax_done (jsonResponse) {

if (env.debugMode) console.info('...   ajax_done - got back Activity Streams from Strava (async)   ...');

            var hasPowerMeter = true;

            if (_.isEmpty(jsonResponse.watts)) {
                jsonResponse.watts = jsonResponse.watts_calc;
                hasPowerMeter = false;
            }

            try {
                // Save result to cache
if (env.debugMode) console.log('<<<(f: VacuumProcessor.js) >   Try to write  -Activity '+pageView.activityId()+' Streams-  to cache < ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

            globalActivityStreams	= jsonResponse;						// set globalActivityStreams
        	globalActivityStatsMap	= this.getActivityCommonStats();	// set globalActivityStatsMap

            	var result = {
                    activityCommonStats:	globalActivityStatsMap,
                    stream:				 	globalActivityStreams,
                    athleteWeight: 			this.getAthleteWeight(),
                    hasPowerMeter: 			hasPowerMeter
                };

            	var result1 = { // only for debug console.log
                    activityCommonStats: 	globalActivityStatsMap,
                    stream: 				"...Activity Streams...",
                    athleteWeight: 			this.getAthleteWeight(),
                    hasPowerMeter: 			hasPowerMeter
                };


			//
			// write streams to cache here
			//


                sessionStorage.setItem(VacuumProcessor.cachePrefix + this.getActivityId(), JSON.stringify(result));
if (env.debugMode) console.log("\nWritten Activity Common Stats and Streams to cache/sessionstorage: " + VacuumProcessor.cachePrefix + this.getActivityId() + "\n\n" + JSON.stringify(result1) + "\n\n");
				result=null; result1=null// Memory clean
            } catch (err) {
                console.warn(err);
                sessionStorage.clear();
            }


	StravaStreams = jsonResponse;	// store original Strava streams JSON response in a global variable


            callback( globalActivityStatsMap, globalActivityStreams, this.getAthleteWeight(), hasPowerMeter );
            jsonResponse = null; // Memory clean
        }.bind(this) ); // ajax
      }// if no cache
    },  //function getActivityStream
	//------------------------------------------------------





    /**
     * @returns Segments in callback
     */
    getSegmentsFromBounds: function getSegmentsFromBounds(vectorA, vectorB, callback) {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

        var segmentsUnify = {
            cycling: null,
            running: null
        };

        $.when(

            $.ajax({
                url: '/api/v3/segments/search',
                data: {
                    bounds: vectorA + ',' + vectorB,
                    min_cat: '0',
                    max_cat: '5',
                    activity_type: 'cycling'
                },
                type: 'GET',
                crossDomain: true, // enable this
                dataType: 'jsonp',
                success: function(xhrResponseText) {
                    segmentsUnify.cycling = xhrResponseText;
                },
                error: function(err) {
                    console.error(err);
                }
            }),

            $.ajax({
                url: '/api/v3/segments/search',
                data: {
                    bounds: vectorA + ',' + vectorB,
                    min_cat: '0',
                    max_cat: '5',
                    activity_type: 'running'
                },
                type: 'GET',
                crossDomain: true, // enable this
                dataType: 'jsonp',
                success: function(xhrResponseText) {
                    segmentsUnify.running = xhrResponseText;
                },
                error: function(err) {
                    console.error(err);
                }
            })

        ).then(function() {
            callback(segmentsUnify);
        });

    },



    /**
     * @returns Strava Segment Stream in callback
     */
    getSegmentStream: function getSegmentStream(segmentId, callback) {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

        $.ajax({
            url: '/stream/segments/' + segmentId,
            type: 'GET',
            success: function(xhrResponseText) {
                callback(xhrResponseText);
            },
            error: function(err) {
                console.error(err);
            }
        });
    },



    /**
     * @returns Array of bikes/odo in callback
     */
    getBikeOdoOfAthlete: function getBikeOdoOfAthlete(athleteId, callback) {
if (env.debugMode) console.log(' > (f: VacuumProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );

        if (_.isUndefined(window.pageView)) {
            callback(null);
            return;
        }

        if (pageView.activity().attributes.type != "Ride") {
            callback(null);
            return;
        }

        var url = location.protocol + "//www.strava.com/athletes/" + athleteId;

        $.ajax(url).always(function(data) {

            var bikeOdoArray = {};
            _.each($(data.responseText).find('div.gear>table>tbody>tr'), function(element) {
                var bikeName = $(element).find('td').first().text().trim();
                var bikeOdo = $(element).find('td').last().text().trim().replace(/\.[0-9]/,'');
                bikeOdoArray[btoa(unescape(encodeURIComponent(bikeName)))] = bikeOdo;
            });

            callback(bikeOdoArray);
        });
    },




/// copied here from ActivityProcessor.js
    /**
     *
     */
    smoothAltitude_: function smoothAltitude(activityStream, stravaElevation) {
if (env.debugMode) console.info(' > (f: ActivityProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
        var activityAltitudeArray = activityStream.altitude;
        var distanceArray = activityStream.distance;  // for smoothing by distance
//        var timeArray = activityStream.time;  // for smoothing by time

//        if (!activityStream.altitude) {
//            return null;
//        }

        var activityAltitudeArray = activityStream.altitude;
        var distanceArray = activityStream.distance;
        //  var timeArray = activityStream.time;  // for smoothing by time
        var velocityArray = activityStream.velocity_smooth;
        var smoothing;
        var altitudeArray;
        while (ActivityProcessor.smoothingH - ActivityProcessor.smoothingL >= 0.1) {    // max difference - defines how closely we should try to aproach Strava's elevation estimate
            smoothing = ActivityProcessor.smoothingL + (ActivityProcessor.smoothingH - ActivityProcessor.smoothingL) / 2;
            altitudeArray = this.lowPassDataSmoothing_(activityAltitudeArray, distanceArray, smoothing);    // smoothing by distance
//            altitudeArray = this.lowPassDataSmoothing_(activityAltitudeArray, timeArray, smoothing);  // smoothing by time
            var totalElevation = 0;
            for (var i = 0; i < altitudeArray.length; i++) { // Loop on samples
//                if (i > 0 && velocityArray[i] * 3.6 > ActivityProcessor.movingThresholdKph) {
                    var elevationDiff = altitudeArray[i] - altitudeArray[i - 1];
                    if (elevationDiff > 0) {
                        totalElevation += elevationDiff;
                    }
//                }
            }

if (env.debugMode) console.log("          ...Altitude smoothing factor:" + smoothing.toFixed(2) + "   Strava Elev.: " + stravaElevation + "   Smoothed: " + totalElevation.toFixed(2) );
            if (totalElevation < stravaElevation) { // might not always work as intended, as Strava elevation is too high estimate...
                ActivityProcessor.smoothingH = smoothing;
            } else {
                ActivityProcessor.smoothingL = smoothing;
            }
        }
        ActivityProcessor.smoothing = smoothing;
        return altitudeArray;
    },



    /**
     *
     */
    lowPassDataSmoothing_: function lowPassDataSmoothing_(data, distance, smoothing) {
if (env.debugMode) console.log(' > (f: ActivityProcessor.js) >   ' + arguments.callee.toString().match(/function ([^\(]+)/)[1] );
        // Below algorithm is applied in this method
        // http://phrogz.net/js/framerate-independent-low-pass-filter.html
        // value += (currentValue - value) / (smoothing / timeSinceLastSample);
        // it is adapted for stability - if (smoothing / timeSinceLastSample) is less then 1, set it to 1 -> no smoothing for that sample
        if (data && distance) {
            var smooth_factor = 0;
            var result = [];
            result[0] = data[0];
            for (i = 1, max = data.length; i < max; i++) {
                if (smoothing === 0) {
                    result[i] = data[i];
                } else {
                    smooth_factor = smoothing / (distance[i] - distance[i - 1]);
                    // only apply filter if smooth_factor > 1, else this leads to instability !!!
                    result[i] = result[i - 1] + (data[i] - result[i - 1]) / (smooth_factor > 1 ? smooth_factor : 1); // low limit smooth_factor to 1!!!
                    // result[i] = result[i - 1] + (data[i] - result[i - 1]) / ( smooth_factor ); // no stability check
                }
            }
            return result;
        }
    }







}; // prototype



if (env.debugMode) console.info('End       VacuumProcessor.js');
