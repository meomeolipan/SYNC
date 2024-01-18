sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("project0507.controller.Main", {
            onInit: function () {
                // var oData = {
                //     name: 'Hong Gil Dong',
                //     age: 20,
                //     title: 'Gildong`s Page'
                // }; //oData 생성

                // // new sap.ui.model.json.JSONModel(); // 위에 선언하지 않으면 이렇게 해도됨
                // var oModel = new JSONModel(oData); //dData를 가진 json 모델 생성


                //json data파일을 로드해서 가지고 오는 방법
                var oModel = new JSONModel();
                oModel.loadData('../model/data.json', {}, false);

                console.log(oModel.getData());

                // View에 JSON 모델(이름 없음 = 기본모델 = Default Model)을 세팅한다.
                this.getView().setModel(oModel); //View에 JSONModel을 세팅한다.

                // this.getView().setModel(oModel2, "이름"); //모델이 2개이상이라면 모델 이름 써줘야함


                var test = new JSONModel();
                test.loadData('../model/test.json', {}, false);
                this.getView().setModel(test, "test");

            },
            onClick: function () {
                // 모델을 가져올 수 있음
                // var oModel = this.getView().getModel('local');
                // 많이 쓰는 모델에 있는 데이터를 가지고 오는 함수
                // oModel.getData(); //전체 데이터
                // oModel.getData().history; //history 까지의 데이터
                // oModel.getProperty('/'); //최상위 경로면 전체 데이터
                // oModel.getProperty('/history'); //특정 경로에 있는 데이터
                // 속도비교 getData > getProperty 별차이는 없지만,,
                // oModel.setData(); // 전체 데이터
                // oModel.setData({ name: 'okok' }, true); // true가 아니면 싹다 바뀜
                // // oModel.setData(세팅할 데이터(타입 Object), Merge 여부);
                // oModel.setProperty("/name", "okok"); //첫번째 값 경로, 두번째 값 Value
                // // oModel.setProperty(경로, 바꿀 값);

                var oModel1 = this.getView().getModel("test");
                var data = oModel1.getData();
                var data2 = oModel1.getProperty("/");

                //getProperty 나 setProperty는 최소한 쓰고 아래와 같이
                //핸들링 해서 수정해라!
                //데이터를 가져온 후, 데이터 핸들링
                // data2.firstName = 'okok';
                // data2.lastName = 'okok';

                // oModel1.setData({ name: 'Hong Gildong' }, true);

                // debugger; // 디버깅해서 내가 어디부분에서 틀렸는지 확인
                oModel1.setProperty("/name/firstName", "Park");

                console.log(oModel1.getData());

            },
            onSetData: function (oEvent) {
                var oModel = this.getView().getModel(); //기본모델 호출
                // var sInputData = oModel.getProperty("/inpValue");
                var sInputData = oModel.getData().inpValue;

                console.log(sInputData);

                /*
                    oTestModel 에 있는 textValue 데이터 변경
                    변경된 데이터 : "Hello <Input 입력값>"

                    setProperty 또는 setData 사용해서 적용가능
                    .setProperty("/경로", 변경할 값);
                    .setData(변경할 객체 정보, 합치기여부true/false);
                 */

                var otestModel = this.getView().getModel("test");
                // var sInputData2 = otestModel.getProperty("/textValue");
                var sInputData2 = otestModel.getData().textValue;
                otestModel.setData({ textValue: sInputData2 + ' ' + sInputData }, true);
                // otestModel.setData({ textValue: sInputData }, true);
                // otestModel.setProperty("/textValue", sInputData);
                // otestModel.setProperty("/textValue", "Hello" + sInputData);

                // JS 문자열 합치기
                // "Hello" + sInputData;
                // 'Hello' + sInputData;
                // `Hello ${sInputData}`;

                console.log(otestModel.getData().textValue);
            }
        });
    });
