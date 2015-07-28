# Nerve

An asynchronous javascript micro framework for event broadcasts along routes and channels.

[![Build Status](https://travis-ci.org/stasha/nerve.svg?branch=master)](https://travis-ci.org/stasha/nerve)

Original code came from: 
@artemdemo https://github.com/artemdemo/nerve, @jstandish https://github.com/jstandish/nerve

Changes against artemdemo's code is that now it is possible to remove listeners 
based any combination of arguments channel, route, scope.

## Listening to channels and routes - nerve.on()

**Listening to any message on a channel**
```javascript
nerve.on({
     channel: 'some-channel',
     callback: function( context ) {
          // some functionality
     },
});
```

**Listening to a specific route on a channel**
```javascript
nerve.on({
     channel: 'some-channel',
     route: 'some-route',
     callback: function( context ) {
          // some functionality
     }
});
```

**Listening to a channel or route but using a different scope upon event consumption**
```javascript
this.outsideScopeProperty = 'you can see me';

var that = this;

nerve.on({
     channel: 'some-channel',
     route: 'some-route',
     callback: function( context ) {
          console.log( this.outsideScopeProperty === 'you can see me' );
     },
     scope: this
});
```

## Removing listeners from a channel or route - nerve.off()

**Removing a listener for a channel**
```javascript
nerve.off({
    channel: 'some-channel'
});
```

**Removing a listener from a specific channel's route**
```javascript
nerve.off({
    channel: 'some-channel',
    route: 'some-route'
});
```


**Removing a listeners **
```javascript
var that = this;

nerve.off({
    channel: 'some-channel',
});

nerve.off({
    route: 'some-route',
});

nerve.off({
    scope: that
});

nerve.off({
    channel: 'some-channel',
    route: 'some-route',
});

nerve.off({
    route: 'some-route',
    scope: that
});

nerve.off({
    channel: 'some-channel',
    route: 'some-route',
    scope: that
});
```
