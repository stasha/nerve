/** 
 * Nerve is lightweight javascript library for asynchronous broadcasts along routes and channels.
 * @source https://github.com/stasha/nerve
 * (original) https://github.com/artemdemo/nerve
 * (original) https://github.com/jstandish/nerve
 */
var nerve;
(function (nerve) {
	var routes = {};
	var defaultRoute = 'root';
	/**
	 * Listen to a given channel or listen to a channel and route combination
	 *
	 * @param paramObj {onParamObj}
	 * @example
	 * {
	 *     channel: 'some-channel',
	 *     route: 'route'
	 *     callback: function( context ) {
	 *          // some functionality
	 *     },
	 *     scope: this
	 * }
	 */
	function on(paramObj) {
		var caller = null;
		if (!paramObj.hasOwnProperty('channel') ||
				!paramObj.hasOwnProperty('callback') ||
				!isFunction(paramObj.callback))
			throw Error('A channel and a callback must be specified');
		if (!paramObj.hasOwnProperty('scope'))
			caller = null;
		else
			caller = paramObj.scope || null;
		// Create new route if there is no one
		if (!routes.hasOwnProperty(paramObj.channel))
			routes[paramObj.channel] = {};
		// If there is no route in paramObj - will create default one
		if (!paramObj.hasOwnProperty('route'))
			paramObj.route = defaultRoute;
		// If given paramObj.route not exists in main routes object - create one
		if (!routes[paramObj.channel].hasOwnProperty(paramObj.route))
			routes[paramObj.channel][paramObj.route] = [];
		// Check to make sure we aren't adding ourselves twice
		if (findSubscriber(caller, paramObj.callback, routes[paramObj.channel][paramObj.route]))
			return;
		routes[paramObj.channel][paramObj.route].push({
			caller: caller,
			callback: paramObj.callback
		});
	}
	nerve.on = on;
	/**
	 * Send message
	 *
	 * @param paramObj {sendParamObj}
	 * @example
	 * {
	 *     channel: 'some-channel',
	 *     route: 'route',
	 *     context: { someData: true }
	 * }
	 */
	function send(paramObj) {
		if (!paramObj.hasOwnProperty('channel'))
			throw Error('A channel must be specified');
		if (!paramObj.hasOwnProperty('route'))
			paramObj.route = defaultRoute;
		if (!routes.hasOwnProperty(paramObj.channel) || !routes[paramObj.channel].hasOwnProperty(paramObj.route)) {
			return;
		}
		if (!paramObj.hasOwnProperty('context'))
			paramObj.context = null;
		var listeners = routes[paramObj.channel][paramObj.route], i = 0, len = listeners.length;
		for (; i < len; i++) {
			(function (ch, rt, idx) {
				var ref = setTimeout(function () {
					try {
						routes[ch][rt][idx].callback.call(routes[ch][rt][idx].caller, paramObj.context);
						clearTimeout(ref);
					}
					catch (e) {
					}
				});
			})(paramObj.channel, paramObj.route, i);
		}
	}
	nerve.send = send;
	/**
	 * Remove listener
	 *
	 * @param paramObj {offParamObj}
	 * @example
	 * {
	 *     channel: 'some-channel',
	 * }
	 * @example
	 * {
	 *     channel: 'some-channel',
	 *     route: 'route',
	 * }
	 * @example
	 * {
	 *     channel: 'some-channel',
	 *     scope: this
	 * }
	 * @example
	 * {
	 *     route: 'route' 
	 * }
	 * @example
	 * {
	 *     scope: this
	 * }
	 * @example
	 * {
	 *     channel: 'some-channel',
	 *     route: 'route',
	 *     scope: this
	 * }
	 * 
	 *
	 */
	function off(paramObj) {
		var c = paramObj.channel;
		var r = paramObj.route;
		var s = paramObj.scope;

		if (c && !r && !s && routes[c]) {
			delete routes[c];
			return;
		}

		if (c && r && !s && routes[c] && routes[c].hasOwnProperty(r)) {
			delete routes[c][r];
			return;
		}

		if (c && r && s && routes[c] && routes[c].hasOwnProperty(r)) {
			remove(routes[c][r], s);
			return;
		}

		if (c && !r && s && routes[c]) {
			for (var m in routes[c]) {
				if (routes[c].hasOwnProperty(m)) {
					remove(routes[c][m], s);
				}
			}
			return;
		}

		if (!c && r && !s) {
			for (var c in routes) {
				if (routes[c].hasOwnProperty(r)) {
					delete routes[c][r];
				}
			}
			return;
		}

		if (!c && r && s) {
			for (var c in routes) {
				if (routes[c].hasOwnProperty(r)) {
					remove(routes[c][r], s);
				}
			}
			return;
		}

		if (!c && !r && s) {
			for (var n in routes) {
				c = routes[n];
				for (var r in c) {
					if (c.hasOwnProperty(r)) {
						remove(c[r], s);
					}
				}
			}
			return;
		}
	}
	nerve.off = off;

	/**
	 * Removes callback from route object
	 * 
	 * @param {type} r
	 * @param {type} scope
	 * @returns {undefined}
	 */
	function remove(r, scope) {
		var i = 0, len = r.length;
		for (; i < len; i++) {
			if (r[i] && r[i].caller === scope) {
				r.splice(i, 1);
				i--;
				continue;
			}
		}
	}

	/**
	 * Find function by it's scope in array of routs
	 *
	 * @param callReference - scope of the calling function
	 * @param array
	 * @returns {*}
	 */
	function findSubscriber(callReference, callback, array) {
		if (!array)
			return null;
		var i = 0, len = array.length;
		for (; i < len; i++) {
			console.log(array[i]);
			if (array[i].caller === callReference && array[i].callback === callback)
				return array[i];
		}
		return null;
	}
	/**
	 * Check whether given variable is function or not
	 * @param functionToCheck
	 * @returns {boolean}
	 */
	function isFunction(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}
	
	if(typeof module === "object"){
		module.exports = nerve;
	}
	
})(nerve || (nerve = {}));
/// <reference path="modules/nerveAppModule.ts" />
// Bootstrapping main app
//# sourceMappingURL=nerve.js.map