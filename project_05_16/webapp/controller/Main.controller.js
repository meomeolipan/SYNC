sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project0516.controller.Main", {
            onInit: function () {

                this.byId("idImage").setSrc("../image/00000000.jpg");

                this.byId("idImage2").setSrc(_rootPath + "/image/00000001.jpg");

                this.byId("idImage3").setSrc(_rootPath + "/image/00000002.jpg");

                this.byId("idImage4").setSrc(_rootPath + "/image/00000003.jpg");

            },
            fnImage: function (sValue) {
                return `${_rootPath}/image/${sValue}.jpg`;
                // this.byId(oEvent).setSrc(_rootPath + "/image/" + String(oEvent) + ".jpg");
            }
        });
    });
