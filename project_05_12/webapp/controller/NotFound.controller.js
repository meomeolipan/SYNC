sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.project0512.controller.NotFound", {
            //초기화 함수 onInit은 해당 Controller가 로드될 때 한번만 실행
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                var oTarget = this.oRouter.getTarget("NotFound");
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
                // { fromTarget : 'TargetMain' }
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
            }
        });
    });
