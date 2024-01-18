sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("odata.project0513.controller.Main", {
            onInit: function () {
                this.getView().setModel(new JSONModel({

                    Productno: "",
                    Productname: "",
                    Fname: "",
                    Lname: "",
                    Memo: ""
                    ,
                }), 'data');

                // 강사님은 아래처럼 했음
                // var oData = {
                //     "Productno": "",
                //     "Productname": "",
                //     "Fname": "",
                //     "Lname": "",
                //     "Memo": "",
                // }7
                //this.getView().setModel(new JSONModel(oData), 'data');
            },
            onRowSelectionChange: function (oEvent) {
                var sPath = oEvent.getParameter('rowContext').getPath();
                // Row 선택 시, 모델 데이터를 가져와서 각각의 Input에 세팅
                //이 때, 세팅하는 방법은 id말고, JSONModel데이터로 해보기
                //JSONModel의 이름은 'data'로 하겠음~!
                //JSONModel의 데이터는 아래와 같이 구성


                // 1. JSONModel, ODataModel 가져오기
                // 2. 사용자가 선택한 Row 경로를 가지고, ODataModel 데이터 가져오기
                // 3. JSONModel 데이터에 사용자가 선택한 Row 데이터 세팅

                // var oSelectedData = this.getView().getModel().getProperty(sPath);
                // this.getView().getModel('data').setData(oSelectedData);
                this.getView().getModel('data').setData(this.getView().getModel().getProperty(sPath));
            },
            onReset: function (oEvent) {

                this.getView().getModel('data').setData();
                //안전하게 하려면 다 쓰는 것도 괜찮은 방법

                //Table 선택 값도 Clear
                this.byId("idTable").clearSelection();

                //모델도 reset
                this.getView().getModel().refresh(true);
            },
            onEntitySet: function (oEvent) {
                // Odata 전체 조회 구현
                // GET 요청 : "/Products"
                var oDataModel = this.getView().getModel();
                oDataModel.read("/Products", {
                    //filters: [], /*필터 객체 조회*/
                    success: function (oReturn) {
                        console.log("전체조회: ", oReturn);
                    },
                    error: function () {
                        console.log("전체조회 중 오류 발생 ", oError);
                    }
                });
            },
            onCreate: function () {
                // Odata에 데이터 생성 구현
                // POST 요청 : "/Products" + Body

                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();

                // 데이터 형식으로 넣는다는 개념으로 접근해서 공부 ㄱㄱ
                // 아래 코드 중 A || '' 의 뜻?
                // => A 값이 없으면(false), 빈 문자열을 넣어라
                var oBody = {
                    //"" 없으면 안됨 이유 여쭤보기
                    /*
                        JavaScript 객체의 속성(키) 이름은 일반적으로 따옴표 없이 사용됩니다. 그러나 속성 이름이 JavaScript의 예약어이거나 공백, 하이픈(-), 특수문자 등을 포함하거나 숫자로 시작하는 경우에는 따옴표로 묶어야 합니다.

                        따라서 주어진 코드에서는 따옴표를 사용하지 않아도 됩니다. 하지만 JSON 형식의 데이터를 다룰 때는 속성 이름을 항상 따옴표로 묶어야 합니다. JSON은 JavaScript 객체와 비슷하지만 엄격한 규칙을 가진 텍스트 형식이기 때문입니다.

                        따라서 JavaScript 코드 내에서는 따옴표 없이 속성 이름을 사용해도 되지만, 이 객체를 JSON 형식으로 변환하여 다른 시스템에 전달하려는 경우에는 속성 이름을 따옴표로 묶는 것이 좋습니다.
                     */
                    // "Productno": oJSONData.Productno,
                    // "Productname": oJSONData.Productname || "",
                    // "Fname": oJSONData.Fname || "",
                    // "Lname": oJSONData.Lname || "",
                    // "Memo": oJSONData.Memo || ""
                    Productno: oJSONData.Productno,
                    Productname: oJSONData.Productname || "",
                    Fname: oJSONData.Fname || "",
                    Lname: oJSONData.Lname || "",
                    Memo: oJSONData.Memo || ""
                };

                oDataModel.create("/Products", oBody, {
                    success: function (oReturn) {
                        sap.m.MessageToast.show("데이터 생성 완료");
                    },
                    error: function () {
                        console.log("데이터 생성 중 오류 발생 ", oError);
                    }
                });
            },
            onEntity: function () {
                // 데이터 한 건 조회
                // GET 요청 : "/Products(ProductNo='1')"

                var oDataModel = this.getView().getModel();

                var oJSONData = this.getView().getModel('data').getData();
                var sPath = oDataModel.createKey("/Products", {
                    Productno: oJSONData.Productno
                });

                oDataModel.read(sPath, {
                    success: function (oReturn) {
                        console.log("한 건 조회: ", oReturn);
                    },
                    error: function (oError) {
                        console.log("한 건 조회 중 오류 발생 ", oError);
                    }
                });
            },
            onUpdate: function () {
                // Data 변경 요청
                // PUT 요청 : "/Products('1000') + Body"

                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products", {
                    Productno: oBody.Productno
                });

                oDataModel.update(sPath, oBody, {
                    success: function (oReturn) {
                        console.log("데이터 수정 완료: ", oReturn);
                    },
                    error: function (oError) {
                        console.log("데이터 수정 중 오류 발생 ", oError);
                    }
                });

            },
            onDelete: function () {
                // 데이터 삭제 요청
                // DELETE 요청 : "/Products('1000')"

                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products", {
                    Productno: oBody.Productno
                });

                oDataModel.remove(sPath, oBody, {
                    success: function (oReturn) {
                        console.log("데이터 수정 완료: ", oReturn);
                    },
                    error: function (oError) {
                        console.log("전체조회 중 오류 발생 ", oError);
                    }
                });
            },
            onDeleteAll: function () {
                var oDataModel = this.getView().getModel();

                oDataModel.read("/Products", {
                    success: function (oData) {
                        oData.results.forEach(function (oProduct) {
                            var sPath = oDataModel.createKey("/Products", {
                                Productno: oProduct.Productno
                            });

                            oDataModel.remove(sPath, {
                                success: function (oReturn) {
                                    console.log("데이터 삭제 완료: ", oReturn);
                                },
                                error: function (oError) {
                                    console.log("전체조회 중 오류 발생 ", oError);
                                }
                            });
                        });
                    },
                    error: function (oError) {
                        console.log("전체조회 중 오류 발생 ", oError);
                    }
                });
            }
        });
    });
