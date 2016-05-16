(function (console) { "use strict";
var Example = function() { };
Example.main = function() {
	var $console = window.console;
	$console.info("Hello from the example!");
};
Example.main();
})(typeof console != "undefined" ? console : {log:function(){}});
