var jas  = require('jasmine-node');
var nerve = require('../nerve.min.js');

describe("Test off functionality", function(){

    describe("Test for OFF with channel only", function(){
        var testVariable;

        beforeEach(function(done) {

            nerve.on({
                channel: 'test-channel-off',
                callback: function() {
                    testVariable = true;
                    done();
                }
            });

            setTimeout(function(){
                nerve.off({
                    channel: 'test-channel-off'
                });
            }, 30);

            setTimeout(function(){
                nerve.send({
                    channel: 'test-channel-off'
                });
            }, 100);

            setTimeout(function(){
                testVariable = 'function removed';
                done();
            }, 150);
        });

        it("Channel was removed", function() {
            expect(testVariable).toEqual( 'function removed' );
        });
    });



    describe("Test for OFF with channel and route", function(){
        var testVariable,
            testVariable_additional;

        beforeEach(function(done) {

            nerve.on({
                channel: 'test-channel-route-off',
                route: 'route-off',
                callback: function() {
                    testVariable = true;
                    done();
                }
            });

            nerve.on({
                channel: 'test-channel-route-off',
                route: 'route-on',
                callback: function() {
                    testVariable_additional = true;
                }
            });

            setTimeout(function(){
                nerve.off({
                    channel: 'test-channel-route-off',
                    route: 'route-off'
                });
            }, 30);

            setTimeout(function(){
                nerve.send({
                    channel: 'test-channel-route-off',
                    route: 'route-off'
                });
                nerve.send({
                    channel: 'test-channel-route-off',
                    route: 'route-on'
                });
            }, 100);

            setTimeout(function(){
                testVariable = 'function removed';
                done();
            }, 150);
        });

        it("Route was removed", function() {
            expect(testVariable).toEqual( 'function removed' );
            expect(testVariable_additional).toEqual( true );
        });
    });



    describe("Test for OFF with specific scope (1)", function(){
        var testVariable,
            _scope = {};

        beforeEach(function(done) {

            nerve.on({
                channel: 'test-scope-off',
                callback: function() {
                    testVariable = true;
                    done();
                },
                scope: _scope
            });

            setTimeout(function(){
                nerve.off({
                    channel: 'test-scope-off',
					scope: {}
                });
            }, 30);

            setTimeout(function(){
                nerve.send({
                    channel: 'test-scope-off'
                });
            }, 100);

        });

        it("Channel wasn't removed case scope is different", function() {
            expect(testVariable).toEqual( true );
        });
    });

    describe("Test for OFF with specific scope (2)", function(){
        var testVariable,
            _scope = {};

        beforeEach(function(done) {

            nerve.on({
                channel: 'test-scope-off-remove',
                callback: function() {
                    testVariable = true;
                    done();
                },
                scope: _scope
            });

            setTimeout(function(){
                nerve.off({
                    channel: 'test-scope-off-remove',
                    scope: _scope
                });
            }, 30);

            setTimeout(function(){
                nerve.send({
                    channel: 'test-scope-off-remove'
                });
            }, 100);

            setTimeout(function(){
                testVariable = 'function removed';
                done();
            }, 150);

        });

        it("Channel was removed by scope", function() {
            expect(testVariable).toEqual( 'function removed' );
        });
    });
	
	describe("Test for OFF when only channel is specified (3)", function(){
        var testVariable,
            _scope = {};

        beforeEach(function(done) {

            nerve.on({
                channel: 'test-scope-off',
                callback: function() {
                    testVariable = true;
                    done();
                },
                scope: _scope
            });

            setTimeout(function(){
                nerve.off({
                    channel: 'test-scope-off'
                });
            }, 30);

            setTimeout(function(){
				testVariable =  'function removed';
				done();
			}, 50);
        });

        it("Channel was removed when only channel was specified.", function() {
            expect(testVariable).toEqual( 'function removed' );
        });
    });
	
	describe("Test for OFF when only scope is specified (4)", function(){
        var testVariable,
            _scope = {};

        beforeEach(function(done) {

            nerve.on({
                channel: 'test-scope-off',
                callback: function() {
                    testVariable = true;
                    done();
                },
                scope: _scope
            });

            setTimeout(function(){
                nerve.off({
                    scope: _scope
                });
            }, 30);

            setTimeout(function(){
				testVariable =  'function removed';
				done();
			}, 50);
        });

        it("Channel was removed when only scope was specified.", function() {
            expect(testVariable).toEqual( 'function removed' );
        });
    });
	
	describe("Test for OFF when only scope is specified (5)", function(){
        var testVariable,
            _scope = {};

        beforeEach(function(done) {

            nerve.on({
                channel: 'test-scope-off',
                callback: function() {
                    testVariable = true;
                    done();
                },
                scope: _scope
            });

            setTimeout(function(){
                nerve.off({
                    
                });
            }, 30);

            setTimeout(function(){
				testVariable =  'function removed';
				done();
			}, 50);
        });

        it("Channel was removed from root route when no parameters was specified.", function() {
            expect(testVariable).toEqual( 'function removed' );
        });
    });
	
	describe("Test for OFF when only scope is specified (6)", function(){
        var testVariable,
            _scope = {};

        beforeEach(function(done) {

            nerve.on({
                channel: 'test-different-route-off',
				route: "test-different-route-off",
                callback: function() {
                    testVariable = true;
                    done();
                },
                scope: _scope
            });

            setTimeout(function(){
                nerve.off({
                    
                });
            }, 30);

            setTimeout(function(){
				testVariable =  'function removed';
				done();
			}, 50);
        });

        it("Channel wasn't removed when no params were passed because of different route.", function() {
            expect(testVariable).toEqual( 'function removed' );
        });
    });
	
	describe("Test for OFF when only scope is specified (7)", function(){
        var testVariable,
            _scope = {};

        beforeEach(function(done) {

            nerve.on({
                channel: 'test-scope-off',
				route: 'route-scope-off',
                callback: function() {
                    testVariable = true;
                    done();
                },
                scope: _scope
            });

            setTimeout(function(){
                nerve.off({
					route: 'route-scope-off',
                    scope: _scope
                });
            }, 30);

            setTimeout(function(){
				testVariable =  'function removed';
				done();
			}, 50);
        });

        it("Channel was removed when route and channel was specified.", function() {
            expect(testVariable).toEqual( 'function removed' );
        });
    });
	
	describe("Test for OFF when only scope is specified (8)", function(){
        var testVariable,
            _scope = {};

        beforeEach(function(done) {

            nerve.on({
                channel: 'test-scope-off',
				route: 'route-scope-off',
                callback: function() {
                    testVariable = true;
                    done();
                },
                scope: _scope
            });

            setTimeout(function(){
                nerve.off({
					channel: 'test-scope-off',
					route: 'route-scope-off'
                });
            }, 30);

            setTimeout(function(){
				testVariable =  'function removed';
				done();
			}, 50);
        });

        it("Channel was removed when specific route and channel was specified.", function() {
            expect(testVariable).toEqual( 'function removed' );
        });
    });

});

