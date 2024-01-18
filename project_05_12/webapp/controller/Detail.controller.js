sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.project0512.controller.Detail", {
            //초기화 함수 onInit은 해당 Controller가 로드될 때 한번만 실행
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
            },

            //PatternMatched 이벤트는 URL 일치할 때마다 실행
            _onPatternMatched: function (oEvent) {
                //RouterDetail 라우트 객체의 Pattern이 일치할 때 마다
                //해당 이벤트가 실행됨

                //{ key1 : okok, key2 : '123' }
                var oArgu = oEvent.getParameters().arguments;
                // oArgu.key1 / oArgu['key1'] 객체값에 접근하는 방법
                console.log("Detail : ", oArgu);
            },

            onNavBack: function () {
                // URL parameter로 넘기는 데이터가 많으면
                // JSONModel과 같은 모델을 사용하는게 좋음
                //왜냐하면 URL 길이 제한이 있기 때문
                //아래 예시는 ?tab=okok&test=10 표시됨
                this.oRouter.navTo("RouteMain", {
                    'query': {
                        tab: 'okok',
                        test: 10
                    }
                });
            }
        });
    });
