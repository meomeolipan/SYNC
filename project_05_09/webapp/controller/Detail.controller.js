sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odata.project0509.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                //Main에서 라우터 정보가 맞는치 체크 attachPatternMatched
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched: function (oEvent) {
                var oArgu = oEvent.getParameters().arguments;
                //setText에 oArgu.OrderID 라고 써야하는 이유 알아보기
                // this.byId("idText").setText(oArgu.OrderID);

                //"/EntitySetName(key='1',key2='1')" 키 값이 여러개인 경우
                //"/EntitySetName('1')"  키 값이 하나인 경우
                //예시 "/Orders(10248)"
                this.byId("idForm").bindElement(`/Orders(${oArgu.OrderID})`);
            },

            onNavBack: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.navTo("RouteMain");
            }
        });
    });
