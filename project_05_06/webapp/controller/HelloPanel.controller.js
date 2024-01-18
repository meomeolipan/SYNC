sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0506.controller.HelloPanel", {
            onInit: function () {

            },
            onShowHello: function () {
                var oInput = this.byId("Input00").getValue();
                sap.m.MessageToast.show(oInput);
            }
        });
    });
