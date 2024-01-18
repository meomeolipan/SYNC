sap.ui.define([
    "sap/ui/core/mvc/Controller",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched: function (oEvent) {
                var oArgs = oEvent.getParameter("arguments");
                this.byId("ObjHeader").setObjectTitle("OrderID : " + oArgs.OrderID);

                var sPath = "/Order_Details(OrderID=" + encodeURIComponent(oArgs.OrderID) + ",ProductID=" + encodeURIComponent(oArgs.ProductID) + ")";
                this.byId("SimpleFormChange354").bindElement(sPath);
            },

            onNavBack: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.navTo("RouteMain");
            }
        });
    });
