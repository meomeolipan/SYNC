sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("project0508.controller.Main", {
            onInit: function () {
                var oData = {
                    list: [
                    ]
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
            },
            onAdd: function () {
                var oModel = this.getView().getModel();
                //var aList = oModel.getData().list;
                var aList = oModel.getProperty("/list");

                aList.push({
                    // name: 'hihi',
                    // age: 20 //초기값 설정할 때는 여기서
                });

                oModel.setProperty("/list", aList);
                // oModel.setData({list: aList, true});
            },
            onRowDelete: function (oEvent) {//oEvent (클릭이나 어떠한 이벤트를 의미)
                //해당 이벤트 파라미터의 로우 인덱스 값 가지고 오기
                var index = oEvent.getParameters().row.getIndex();
                var aList = this.getView().getModel().getProperty("/list");

                // index에 해당하는 모델 데이터 삭제
                aList.splice(index, 1); // (해당 인덱스부터 , 몇 개 지우겠다)

                //splice 공부 ㄱㄱ

                this.getView().getModel().setProperty("/list", aList);

            },
            onDelete: function (oEvent) {
                var index = this.byId("idTable").getSelectedIndices();
                // var index2 = oEvent.getParameters().row.getSelectedIndices();

                // debugger;

                var aList = this.getView().getModel().getProperty("/list");

                for (var i = index.length - 1; i >= 0; i--) {
                    //i: 0 1 2      // 0~5 그안의 값
                    //v: 0 2 4      // 
                    aList.splice(index[i], 1);
                }

                //세개를 선택했을 때 세번만 돌게

                this.getView().getModel().setProperty("/list", aList);
            }
        });
    });
