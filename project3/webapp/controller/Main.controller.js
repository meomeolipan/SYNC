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
                // var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZBA_ODATA_SRV/");
                // this.getView().setModel(oModel);

                var oDatas = {
                    list: [
                        { Matcode: "" },
                        { Quant: "" }
                    ]
                };
                this.getView().setModel(oDatas, "result");
            },
            // onSearch: function () {
            //     var sTelNo = this.byId("inputTelNo").getValue();
            //     var oModel = this.getView().getModel();
            //     var aFilters = [new Filter("Telno", FilterOperator.EQ, sTelNo)];

            //     oModel.read("/ZBAT_SD020Set", {
            //         filters: aFilters,
            //         success: function (oData) {
            //             if (oData.results.length > 0) {
            //                 var sCustCode = oData.results[0].Custcode;
            //                 this._loadProductData(sCustCode);
            //             } else {
            //                 sap.m.MessageToast.show("No customer found for the given telephone number.");
            //             }
            //         }.bind(this),
            //         error: function () {
            //             sap.m.MessageToast.show("Error occurred while searching.");
            //         }
            //     });
            // },
            // _loadProductData: function (sCustCode) {
            //     var oModel = this.getView().getModel();
            //     var aFilters = [new Filter("Custcode", FilterOperator.EQ, sCustCode)];

            //     oModel.read("/ZBAT_SD110Set", {
            //         filters: aFilters,
            //         success: function (oData) {
            //             var oTableModel = new JSONModel();
            //             oTableModel.setData(oData);
            //             this.getView().byId("resultTable").setModel(oTableModel);
            //         }.bind(this),
            //         error: function () {
            //             sap.m.MessageToast.show("Error occurred while loading product data.");
            //         }
            //     });
            // }
            onSearch: function () {

                var oView = this.getView();
                var sTelno = oView.byId("telnoInput").getValue();

                // 전화번호 형식 검증 추가
                var telnoRegex = /^\d{3}-\d{4}-\d{4}$/;
                if (!telnoRegex.test(sTelno)) {
                    sap.m.MessageToast.show("전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678");
                    return; // 형식이 맞지 않으면 함수 종료
                }

                var oModel = oView.getModel();
                var oResultModel = oView.getModel("result");

                // Step 1: Fetch custcode from ZBAT_SD020Set using telno
                oModel.read("/ZBAT_SD020Set", {
                    filters: [new sap.ui.model.Filter("Telno", sap.ui.model.FilterOperator.EQ, sTelno)],
                    success: function (oData) {
                        if (oData.results.length > 0) {

                            var sCustcode = oData.results[0].Custcode;

                            // Step 2: Fetch matcode and quant from ZBAT_SD110Set using custcode
                            oModel.read("/ZBAT_SD110Set", {
                                filters: [new sap.ui.model.Filter("Custcode", sap.ui.model.FilterOperator.EQ, sCustcode)],
                                success: function (oData) {
                                    oResultModel.setData(oData.results);
                                },
                                error: function (oError) {
                                    var sErrorMessage = JSON.parse(oError.responseText).error.message.value;
                                    sap.m.MessageToast.show("Error fetching data from ZBAT_SD110Set: " + sErrorMessage);
                                }
                            });
                        } else {
                            sap.m.MessageToast.show("No data found for the provided Telno");
                        }
                    },
                    error: function (oError) {
                        var sErrorMessage = JSON.parse(oError.responseText).error.message.value;
                        sap.m.MessageToast.show("Error fetching data from ZBAT_SD020Set: " + sErrorMessage);
                    }
                });
            }
        });
    });
