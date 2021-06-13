const config = require('./../config.json');

/**
 * check if given port is allowed (whitelisted).  
 * always return true if port whitelisting is disabled.  
 * 
 * @param {Number} port Targeted port
 * @returns true if port is allowed
 */
function isPortAllowed(port) {
	if (!config.config.port_whitelisting) return true;

	for (let item of config.config.port_whitelist) {
		if (port === item) {
			return true;
		}
	}
	return false;
}


module.exports = {
	isPortAllowed: isPortAllowed
}