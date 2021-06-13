'use strict';
const cluster = require('cluster');
const process = require('process');
const log4js = require('log4js');
const config = require('./config.json');

//config logging
log4js.configure({
	appenders: {
		main: {
			type: 'file',
			filename: 'logs/main.log'
		},
		access: {
			type: 'file',
			filename: 'logs/access.log'
		},
		console: {
			type: 'console'
		}
	},
	categories: {
		default: {
			appenders: ['main', 'console'],
			level: 'debug'
		},
		access: {
			appenders: ['access', 'console'],
			level: 'debug'
		}
	}
});

const log = log4js.getLogger();

function master() {
	for (let i = 0; i < config.workers.length; i++) {
		const w = cluster.fork();
		w.on('error', (err) => {
			log.error(`Unhandled error on worker: id=${w.id}`);
			log.error(err);
		});
	}
}

function worker() {
	//TODO:maybe be better to align, so everybody have something to do
	const workerConf = config.workers[--cluster.worker.id];
	log.debug(`Worker ${cluster.worker.id} is up; handling ${workerConf.type}`);

	switch (workerConf.type) {
		case 'socks': {
			require('./src/socks');
			break;
		}
		default: {
			log.error(`Unknown job type: ${workerConf.type}`);
		}
	}

}

if (cluster.isMaster) {
	master();
} else {
	worker();
}
