/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sync/project_05_02/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
