sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sync.project0512.controller.Employee", {
            //초기화 함수 onInit은 해당 Controller가 로드될 때 한번만 실행
            onInit: function () {
                var oData = {
                    list: []
                };
                this.getView().setModel(new JSONModel(oData), "chart");

                this.oRouter = this.getOwnerComponent().getRouter();
                var oTarget = this.oRouter.getTarget("Employee");
                oTarget.attachDisplay(this._onAttachDisplay, this);
            },
            //해당 타겟 화면이 표시될 때마다 이벤트 실행
            _onAttachDisplay: function (oEvent) {
                //해당 타겟으로 넘겨질 때 받았던 파라미터 값이
                //"data"에 들어있음
                //"data"에 들어있는 값을 해당 Controller 내부에서
                //사용할 수 있도록
                //this._oData 에다가 담아 놓는다.

                this._oData = oEvent.getParameter("data");
            },
            onNavBack: function () {
                //본래 가지고 있는 oData 값과
                //넘겨받은 fromTarget 값이 같으면 실행하겠다
                if (this._oData && this._oData.fromTarget) {
                    this.oRouter.getTargets().display(this._oData.fromTarget);
                    delete this._oData.fromTarget;
                    return; //함수 종료
                }
                //browser에 쌓인 history에서 한 번 뒤로가기(-1만큼)
                //back -1 from Stack history browser
                window.history.go(-1);
            },
            onValueChange: function (oEvent) {
                var oInput = oEvent.getSource();
                var sValue = oInput.getValue();
                // debugger;
                if (sValue !== "") {
                    oInput.setValueState("None");
                    //  sap.ui.core.ValueState 종류
                    // Error, Information, None, Success, Warning
                    var oModel = this.getView().getModel('chart');
                    var aList = oModel.getData().list;

                    aList.push({
                        name: sValue
                    });

                    oModel.setProperty("/list", aList);
                } else {

                    //setValueStateText는 setValueState와 함께 사용해야함
                    // 상태가 지정이 돼야 텍스트가 나옴
                    oInput.setValueState("Error");
                    oInput.setValueStateText("값이 없습니다.");
                }
            }
        });
    });
