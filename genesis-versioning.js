var path = require('path');
// var wrench = require('wrench');
var _ = require('lodash');
// var fs = require('fs-extended');
require('sugar');



var me = function () { };
module.exports = me;


me.preLoad = function (alloyConfig, alloyLogger, config) {
    
    updateVersionNumber(alloyConfig, alloyLogger, config);
}


me.preCompile = function (alloyConfig, alloyLogger, config) {


}


me.postCompile = function(alloyConfig, alloyLogger, config) {
 
}



function updateVersionNumber(alloyConfig, alloyLogger, config) {

    alloyLogger.trace('********************* STARTING updateVersionNumber ***************************');
    var tiapp_path = path.join(alloyConfig.dir.project, 'tiapp.xml');
	alloyLogger.trace('tiapp.xml path:  ' + tiapp_path);
    var tiapp = require('tiapp.xml').load(tiapp_path);
    var stamp = Math.round((new Date()).getTime() / 1000.0);

	var releaseDate = tiapp.getProperty('releaseDate');
    var daysSinceRelease = Date.create().daysSince(releaseDate);
	alloyLogger.debug("releaseDate=" + releaseDate);
	alloyLogger.debug("daysSinceRelease=" + daysSinceRelease);

    var versions = tiapp.version.split('.');

    var buildNumber = _.parseInt(versions[2] || 0) || 0;
    //buildNumber++;

    
    var revisionNumber = _.parseInt(versions[3] || 0) || 0;
    revisionNumber++;

    //versions[3] = stamp.toString();

    
	versions[3] = ( versions[2] === daysSinceRelease.toString() ) ? revisionNumber.toString() : 0;
    versions[2] = daysSinceRelease.toString();

    tiapp.version = versions.join('.');
    tiapp.write();

    alloyLogger.trace('********************* FINISHED updateVersionNumber ***************************');
}

