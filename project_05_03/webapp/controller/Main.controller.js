sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button) {
        "use strict";

        return Controller.extend("project0503.controller.Main", {
            onInit: function () {

            },

            OnClick: function () {
                // getView()는 생략이 가능하다.
                // var oInput = this.getView().byId("idInput").getValue();
                // var oText = this.getView().byId("idText").setText(oInput);
                var oInput = this.byId("idInput").getValue();
                var oText = this.byId("idText").setText(oInput);
            },

            OnClick2: function () {
                // var oInput = this.getView().byId("idInput").setValue();
                // var oText = this.getView().byId("idText").setText();
                var oInput = this.byId("idInput").setValue();
                var oText = this.byId("idText").setText();
            }
        });
    });
