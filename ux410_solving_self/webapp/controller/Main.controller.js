sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux410solvingself.controller.Main", {
            onInit: function () {
                var Odata = {
                    chart: [
                        { type: "bar" },
                        { type: "column" },
                        { type: "line" },
                        { type: "donut" }
                    ]
                };
                this.getView().setModel(new JSONModel(Odata), "typeList");

            },
            onSearch: function () {
                var ItemData = this.byId("idComboBox1").getSelectedItem();
                var ItemData2 = this.byId("idComboBox2").getSelectedItem();
                var aFilter = [];
                var oChart = this.byId("idChart");
                if (ItemData) {
                    ItemData = ItemData.getText();
                    aFilter.push(new Filter({
                        path: 'OrderID',
                        operator: 'EQ',
                        value1: ItemData,
                    }));
                }
                if (ItemData2) {
                    ItemData2 = ItemData2.getText();
                    oChart.setVizType(ItemData2);
                }
                oChart.getDataset().getBinding("data").filter(aFilter);

            },
            OselectData: function (oEvent) {
                var OrderIDdata = oEvent.getParameters().data[0].data.OrderID;
                var ProductIDdata = oEvent.getParameters().data[0].data.ProductID;
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo('RouteDetail', {
                    OrderID: OrderIDdata,
                    ProductID: ProductIDdata
                });
            }
        });
    });
