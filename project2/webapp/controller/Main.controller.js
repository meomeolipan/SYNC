sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel) {
        "use strict";

        return Controller.extend("project2.controller.Main", {
            onInit: function () {
                this.getView().setModel(new JSONModel({
                    Conditions: {},
                    LocalProducts: []
                }), 'main');

            },

            onPatternMatched: function () {
                this.getView().getModel('main').setData({
                    Conditions: {},
                    LocalProducts: []
                });
            },

            onSearch: function () {
                const oTable = this.byId("CategoryTable"),
                    oMainModel = this.getView().getModel('main');
                let oCondition = oMainModel.getData().Conditions,
                    aFilter = [];

                if (oCondition.Telno)
                    aFilter.push(new Filter('Custcode', 'EQ', oCondition.Telno));

                oTable.getBinding("items").filter(aFilter);
                oTable.removeSelections();

                oMainModel.setProperty("/LocalProducts", []);
            }
        });
    });
