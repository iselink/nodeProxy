# nodeProxy

Hi-end proxy server running under NodeJS.  


> This project is re-implementation of already existing private project from scratch.  
> Right now, it doing nothing more.

# Goals

- Connection logic based on destination.
	- [x] Port limiting
	- [ ] Domain based blocking.
	- [ ] Domain based blocking over specific DNS.
- Connection logic based on source.
	- [ ] Blocking based on client.
- Connection logic based on other parameters.
	- [ ] Blocking connection based on current time.
	- [ ] Blocking connection based on transfered data.
- [ ] Client authentication
- [ ] Caching

# Dependecies

Written with these awesome dependencies.

- [log4js](log4js-node/log4js-node) - Provide logging.
- [simple-socks](brozeph/simple-socks) - Lower-level socks5 implementation.

