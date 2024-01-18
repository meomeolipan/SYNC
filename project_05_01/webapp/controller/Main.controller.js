sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button",
    "sap/ui/model/json/JSONModel" //이거 자주 사용하면 해야함
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button, JSONModel) {
        "use strict";

        //클로저 변수 (편하게 전역변수라고 부름)
        // var TEST = "okok";
        //TEST라는 변수는 onInit()뿐 만아니라 다른 함수에서도 사용 가능


        return Controller.extend("project0501.controller.Main", {

            //TEST = "OKOK",  << 이렇게 사용해도 전역변수처럼 사용 가능

            onInit: function () {
                //this.TEST = "OKOK";
                //this가 Controller를 의미하기 때문에 이렇게 사용하면
                //전역변수처럼 사용 가능

                //초기화 함수
                // 초기값 설정, 화면에서 사용할 모델 생성
                // 아래 함수들이 사용할 공통 변수 등등 세팅

                // new Button
                // new sap.m.Button

                this.byId("idInput").setValue("10"); //화면 뜨자마자 초기 세팅
                this.byId("idInput2").setValue("20"); //화면 뜨자마자 초기 세팅
                //this.getView().byId("idInput");
                // idInput 객체가 없다고 오류가 날 수 있음(빈도수 낮음)
                // 화면이 아직 그려지기 전에 Init 함수가 실행해서..
                // 타이밍이 맞지 않을 수 있기 때문에
                // onAfterRendering 등 화면이 그려진 후에 로직을
                // 실행할 수 있도록 설정

                // this.getOwnerComponent().getModel()
                // Component 단계로 가기위해서
                // getOwnerComponent()를 사용

                var cal = new JSONModel();
                cal.loadData('../model/cal.json', {}, false);
                this.getView().setModel(cal);
                //2개 이상의 모델을 사용할 때는 이름을 정해야함
                //왜냐하면 이름 없이 getView() 함수를 불러오면
                //덮어쓰기 때문에!

                this.getView().setModel(new JSONModel({
                    history: [
                        { Num1: 1, Oper: '+', Num2: 2, Result: 2 }
                    ]
                }), 'local');

                // [{}].push(넣을 값) 배열에 값을 넣을 수 있다.

                //Context Binding
                // 내가 바인딩 할 모델이 이름이 없다 그러면 그냥 경로쓰면됨
                this.byId("idTitle").bindElement('/');

                //이름이 있는 모델의 경우, 경로 및 이름을 객체 형태로 전달
                // this.byId("idTitle").bindElement({
                //     path: '/title',
                //     model: 'main1'
                // });
            },

            //local 모델의 result 값에 따라서 포맷터 함수를 적용할 수 있다.
            //result 값이 100 초과면 블랙, 아니면 레드를 반환한다.
            fnColorFormat: function (sValue) {
                if (sValue) {
                    if (sValue > 100) {
                        return '#020715';
                    } else {
                        return '#930724';
                    }
                }
            },

            onBeforeRendering: function () {
                //화면 그려지기 전 실행
            },

            onAfterRendering: function () {
                //화면 그려진 후 실행
            },

            onExit: function () {
                //화면 종료되면 실행
            },

            //함수명 앞에 _ 붙이면 해당 파일에서만 사용된다는 의미
            onClick: function () {
                // alert('button click');
                // 변수가 약간 연한 색이면 사용되지 않았을 가능성 높아짐
                //객체를 가져온다
                // oInput에서 첫 글자는 data type for example 'o'
                var oInput = parseInt(this.getView().byId("idInput").getValue());
                //parseInt 대신 Number를 사용해도 됨
                var oInput2 = parseInt(this.getView().byId("idInput2").getValue());
                var oSelect = this.getView().byId("idSelect").getSelectedKey();
                var resultCal;
                //getSelectedKey도 되지만 getSelectedItem().getKey(); || .getText();
                // this : Controller
                // .getView() : Controller에 있는 메서드
                // .byId() : View에 있는 메서드\

                // .getValue(), .setValue()

                //모델을 가져올 수 있음

                //많이 쓰는 모델에 있는 데이터를 가지고 오는 함수
                // oModel.getData(); //전체 데이터
                // oModel.getData().history; //history 까지의 데이터
                // oModel.getProperty('/'); //최상위 경로면 전체 데이터
                // oModel.getProperty('/history'); //특정 경로에 있는 데이터
                //속도비교 getData > getProperty 별차이는 없지만,,
                // oModel.setData(); // 전체 데이터
                // oModel.setData({ name: 'okok' }, true); // true가 아니면 싹다 바뀜
                // // oModel.setData(세팅할 데이터(타입 Object), Merge 여부);
                // oModel.setProperty("/name", "okok"); //첫번째 값 경로, 두번째 값 Value
                // // oModel.setProperty(경로, 바꿀 값);

                switch (oSelect) {
                    case '+':
                        //화면 하단에 메세지가 잠깐 표시되고 사라짐
                        resultCal = (oInput + oInput2);
                        sap.m.MessageToast.show("계산이 완료됐습니다. " + resultCal);
                        // alert(oInput + oInput2);
                        break;
                    case '-':
                        resultCal = (oInput - oInput2);
                        sap.m.MessageToast.show("계산이 완료됐습니다. " + resultCal);
                        break;
                    case '*':
                        resultCal = (oInput * oInput2);
                        sap.m.MessageToast.show("계산이 완료됐습니다. " + resultCal);
                        break;
                    case '/':
                        resultCal = (oInput / oInput2);
                        sap.m.MessageToast.show("계산이 완료됐습니다. " + resultCal);
                        break;
                    default:
                        break;
                }

                var oModel = this.getView().getModel('local');

                var ohis = oModel.getData().history;
                ohis.push({ Num1: oInput, Oper: oSelect, Num2: oInput2, Result: resultCal });

                oModel.setData(ohis, true);
            }
        });
    });
