sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/core/routing/History","sap/m/MessageToast"
], function(Controller, History, MessageToast) {
	"use strict";

	return Controller.extend("ZNav.controller.V_Project_Create", {
		fGoToTarget_1: function(Evt) {
			//This code was generated by the layout editor.
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			// Go one screen back if you find a Hash
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} // If you do not find a correct Hash, go to the Source screen using default router;
			else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("", true);
			}
		},
		fSaveProj: function() {
			/*create operation*/
			var dialog = new sap.m.BusyDialog({ text:'Creating Record'});
            dialog.open();

			var oModel = this.getView().getModel();
			var oEntry = {};

			oEntry.ZprojId = this.getView().byId("idProjId").getValue();
			 if(oEntry.ZprojId === "")
             {
             dialog.close();	
              MessageToast.show("Please enter Project Id");
             }
             else
             {
			oEntry.ZprDesc = this.getView().byId("idProjDesc").getValue();
			oEntry.ZprStdate = this.getView().byId("idProjStart").getValue();
			oEntry.ZprEndate = this.getView().byId("idProjEnd").getValue();
			oEntry.ZprStdate = oEntry.ZprStdate + "T00:00:00";
			oEntry.ZprEndate = oEntry.ZprEndate + "T00:00:00";

			oModel.create("/ProjMasterSet", oEntry, {
				method: "POST",
				success: function(data) {
					dialog.close();
					MessageToast.show("Record has been created successfully");
				    var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			// Go one screen back if you find a Hash
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} // If you do not find a correct Hash, go to the Source screen using default router;
			else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("", true);
			}
				},
				error: function(e) {
					dialog.close();
                    MessageToast.show("Entry already exist");

				}
			});
             }
		}
	});

});