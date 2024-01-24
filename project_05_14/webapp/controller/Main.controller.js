sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast, Fragment, Filter) {
        "use strict";

        return Controller.extend("project0514.controller.Main", {
            onInit: function () {
                this.getView().setModel(new JSONModel({
                    Memid: "",
                    Memnm: "",
                    Telno: "",
                    Email: "",
                    WorkSet: []
                }), 'data');

            },
            onRowSelectionChange: function (oEvent) {
                // Row 선택 해제 되었을 때도, '선택'된 것이기 때문에 이벤트 발생
                // 따라서 rowContext가 없을 땐 함수 종료하도록 함
                if (!oEvent.getParameter('rowContext')) return;

                var sPath = oEvent.getParameter('rowContext').getPath();
                var oSelectedData = this.getView().getModel().getProperty(sPath);
                var oJSONDModel = this.getView().getModel('data');

                oJSONDModel.setData(oSelectedData);
            },
            onReset: function (oEvent) {

                this.getView().getModel('data').setData();

                this.byId("idTable").clearSelection();

                this.getView().getModel().refresh(true);
            },
            onEntitySet: function (oEvent) {
                var oDataModel = this.getView().getModel();

                var oButton = oEvent.getSource(),
                    oView = this.getView();

                // create popover
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(), // 해당 코드가 없으면 추후에 있을 코드는 sap.ui.getCore().byId()로 써야함

                        name: "project0514.view.fragment.Popover",
                        controller: this
                    }).then(function (oPopover) {
                        oPopover.setModel(new JSONModel(

                        ), 'popover');
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }
                this._pPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });

                // oDataModel.read("/Member", {
                //     success: function () {
                //         MessageBox.success("\"Member \" 데이터 전체 조회 성공");
                //     },
                //     error: function () {
                //         MessageBox.error("\"Member \" 데이터 전체 조회 오류");
                //     }
                // });
            },
            onRead: function () {
                // var oPop*over = sap.ui.getCore().byId("myPopover");

                //Fragment.load() 사용 시,
                // view id를 같이 넘겨줬기 때문에 view 안에 popover가 붙게됨
                // 따라서 this.byId()로 접근 가능
                var oPopover = this.byId("myPopover");
                var oPopoverData = oPopover.getModel('popover').getData();

                console.log(oPopoverData);
                /*
                    해당 모델 데이터로 {Membername : "입력값"} 얻을 수 있음
                    입력값을 가지고 필터 객체 생성 후, ODataModel.read()
                    사용하여 데이터 조회해보기. 필터 조건은 Contains
                */

                var oFilter = new Filter("Memnm", "EQ", oPopoverData.Membername);

                var oDataModel = this.getView().getModel();

                oDataModel.read("/Member", {
                    urlParameters: {
                        "$expand": "WorkSet",
                        "$select": "Memid,WorkSet"
                    },
                    filters: [oFilter],
                    success: function (oReturn) {

                        console.log(`검색어(${oPopoverData.Membername}) : `, oReturn.results);
                    },
                    error: function () {
                        console.log("전체조회 중 오류 발생 ", oError);
                    }
                });

            },
            onCreate: function () {
                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();
                var oBody = {
                    Memid: oJSONData.Memid,
                    Memnm: oJSONData.Memnm,
                    Telno: oJSONData.Telno,
                    Email: oJSONData.Email,
                    WorkSet: [
                        {
                            Memid: oJSONData.Memid,
                            Workno: "00001",
                            Worknm: "집",
                            Erdat: "2024-01-19T16:00:00",
                            Memo: "가고싶다"
                        },
                        {
                            Memid: oJSONData.Memid,
                            Workno: "00002",
                            Worknm: "침대",
                            Erdat: "2024-01-19T16:00:00",
                            Memo: "눕고싶다"
                        }
                    ]
                };

                // 바로 아래 코드 수정 필요
                // oDataModel.create("/Member", oBody, { this.showMessageBox("create", oJSONData.Memid) });

                oDataModel.create("/Member", oBody, {
                    // 서버 요청 끝난 후 작업은 해당 함수 안에서 구현
                    // 해당 함수 안에서는  this가 달라지기 때문에,
                    // 이전에 사용하던 this를 그대로 넘겨주기 위해서
                    // .bind(this)를 적용시킴
                    success: function () {
                        MessageBox.success("\"Member \" 데이터 중 " + oJSONData.Memid + " 생성 성공");
                    },
                    error: function () {
                        MessageBox.error("\"Member \" 데이터 중 " + oJSONData.Memid + " 생성 오류");
                    }
                });
            },
            onEntity: function () {
                var oDataModel = this.getView().getModel();

                // 예를 들어, 이 시점에서 oJSONData는 { Memid: '123', Memnm: '', Telno: '', Email: '' }와 같다고 가정
                var oJSONData = this.getView().getModel('data').getData();

                // 여기에서는 "/Member" 엔티티의 키를 생성
                // oJSONData.Memid 값을 사용하여 키를 생성하므로, 이 시점에서 oJSONData.Memid는 '123'이라고 가정할 때,
                // 결과적으로 sPath는 "/Member('123')"와 같은 문자열이 됨
                var sPath = oDataModel.createKey("/Member", {
                    Memid: oJSONData.Memid
                });

                // // read 메서드가 성공적으로 완료되면 이 success 콜백 함수가 호출
                // // 이때, oData 인자로는 조회된 데이터가 전달
                // // 예를 들어, { Memid: '123', Memnm: '홍길동', Telno: '010-1234-5678', Email: 'hong@example.com' }
                // oDataModel.read(sPath, {
                //     success: function (oData) {
                //         // 이 시점에서 oData는 조회된 데이터이고, oJSONData는 read 메서드 호출 전의 데이터
                //         // 따라서, 여기서 oJSONData를 사용하면 조회된 데이터가 아닌 이전 상태의 데이터를 사용
                //         // 그래서 MessageBox에 표시되는 내용이 업데이트되지 않음
                //         // 이 문제를 해결하려면 oData를 사용해야 함
                //         MessageBox.success("\"Member \" 데이터 중 \"" + oData.Memid +
                //             "\" 조회 성공\nMember Name: " + oData.Memnm + "\n" +
                //             "Member Tel no: " + oData.Telno + "\n" +
                //             "Member Email: " + oData.Email);
                //     },
                //     error: function () {
                //         MessageBox.error("\"Member \" 데이터 중 " + oJSONData.Memid + " 조회 오류");
                //     }
                // });
                oDataModel.read(sPath, this.showMessageBox("entity", oJSONData.getProperty(sPath)));
            },
            onUpdate: function () {
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();

                var sPath = oDataModel.createKey("/Member", {
                    Memid: oBody.Memid
                });

                // oDataModel.update(sPath, oBody, {
                //     success: function () {
                //         MessageBox.success("\"Member \" 데이터 중 " + oBody.Memid + " 수정 성공");
                //     },
                //     error: function () {
                //         MessageBox.error("\"Member \" 데이터 중 " + oBody.Memid + " 수정 오류");
                //     }
                // });
                oDataModel.update(sPath, this.showMessageBox("entity", oJSONData.getProperty(sPath)));
            },
            onDelete: function () {
                var oBody = this.getView().getModel('data').getData();

                var oDataModel = this.getView().getModel();

                var sPath = oDataModel.createKey("/Member", {
                    Memid: oBody.Memid
                })

                oDataModel.remove(sPath, {
                    success: function () {
                        this._showMessage(Delete, t);
                    }.bind(this),
                    error: function (oError) {
                        this._showMessage(Delete, f);
                    }
                });
            },
            _showMessageBox: function (sType, sId) {
                switch (sType) {
                    case "create":
                        return {
                            success: function () {
                                MessageBox.success("\"Member \" 데이터 중 " + sId + " 생성 성공");
                            },
                            error: function () {
                                MessageBox.error("\"Member \" 데이터 중 " + sId + " 생성 오류");
                            }
                        };
                    case "entity":
                        return {
                            success: function (oData) {
                                MessageBox.success("\"Member \" 데이터 중 \"" + oData.Memid + "\" 조회 성공\nMember Name: " + oData.Memnm + "\n" + "Member Tel no: " + oData.Telno + "\n" + "Member Email: " + oData.Email);
                            },
                            error: function () {
                                MessageBox.error("\"Member \" 데이터 중 " + sId + " 조회 오류");
                            }
                        };
                    case "update":
                        return {
                            success: function () {
                                MessageBox.success("\"Member \" 데이터 중 " + sId + " 수정 성공");
                            },
                            error: function () {
                                MessageBox.error("\"Member \" 데이터 중 " + sId + " 수정 오류");
                            }
                        };

                }
            }
        });
    });
