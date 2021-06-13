'use strict';

const socks = require('simple-socks');
const logAccess = require('log4js').getLogger('access');
const log = require('log4js').getLogger();
const config = require('./../config.json');
const utils = require('./utils');

const server = socks.createServer({
	connectionFilter: function (destination, origin, callback) {
		logAccess.debug(`${origin.address}:${origin.port} → ${destination.address}:${destination.port}`)

		if (!utils.isPortAllowed(destination.port)) {
			return setImmediate(callback, new Error(`Port ${destination.port} is not whitelisted.`));
		}


		return setImmediate(callback);

	}
});

server.on('listening', () => {
	log.info(`Socks proxy is listening on ${server.address().address}:${server.address().port}`);
});

server.on('proxyConnect', (info, destination) => {
	logAccess.debug('connected to remote server at %s:%d', info.address, info.port);
});

server.on('proxyError', (err) => {
	log.debug(err);
});

server.listen(config.config.socks.port, config.config.socks.interface);
