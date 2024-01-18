sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("project0506.controller.Main", {
            onInit: function () {

            },
            // HelloFrag.fragment.xml 안에 있는 버튼 press 이벤트
            HelloButtonPress: function () {
                sap.m.MessageToast.show("Hello");
            },
            onOpenDialog: function () {
                this.byId("idDialog").open();
            },
            //Button의 press 이벤트
            //이벤트 함수는 이벤트 객체 oEvent 받아옴
            onClose: function (oEvent) {
                //
                //getSource(), getParameters() ....
                //oEvent.getSource() 하면, 이벤트를 일으킨 객체가 리턴됨
                //-> 버튼에서 .getParent() 하면, 상위 객체 Dialog를 가져올 수 있음
                // 따라서 Dialog에서 .close() 실행 시, 팝업이 닫힘
                oEvent.getSource().getParent().close();

                // ^^ class sap.ui.base.Event 참고
                //https://ui5.sap.com/#/api/sap.ui.base.Event%23methods/Summary

                //View에서 Dialog Fragment 닫기
                // this.byId("idDialog").close();

                //Controller 내에서 Dialog Fragment 호출하기
                // sap.ui.getCore().byId("idDialog").close();
            },
            //Controller 내에서 Dialog Fragment 호출하기
            onOpenDialog_con: function () {
                var dialog = sap.ui.getCore().byId("idDialog");

                //조건문 if문을 사용하여 파일을 1번만 load할 수 있도록 함

                //만약에, dialog 변수에 값이 있으면 dialog.open() 하면 되고
                //dialog 변수에 값이 없으면 load 메서드를 실행한다. 

                if (!dialog) {
                    Fragment.load({
                        name: "project0506.view.fragment.Dialog",//경로
                        type: "XML",
                        controller: this
                    }).then(function (oDialog) {
                        oDialog.open();
                    });
                } else {
                    dialog.open();
                }

                // dialog == true ? dialog.open() :
                //     Fragment.load({
                //         name: "project0506.view.fragment.Dialog",
                //         type: "XML",
                //         controller: this
                //     }).then(function (oDialog) {
                //         oDialog.open();
                //     });
            },
            onOpenDialog_Name: function () {
                var dialog = sap.ui.getCore().byId("idDialog");

                dialog == true ? dialog.open() :
                    Fragment.load({
                        name: "project0506.view.fragment.Name",
                        type: "XML",
                        controller: this
                    }).then(function (oDialog) {
                        oDialog.open();
                    });
            }
        });
    });
