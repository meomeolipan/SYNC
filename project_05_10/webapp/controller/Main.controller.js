sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/data/FlattenedDataset',
    "sap/viz/ui5/controls/common/feeds/FeedItem"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, FlattenedDataset, FeedItem) {
        "use strict";

        return Controller.extend("project0510.controller.Main", {
            onInit: function () {

                var oData = {
                    list: [
                        { name: 'aaa', rate: '35', cost: '10' },
                        { name: 'bbb', rate: '15', cost: '12' },
                        { name: 'ccc', rate: '10', cost: '11' },
                        { name: 'ddd', rate: '15', cost: '15' },
                        { name: 'eee', rate: '20', cost: '10' },
                        { name: 'fff', rate: '5', cost: '16' }
                    ]
                }

                this.getView().setModel(new JSONModel(oData), "view");


                var oPopover = this.byId("idPopover");
                oPopover.connect(this.byId("idLineChart").getVizUid());

                //this가 무조건 붙여져 있어야함!
                //함수앞에 _ 언더바 붙으면 해당 js 파일 내에서만 사용하는 함수라는
                //개발자 사이의 암묵적 룰같은 느낌
                this._setChartInController();

            },
            _setChartInController: function () {
                var oData = {
                    sales: [
                        { product: "Jackets", amount: "65" },
                        { product: "Shirts", amount: "70" },
                        { product: "Pants", amount: "83" },
                        { product: "Coats", amount: "92" },
                        { product: "Purse", amount: "77" }

                    ]
                }
                this.getView().setModel(new JSONModel(oData), 'cont');

                var oColFrame = this.byId("idColChart");

                //dataset
                var oColDataset = new FlattenedDataset({
                    dimensions: [
                        {
                            name: 'Product', // 카테고리명 
                            value: '{cont>product}' // 데이터 정보
                        }
                    ],
                    measures: [
                        {
                            name: 'Amount',
                            value: '{cont>amount}'
                        }
                    ],
                    data: {
                        path: 'cont>/sales'  //중괄호 여쭤보기
                    }
                });

                oColFrame.setDataset(oColDataset);
                //setDataset = https://ui5.sap.com/1.120.4/#/api/sap.viz.ui5.controls.VizFrame%23methods/Summary

                var feedColValueAxis = new FeedItem({
                    uid: 'valueAxis',
                    type: 'Measure',
                    values: ['Amount'] //위의 dataset과 동일해야함!

                });

                var feedColCategoryAxis = new FeedItem({
                    uid: 'categoryAxis',
                    type: 'Dimension',
                    values: ['Product']
                });

                oColFrame.addFeed(feedColValueAxis);
                oColFrame.addFeed(feedColCategoryAxis);

                // oColFrame.setVizProperties({
                //     title : { text : '두 번째 차트' }
                // });
            }

        });
    });
