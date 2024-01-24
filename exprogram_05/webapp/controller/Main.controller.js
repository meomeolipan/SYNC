sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter) {
        "use strict";

        return Controller.extend("exam.exprogram05.controller.Main", {
            onInit: function () {

                this.getView().setModel(new JSONModel({
                    C: {},
                    LP: [],
                    LC: []
                }), 'local');

                const mR = this.getOwnerComponent().getRouter();

                mR.getRoute('RouteMain').attachPatternMatched(this.onPatternMatched, this);

            },
            onPatternMatched: function () {
                this.getView().getModel('local').setData({
                    C: {},
                    LP: [],
                    LC: []
                });

                this.byId("idTableSearch").removeSelections();
            },
            onSearch: function () {
                var sCateID = this.getView().byId("idInput").getValue();
                var sCateName = this.getView().byId("cateInput").getValue();

                var aFilter = [];
                if (sCateID) aFilter.push(new Filter('CategoryID', 'GE', sCateID));
                if (sCateName) aFilter.push(new Filter('CategoryName', 'Contains', sCateName));

                this.getView().byId("idTableSearch").getBinding("items").filter(new Filter({
                    filters: aFilter,
                    and: true
                }));
            },
            onSelectionChange: function (oEvent) {

                var sCategoryID = oEvent.getParameter("listItem").getBindingContext().getProperty("CategoryID");

                if (sCategoryID) {

                    var oFilter = new Filter("CategoryID", 'EQ', sCategoryID);
                    var oModel = this.getView().getModel();
                    var sModel = this.getView().getModel('Prod');
                    var yModel = this.getView().getModel('SbyC');
                    var oTable = this.byId("idTablePro");
                    var oViz = this.byId("idDataset");

                    oModel.read("/Products", {
                        filters: [oFilter],
                        success: function (oData) {
                            sModel.setData({ lProd: oData.results }, true);
                            oTable.getBinding("rows").filter([oFilter]);

                        },
                        error: function (oError) {
                        }
                    });

                    oModel.read("/Sales_by_Categories", {
                        filters: [oFilter],
                        success: function (oData) {
                            yModel.setData({ lSbyC: oData.results }, true);
                            oViz.getBinding("data").filter([oFilter]);
                        },
                        error: function (oError) {
                        }
                    });


                }
            },
            onSelectionChangeViz: function (oEvent) {
                var PNdata = oEvent.getParameters().data[0].data.Name;

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo('RouteDetail', {
                    id: PNdata
                });
            }
        });
    });
