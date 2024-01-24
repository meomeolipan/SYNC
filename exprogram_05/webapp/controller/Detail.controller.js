sap.ui.define([
    "sap/ui/core/mvc/Controller",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("exam.exprogram05.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched: function (oEvent) {
                var oArgs = oEvent.getParameter("arguments");

                var sPath = "/Sales_by_Categories(ProductName=" + oArgs.OrderID + ",ProductSales=" + oArgs.ProductID + ")";
                this.byId("idTableDetail").bindElement(sPath);
            },

            onNavBack: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.navTo("RouteMain");
            }
        });
    });
