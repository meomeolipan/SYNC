sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.project0512.controller.Main", {
            onInit: function () {
                //한 단계 위에 있는 컴포넌트에 접근해서, 라우터를 가져온다.
                //https://sapui5.hana.ondemand.com/#/api/sap.ui.core.routing.Route%23methods/attachMatched
                //attachPatternMatched 함수 위 링크 참고
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute('RouteMain').attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function (oEvent) {
                var oArgu = oEvent.getParameters().arguments;
                // var oArgu = oEvent.getParameter('arguments');
                //위의 코드와 동일
                oArgu["?query"].test //10
                console.log("Main : ", oArgu["?query"].test);

                /*아래는 ? 안쓰고 사용하는 예시 */
                // var urlParams = new URLSearchParams(window.location.search);
                // var queryValue = urlParams.get('query');
                // console.log("Main: ", queryValue);

                /*
                    window.location.search는 현재 페이지 URL의 쿼리 문자열을 나타내는 
                    JavaScript의 window.location 객체의 속성
                    속성은 현재 페이지의 URL에서 물음표(?) 이후에 오는 문자열을 반환
                    예)현재 페이지의 URL이 https://www.example.com/page?query=example
                        window.location.search는 ?query=example라는 문자열을 반환 
                 */
            },
            onGoDetail: function () {
                // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // oRouter.navTo("TargetDetail");

                this.oRouter.navTo("RouteDetail", {
                    key1: 'okok',
                    key2: 123
                }, true);
                //.navTo('Route 객체 name', {파라미터 정보}, 히스토리 초기화 여부)
                //
            },
            onGoNotFound: function () {
                this.oRouter.getTargets().display("NotFound", {
                    fromTarget: 'TargetMain'
                });
            },
            onGoEmployee: function () {
                this.oRouter.getTargets().display("Employee", {
                    fromTarget: 'TargetMain'
                });
            }
        });
    });
