(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    }
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    if (!echarts.registerMap) {
        log('ECharts Map is not loaded')
        return;
    }
    echarts.registerMap('custom',{
    	  "type": "FeatureCollection",
    	  "features": [
    	    {
    	      "type": "Feature",
    	      "properties": {},
    	      "geometry": {
    	        "type": "Point",
    	        "coordinates": [
    	          103.88671875,
    	          34.59704151614417
    	        ]
    	      }
    	    },
    	    {
    	      "type": "Feature",
    	      "properties": {},
    	      "geometry": {
    	        "type": "Polygon",
    	        "coordinates": [
    	          [
    	            [
    	              57.83203125,
    	              -1.9332268264771106
    	            ],
    	            [
    	              144.84375,
    	              -1.9332268264771106
    	            ],
    	            [
    	              144.84375,
    	              53.330872983017066
    	            ],
    	            [
    	              57.83203125,
    	              53.330872983017066
    	            ],
    	            [
    	              57.83203125,
    	              -1.9332268264771106
    	            ]
    	          ]
    	        ]
    	      }
    	    }
    	  ]
    	})}));