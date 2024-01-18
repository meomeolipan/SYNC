sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("sap.btp.ux410solving.controller.Main", {
        onInit: function () {
            this.getView().setModel(new JSONModel({
                types: [
                    { type: 'bar' },
                    { type: 'column' },
                    { type: 'line' },
                    { type: 'donut' }
                ]
            }), 'typeList');
        },

        onSearch: function (oEvent) {
            var sSelectedOrderId = this.byId("ComboOrderID").getSelectedKey();

            this.byId("idDataset").getBinding("data").filter(new Filter({
                filters: sSelectedOrderId ? [new Filter('OrderID', FilterOperator.EQ, sSelectedOrderId)] : [],
                and: true
            }));

            var sSelectedChartType = this.byId("ComboType").getSelectedKey();

            if (sSelectedChartType) {
                this.byId("ComboType").setValueState("None");
                this.byId("idLineChart").setVizType(sSelectedChartType);
            } else {

                // this.byId("ComboType").setValueState("Error");
                // this.byId("ComboType").setValueStateText("Invalid entry");

                //체이닝(Chaining)이라는 방식, 두 개의 메서드 호출을 하나의 표현식으로 결합
                //setValueState("Error") 메서드 호출 이후에 setValueStateText("Invalid entry") 메서드를 이어서 호출
                this.byId("ComboType").setValueState("Error").setValueStateText("Invalid entry");
            }
        },

        onSelectionChange: function (oEvent) {
            var oSelectedData = oEvent.getParameter("data")[0];
            if (oSelectedData) {
                var sPath = "/Order_Details(OrderID=" + oSelectedData.data.OrderID + ",ProductID=" + oSelectedData.data.ProductID + ")";
                var oSelectData = this.getView().getModel().getProperty(sPath);

                this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                    OrderID: oSelectData.OrderID,
                    ProductID: oSelectData.ProductID
                }, true);
            }
        }
    });
});
