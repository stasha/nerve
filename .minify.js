var compressor = require('node-minify');

// Using Google Closure
new compressor.minify({
    type: 'gcc',
    fileIn: 'nerve.js',
    fileOut: 'nerve.min.js',
    callback: function(err, min){
        console.log(err);
//        console.log(min);
    }
});