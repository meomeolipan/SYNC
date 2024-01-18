sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("odata.project0509.controller.Main", {
            onInit: function () {
                //각 객체의 id를 가져오는 방법도 있지만
                //아래와 같은 JSONModel 방법도 있음
                //oData 안의 데이터는 없어도 됨
                //아래는 이해를 돕기 위해 쓰는 것일 뿐
                var oData = {
                    OrderID: '',
                    CustomerID: '',
                    OrderDate_start: null,
                    OrderDate_end: null
                };

                this.getView().setModel(new JSONModel(), 'search')
            },
            fnDateToString: function (sValue) {
                if (sValue) {
                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern: 'yyyy/MM/dd'
                    });

                    return oFormat.format(sValue);
                }
            },
            onValueHelpRequest: function () {

                this.byId("idCustomerDialog").open();

                // var dialog = sap.ui.getCore().byId("idDialog");
                // if (!dialog) {
                //     Fragment.load({
                //         name: "project0509.view.fragment.CustomerID",//경로
                //         type: "XML",
                //         controller: this
                //     }).then(function (oDialog) {
                //         oDialog.open();
                //     });
                // } else {
                //     dialog.open();
                // }

                // // 필드 목록을 정의합니다.
                // var aItems = [
                //     new sap.m.StandardListItem({ title: "OrderID" }),
                //     new sap.m.StandardListItem({ title: "CustomerID" }),
                //     new sap.m.StandardListItem({ title: "EmployeeID" }),
                //     new sap.m.StandardListItem({ title: "OrderDate" }),
                //     new sap.m.StandardListItem({ title: "RequiredDate" }),
                //     new sap.m.StandardListItem({ title: "ShippedDate" })
                // ];

                // // 검색 도우미 대화상자를 만듭니다.
                // var oValueHelpDialog = new sap.m.SelectDialog({
                //     title: "Select Field",
                //     items: aItems,
                //     confirm: function (oEvent) {
                //         // 사용자가 필드를 선택하면, 선택한 필드를 검색 필드로 설정합니다.
                //         var oSelectedItem = oEvent.getParameter("selectedItem");
                //         if (oSelectedItem) {
                //             this.sSearchField = oSelectedItem.getTitle();

                //             // 레이블의 텍스트를 선택한 필드로 설정합니다.
                //             var oLabel = this.getView().byId("idOrder");
                //             oLabel.setText(this.sSearchField + ":");
                //         }
                //     }.bind(this),
                //     cancel: function () {
                //         this.sSearchField = null;
                //     }.bind(this)
                // });

                // // 대화상자를 표시합니다.
                // oValueHelpDialog.open();
            },
            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
            },
            onSearch: function () {
                // // Input 객체에서 검색 값을 가져옵니다.
                // var oInput = this.getView().byId("idOrderID");
                // var sSearchValue = oInput.getValue();

                // // 테이블과 바인딩 정보를 가져옵니다.
                // var oTable = this.getView().byId("idProductsTable");
                // var oBinding = oTable.getBinding("items");

                // // 검색 조건을 설정합니다.
                // var aFilters = [];
                // if (this.sSearchField && sSearchValue) {
                //     var oFilter = new sap.ui.model.Filter(this.sSearchField,
                //         sap.ui.model.FilterOperator.EQ,
                //         sSearchValue);
                //     aFilters.push(oFilter);
                // }

                // // 바인딩에 필터를 적용합니다.
                // oBinding.filter(aFilters);

                /*filter 사용 시 */

                var sOrderID = this.byId("idOrderID").getValue();
                // var aFilter = [];

                // if (sOrderID) {
                //     aFilter.push(new Filter({
                //         path: 'OrderID', // 대상 필드면
                //         operator: FilterOperator.EQ, //연산자(조건)
                //         value1: sOrderID, // 값 (BT의 경우 From)
                //         value2: ''
                //     }));
                // };

                // this.getView().byId("idTable").getBinding("items").filter(aFilter);

                var sCustomerID = this.byId("idCustomerID").getValue();

                // if (sCustomerID) {
                //     aFilter.push(new Filter('CustomerID', 'Contains', sCustomerID));
                // };

                // this.getView().byId("idTable").getBinding("items").filter(aFilter);

                /*filters 사용 시 */

                var oSearchData = this.getView().getModel('search').getData();
                //oSearchData { OrderID : '', CustomerID: '',
                //              OrderDate_start: '', OrderDate_end: ''}
                //아래 로직에서 밑의 변수들은 다 같은 값으로 작용함
                // 모델기반의 데이터방식으로 사용하려면 oSearchData 쓰면됨
                // oSearchData.OrderID == sOrderID
                // oSearchData.CustomerID == sCustomerID
                // oSearchData.OrderDate_start == sOrderDate.getDateValue()
                // oSearchData.OrderDate_end == sOrderDate.getSecondDateValue()

                // var sOrderID = this.byId("idOrderID").getValue();
                // var sCustomerID = this.byId("idCustomerID").getValue();
                var aFilter = [];
                if (sOrderID) aFilter.push(new Filter('OrderID', 'EQ', sOrderID));
                if (sCustomerID) aFilter.push(new Filter('CustomerID', 'Contains', sCustomerID));

                // var oFilter = new Filter({
                //     filters: [
                //         new Filter('OrderID', 'EQ', sOrderID),
                //         new Filter('CustomerID', 'Contains', sCustomerID)
                //     ],
                //     and: false // OR 조건이 됨 
                // });

                this.byId("idTable").getBinding("items").filter(new Filter({
                    filters: aFilter,
                    and: false
                }));

                //filters 쓸 때 주의, aFilter 배열에 필터 객체가 1개 이상인 경우만 적용하고
                //필터 객체가 없는 빈 배열이면 적용하지 않기

                var sOrderDate = this.byId("idOrderDate");
                var aFilter = [];
                if (sOrderDate.getDateValue() && sOrderDate.getSecondDateValue()) aFilter.push(new Filter(
                    'OrderDate',
                    'BT',
                    sOrderDate.getDateValue(),
                    sOrderDate.getSecondDateValue()));

                this.byId("idTable").getBinding("items").filter(aFilter);
            },
            //sap.m.Table 에서 selectionChange 이벤트 실행
            onSelectionChange: function (oEvent) {
                //상대 경로로 지정되어 있는 데이터 셋에서, 내가 선택한 Row의 모델 경로를 얻음
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                // 모델 경로를 통해서, 해당 경로의 전체 데이터를 얻음
                var oSelectData = this.getView().getModel().getProperty(sPath);

                // alert(oSelectData.OrderID);

                //Dialog 호출
                //local 이름의 JSONModel이 전역으로 사용할 수 있도록 생성되어 있음
                //local 모델에 데이터를 담아놓으면
                //Dialog에서도 사용이 가능함!   

                //주의) Fragment.load()를 통해서, 팝업 호출 시
                // 해당 팝업에 모델 데이터를 띄우기 위해서는
                // 호출된 Dialog에 .setModel(모델객체) 해줘야 함

                this.oRouter = this.getOwnerComponent().getRouter();
                //OrderID: oSelectData.OrderID 라고 기입해야하는 이유 알아보기
                //                                { key 값은 manifest.json에 명시된 pattern 값과 동일해야함.}
                this.oRouter.navTo("RouteDetail", { OrderID: oSelectData.OrderID }, true);
            }
        });
    });