var jas = require('jasmine-node');
var nerve = require('../nerve.min.js');

describe("Test off functionality", function () {

	describe("Test for OFF with channel only", function () {
		var testVariable;

		beforeEach(function (done) {

			nerve.on({
				channel: 'test-channel-off',
				callback: function () {
					testVariable = true;
					done();
				}
			});

			setTimeout(function () {
				nerve.off({
					channel: 'test-channel-off'
				});
			}, 30);

			setTimeout(function () {
				nerve.send({
					channel: 'test-channel-off'
				});
			}, 100);

			setTimeout(function () {
				testVariable = 'function removed';
				done();
			}, 150);
		});

		it("Channel was removed", function () {
			expect(testVariable).toEqual('function removed');
		});
	});



	describe("Test for OFF with channel and route", function () {
		var testVariable,
				testVariable_additional;

		beforeEach(function (done) {

			nerve.on({
				channel: 'test-channel-route-off',
				route: 'route-off',
				callback: function () {
					testVariable = true;
					done();
				}
			});

			nerve.on({
				channel: 'test-channel-route-off',
				route: 'route-on',
				callback: function () {
					testVariable_additional = true;
				}
			});

			setTimeout(function () {
				nerve.off({
					channel: 'test-channel-route-off',
					route: 'route-off'
				});
			}, 30);

			setTimeout(function () {
				nerve.send({
					channel: 'test-channel-route-off',
					route: 'route-off'
				});
				nerve.send({
					channel: 'test-channel-route-off',
					route: 'route-on'
				});
			}, 100);

			setTimeout(function () {
				testVariable = 'function removed';
				done();
			}, 150);
		});

		it("Route was removed", function () {
			expect(testVariable).toEqual('function removed');
			expect(testVariable_additional).toEqual(true);
		});
	});



	describe("Test for OFF with specific scope (1)", function () {
		var testVariable,
				testVariable1,
				_scope = {};

		beforeEach(function (done) {

			nerve.on({
				channel: 'test-scope-off',
				callback: function () {
					testVariable = true;
				},
				scope: _scope
			});
			nerve.on({
				channel: 'test-scope-off',
				callback: function () {
					testVariable1 = true;
				},
				scope: _scope
			});

			setTimeout(function () {
				nerve.off({
					channel: 'test-scope-off',
					scope: {}
				});
			}, 30);

			setTimeout(function () {
				nerve.send({
					channel: 'test-scope-off'
				});
			}, 100);

			setTimeout(function () {
				done();
			}, 150);

		});

		it("Channel wasn't removed case scope is different", function () {
			expect(testVariable).toEqual(true);
			expect(testVariable1).toEqual(true);
		});
	});

	describe("Test for OFF with specific scope (2)", function () {
		var testVariable,
				testVariable1,
				_scope = {};

		beforeEach(function (done) {

			nerve.on({
				channel: 'test-scope-off-remove',
				callback: function () {
					testVariable = true;
				},
				scope: _scope
			});


			nerve.on({
				channel: 'test-scope-off-remove',
				callback: function () {
					testVariable1 = true;
				},
				scope: {}
			});

			setTimeout(function () {
				nerve.off({
					channel: 'test-scope-off-remove',
					scope: _scope
				});
			}, 30);

			setTimeout(function () {
				nerve.send({
					channel: 'test-scope-off-remove'
				});
			}, 100);

			setTimeout(function () {
				done();
			}, 150);

		});

		it("Channel was removed by scope", function () {
			expect(testVariable).toBeUndefined() // removed listener / variable undefined;
			expect(testVariable1).toEqual(true) // listener called / variable set;
		});
	});

	describe("Test for OFF when only channel is specified (3)", function () {
		var testVariable,
				testVariable1,
				testVariable2,
				_scope = {};

		beforeEach(function (done) {

			nerve.on({
				channel: 'test-scope-off',
				callback: function () {
					testVariable = true;
				},
				scope: _scope
			});
			nerve.on({
				channel: 'test-scope-off',
				route: "test-route",
				callback: function () {
					testVariable1 = true;
				},
				scope: _scope
			});
			nerve.on({
				channel: 'test-scope-on',
				callback: function () {
					testVariable2 = true;
				},
				scope: _scope
			});

			setTimeout(function () {
				nerve.off({
					channel: 'test-scope-off'
				});
			}, 30);


			setTimeout(function () {
				nerve.send({
					channel: 'test-scope-off'
				});
				nerve.send({
					channel: 'test-scope-on'
				});
			}, 100);

			setTimeout(function () {
				done();
			}, 150);
		});

		it("Channel was removed when only channel was specified.", function () {
			expect(testVariable).toBeUndefined();
			expect(testVariable1).toBeUndefined();
			expect(testVariable2).toEqual(true) // channel that received event;
		});
	});

	describe("Test for OFF when only scope is specified (4)", function () {
		var testVariable,
				testVariable1,
				testVariable2,
				testVariable3,
				_scope = {};

		beforeEach(function (done) {

			nerve.on({
				channel: 'test-scope-off',
				callback: function () {
					testVariable = true;
				},
				scope: _scope
			});

			nerve.on({
				channel: 'test-scope-on',
				callback: function () {
					testVariable1 = true;
				},
				scope: _scope
			});

			nerve.on({
				channel: 'test-scope-on',
				route: 'my-test-route',
				callback: function () {
					testVariable2 = true;
				},
				scope: _scope
			});

			nerve.on({
				channel: 'test-scope-on',
				route: 'my-test-route',
				callback: function () {
					testVariable3 = true;
				},
				scope: {}
			});

			setTimeout(function () {
				nerve.off({
					scope: _scope
				});
			}, 30);

			setTimeout(function () {
				nerve.send({
					channel: 'test-scope-off'
				});
				nerve.send({
					channel: 'test-scope-on',
					route: 'my-test-route'
				});
			}, 100);

			setTimeout(function () {
				done();
			}, 150);
		});

		it("Channel was removed when only scope was specified.", function () {
			expect(testVariable).toBeUndefined();
			expect(testVariable1).toBeUndefined();
			expect(testVariable2).toBeUndefined();
			expect(testVariable3).toEqual(true) // channel that received event;
		});
	});

	describe("Test for OFF when only route is specified (5)", function () {
		var testVariable,
				testVariable1,
				testVariable2,
				_scope = {};

		beforeEach(function (done) {

			nerve.on({
				channel: 'test-scope-off',
				route: 'my-test-route',
				callback: function () {
					testVariable = true;
				},
				scope: _scope
			});
			nerve.on({
				channel: 'test-scope-on',
				route: 'my-test-route',
				callback: function () {
					testVariable1 = true;
				},
				scope: {}
			});
			nerve.on({
				channel: 'test-scope-off',
				route: 'my-test-route-2',
				callback: function () {
					testVariable2 = true;
				},
				scope: _scope
			});

			setTimeout(function () {
				nerve.off({
					route: 'my-test-route'
				});
			}, 30);

			setTimeout(function () {
				nerve.send({
					channel: 'test-scope-off',
					route: 'my-test-route'
				});
				nerve.send({
					channel: 'test-scope-off',
					route: 'my-test-route-2'
				});
				nerve.send({
					channel: 'test-scope-on',
					route: 'my-test-route'
				});
			}, 100);

			setTimeout(function () {
				done();
			}, 150);
		});

		it("Channel was removed from root route when no parameters was specified.", function () {
			expect(testVariable).toBeUndefined();
			expect(testVariable1).toBeUndefined();
			expect(testVariable2).toEqual(true) // channel that received event;
		});
	});

	describe("Test for OFF when channel and route are specified (6)", function () {
		var testVariable,
				testVariable1,
				testVariable2,
				_scope = {};

		beforeEach(function (done) {

			nerve.on({
				channel: 'test-scope-off',
				route: 'my-test-route',
				callback: function () {
					testVariable = true;
				},
				scope: _scope
			});
			nerve.on({
				channel: 'test-scope-on',
				route: 'my-test-route',
				callback: function () {
					testVariable1 = true;
				},
				scope: {}
			});
			nerve.on({
				channel: 'test-scope-off',
				route: 'my-test-route-2',
				callback: function () {
					testVariable2 = true;
				},
				scope: {}
			});

			setTimeout(function () {
				nerve.off({
					channel: 'test-scope-off',
					scope: _scope
				});
			}, 30);

			setTimeout(function () {
				nerve.send({
					channel: 'test-scope-off',
					route: 'my-test-route'
				});
				nerve.send({
					channel: 'test-scope-off',
					route: 'my-test-route-2'
				});
				nerve.send({
					channel: 'test-scope-on',
					route: 'my-test-route'
				});
			}, 100);

			setTimeout(function () {
				done();
			}, 150);
		});

		it("Should remove channel that matches passed channel and route properties.", function () {
			expect(testVariable).toBeUndefined();
			expect(testVariable1).toEqual(true) // channel that received event;
			expect(testVariable2).toEqual(true) // channel that received event;
		});
	});

	describe("Test for OFF when route and scope are specified (7)", function () {
		var testVariable,
				testVariable1,
				testVariable2,
				_scope = {};

		beforeEach(function (done) {

			nerve.on({
				channel: 'test-scope-off',
				route: 'my-test-route',
				callback: function () {
					testVariable = true;
				},
				scope: _scope
			});
			nerve.on({
				channel: 'test-scope-on',
				route: 'my-test-route',
				callback: function () {
					testVariable1 = true;
				},
				scope: _scope
			});
			nerve.on({
				channel: 'test-scope-off',
				route: 'my-test-route',
				callback: function () {
					testVariable2 = true;
				},
				scope: {}
			});

			setTimeout(function () {
				nerve.off({
					route: 'my-test-route',
					scope: _scope
				});
			}, 30);

			setTimeout(function () {
				nerve.send({
					channel: 'test-scope-off',
					route: 'my-test-route'
				});
				nerve.send({
					channel: 'test-scope-off',
					route: 'my-test-route-2'
				});
				nerve.send({
					channel: 'test-scope-on',
					route: 'my-test-route'
				});
			}, 100);

			setTimeout(function () {
				done();
			}, 150);
		});

		it("Channel was removed when route and channel was specified.", function () {
			expect(testVariable).toBeUndefined();
			expect(testVariable1).toBeUndefined();
			expect(testVariable2).toEqual(true) // channel that received event;
		});
	});

	describe("Test for OFF when channel and route are specified (8)", function () {
		var testVariable,
				testVariable1,
				testVariable2,
				_scope = {};

		beforeEach(function (done) {

			nerve.on({
				channel: 'test-scope-off',
				route: 'my-test-route',
				callback: function () {
					testVariable = true;
				},
				scope: {}
			});
			nerve.on({
				channel: 'test-scope-on',
				route: 'my-test-route',
				callback: function () {
					testVariable1 = true;
				},
				scope: _scope
			});
			nerve.on({
				channel: 'test-scope-off',
				route: 'my-test-route',
				callback: function () {
					testVariable2 = true;
				},
				scope: {}
			});

			setTimeout(function () {
				nerve.off({
					channel: 'test-scope-off',
					route: 'my-test-route'
				});
			}, 30);

			setTimeout(function () {
				nerve.send({
					channel: 'test-scope-off',
					route: 'my-test-route'
				});
				nerve.send({
					channel: 'test-scope-off',
					route: 'my-test-route-2'
				});
				nerve.send({
					channel: 'test-scope-on',
					route: 'my-test-route'
				});
			}, 100);

			setTimeout(function () {
				done();
			}, 150);
		});

		it("Channel was removed when route and channel was specified.", function () {
			expect(testVariable).toBeUndefined();
			expect(testVariable1).toEqual(true) // channel that received event;
			expect(testVariable2).toBeUndefined();
		});
	});

});

