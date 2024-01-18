/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapbtp/ux410_solving_self/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
