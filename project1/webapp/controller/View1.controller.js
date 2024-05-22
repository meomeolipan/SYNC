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
                var sSelectedMat = this.byId("ComboMat").getSelectedKey();

                this.byId("idDataset").getBinding("data").filter(new Filter({
                    filters: sSelectedMat ? [new Filter('Matcode', FilterOperator.EQ, sSelectedMat)] : [],
                    and: true
                }));

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
            },
            formatRentPeriod: function (sValue) {
                switch (sValue) {
                    case "1":
                        return "5년";
                    case "2":
                        return "7년";
                    default:
                        return sValue;
                }
            },
            formatRenstate: function (sValue) {
                switch (sValue) {
                    case "1":
                        return "렌탈 중";
                    case "2":
                        return "렌탈 종료";
                    case "3":
                        return "소유권 이전";
                    case "4":
                        return "중도해지";
                    case "5":
                        return "무단소유";
                    case "6":
                        return "렌탈대기";
                    default:
                        return sValue;
                }
            }
        });
    });
