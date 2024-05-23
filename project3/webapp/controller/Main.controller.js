sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("project3.controller.Main", {
            onInit: function () {

                var oSearchModel = new JSONModel();
                this.getView().setModel(oSearchModel, "searchModel");

            },
            onSearch: function () {

                var oView = this.getView();
                var sTelno = oView.byId("telnoInput").getValue();
                var oTable = this.getView().byId("resultTable");
                var oSearchModel = this.getView().getModel("searchModel");

                var telnoRegex = /^\d{3}-\d{4}-\d{4}$/;
                if (!telnoRegex.test(sTelno)) {
                    sap.m.MessageToast.show("전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678");
                    return; // 형식이 맞지 않으면 함수 종료
                }

                var oModel = oView.getModel();

                oModel.read("/ZBAT_SD020Set", {
                    filters: [new sap.ui.model.Filter("Telno", sap.ui.model.FilterOperator.EQ, sTelno)],
                    success: function (oData) {
                        if (oData.results.length > 0) {

                            var sCustcode = oData.results[0].Custcode;
                            console.log("Custcode: " + oData.results[0].Custcode);

                            oModel.read("/ZBAT_SD110Set", {
                                filters: [new sap.ui.model.Filter("Custcode", sap.ui.model.FilterOperator.EQ, sCustcode)],
                                success: function (oReturn) {
                                    for (let index = 0; index < oReturn.results.length; index++) {
                                        console.log("Matcode: " + oReturn.results[index].Matcode + ", Quant: " + oReturn.results[index].Quant);
                                    }
                                    oSearchModel.setData({ results: oReturn.results });
                                    console.log(oSearchModel.getData());
                                },
                                error: function (oError) {
                                    var sErrorMessage = JSON.parse(oError.responseText).error.message.value;
                                    sap.m.MessageToast.show("Error fetching data from ZBAT_SD110Set: " + sErrorMessage);
                                    oSearchModel.setData({ results: [] });
                                }
                            });
                        } else {
                            sap.m.MessageToast.show("No data found for the provided Telno");
                            oSearchModel.setData({ results: [] });
                        }
                    },
                    error: function (oError) {
                        var sErrorMessage = JSON.parse(oError.responseText).error.message.value;
                        sap.m.MessageToast.show("Error fetching data from ZBAT_SD020Set: " + sErrorMessage);
                        // oTable.setVisible(false);
                        oSearchModel.setData({ results: [] });
                    }
                });
            },
            onReturnPress: function (oEvent) {
                var oItem = oEvent.getSource().getBindingContext("searchModel").getObject();
                console.log(oItem);
                var oPayload = {
                    Changecode: "",
                    Saocode: oItem.Saocode,
                    Custcode: oItem.Custcode,
                    Shipcode: oItem.Shipcode,
                    Vencode: "",
                    Cancelcharge: "0.00",
                    Currkey: "KRW",
                    Quant: oItem.Quant,
                    Unit: "EA",
                    Salestate: "R",
                    Okstate: "2",
                    Getstate: "1"
                };
                console.log(oPayload);
                this._createRequest("반품 처리를 진행하시겠습니까?", oPayload);
            },

            onExchangePress: function (oEvent) {
                var oItem = oEvent.getSource().getBindingContext("searchModel").getObject();
                var oPayload = {
                    Changecode: "",
                    Saocode: oItemData.Saocode,
                    Custcode: oItemData.Custcode,
                    Shipcode: oItemData.Shipcode,
                    Vencode: "",
                    Cancelcharge: "0.00",
                    Currkey: "KRW",
                    Quant: oItemData.Quant,
                    Unit: "EA",
                    Salestate: "C",
                    Okstate: "2",
                    Getstate: "1"
                };
                this._createRequest("교환 처리를 진행하시겠습니까?", oPayload);
            },

            onReclaimPress: function (oEvent) {
                var oItem = oEvent.getSource().getBindingContext("searchModel").getObject();
                var oPayload = {
                    Changecode: "",
                    Saocode: oItemData.Saocode,
                    Custcode: oItemData.Custcode,
                    Shipcode: oItemData.Shipcode,
                    Vencode: "",
                    Cancelcharge: "0.00",
                    Currkey: "KRW",
                    Quant: oItemData.Quant,
                    Unit: "EA",
                    Salestate: "W",
                    Okstate: "2",
                    Getstate: "1"
                };
                this._createRequest("교환 처리를 진행하시겠습니까?", oPayload);
            },
            _createRequest: function (oItem) {
                var oModel = this.getView().getModel();
                oModel.create("/ZBAT_SD100Set", oItem, {
                    success: function (oData, response) {
                        sap.m.MessageToast.show("성공적으로 처리되었습니다.");
                    },
                    error: function (oError) {
                        sap.m.MessageToast.show("처리 중 오류가 발생했습니다.");
                    }
                });
            },


        });
    });
