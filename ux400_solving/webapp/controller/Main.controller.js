sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/ValueState"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, ValueState) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            onInit: function () {
                var oData = {
                    list: [
                    ]
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "sRan");
            },
            onRandomPress: function () {
                this.getView().byId("idInput").setValue(Math.floor(Math.random() * 100) + 1);

                var oModel = this.getView().getModel('sRan');
                var aList = oModel.getProperty("/list");

                aList.push({
                    value: this.getView().byId("idInput").getValue()
                });

                oModel.setProperty("/list", aList);
            },
            onDialog: function () {
                this.byId("idProductsDialog").open();
            },
            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
            },
            transformDiscontinued: function (sValue) {
                if (sValue) {
                    return "Yes";
                } else return "No";
            },
            fnIconFormat: function (sValue) {
                if (sValue) {
                    if (sValue > 15) {
                        return 'sap-icon://thumb-up';
                    } else {
                        return 'sap-icon://thumb-down';
                    }
                }
            },
            fnColorFormat: function (sValue) {
                if (sValue) {
                    if (sValue > 15) {
                        return '#1bea21';
                    } else {
                        return '#ea341b';
                    }
                }
            },
            onValueChange: function (oEvent) {
                var oInput = oEvent.getSource();
                /*궁금해서 내가 걍 해봄 */
                // var oParam = oEvent.getParameters().value; //string형 input 안의 value값 
                // var oParam2 = this.byId("idInput").getValue();
                // console.log(oParam, oParam2);
                // debugger;

                var sValue = oInput.getValue();
                if (sValue >= 1 && sValue <= 100) {
                    var oModel = this.getView().getModel('sRan');
                    // var aList = oModel.getProperty("/list");
                    var aList = oModel.getData().list;

                    aList.push({
                        value: sValue
                    });

                    oModel.setProperty("/list", aList);
                } else {
                    oInput.setValueState(ValueState.Error);
                    oInput.setValueStateText("1부터 100 사이의 숫자를 입력하세요.");
                }
            }
        });
    });
