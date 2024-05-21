sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
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
                    filters: sSelectedOrderId ? [new Filter('Matname', FilterOperator.EQ, sSelectedOrderId)] : [],
                    and: true
                }));

                this.byId("idLineChart").getModel().refresh(true);

                var sSelectedChartType = this.byId("ComboType").getSelectedKey();

                if (sSelectedChartType) {
                    this.byId("ComboType").setValueState("None");
                    this.byId("idLineChart").setVizType(sSelectedChartType);
                } else {
                    this.byId("ComboType").setValueState("Error").setValueStateText("Invalid entry");
                }
            },
            onSelectionChange: function (oEvent) {
                var oSelectedData = oEvent.getParameter("data")[0];
                if (oSelectedData) {
                    var sPath = "/ZBAT_SD070Set(Matname=" + oSelectedData.data.Matcode + ",Rentstate=" + oSelectedData.data.Rentstate + ")";
                    var oSelectData = this.getView().getModel().getProperty(sPath);

                    this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                        Matcode: oSelectData.Matcode,
                        Rentstate: oSelectData.Rentstate
                    }, true);
                }
            }
        });
    });
