sap.ui.define(["sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History",
		"sap/m/MessageToast",
		"sap/ui/core/ValueState",
		"sap/m/MessageBox"
		
	],
	function(Controller, History, MessageToast, ValueState ,MessageBox) {
		"use strict";
		var chk;
		return Controller.extend("ZNav.controller.V_Dev_Create", {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf ZNav.view.V_Dev_Create
			 */ //
			 onInit: function() {
				// fvalidation : function()
		var oView = this.getView();
                   oView.addEventDelegate({
                onBeforeShow: function(oEvent) {
                oView.byId("idDevId").setValue("");
                oView.byId("idDevName").setValue("");
                oView.byId("idDevActive").setSelected("");
                }

    }, oView);    

			 },
			//	},
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf ZNav.view.V_Dev_Create
			 * 
									/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf ZNav.view.V_Dev_Create
			 */ //	onAfterRendering: function() {
			//
			//	},
			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf ZNav.view.V_Dev_Create
			//  */ //	onExit: function() {
			// //
			// //	}
			/**
			 *@memberOf ZNav.controller.V_Dev_Create
			 */
			 
			// onselect: function() {
				
			// },
			// fvalidation: function() {
			// {
			//     var oModel = this.getView().getModel();
			// 	var oEntry = {};
			// 	oEntry.Zdeveloper = this.getView().byId("idDevId").getValue();
			// 	if (oEntry.Zdeveloper < 1 )
			// 	{
			// 	this.getView().byId("idDevId").setValueState(sap.ui.core.ValueState.Error);	
			// 	}
			// 	else
			// 	{
			// 	this.getView().byId("idDevId").setValueState(sap.ui.core.ValueState.None);		
			// 	}
			// }
			// },

			fGoToDevDisplay: function() {
				//This code was generated by the layout editor.
				//This code was generated by the layout editor.
				this.getView().byId("idDevId").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("idDevId").destroyTooltip();
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
		
			fSaveDev: function() {
				var iError = 0;;
				// var dialog = new sap.m.BusyDialog({
				// 	text: 'Creating Record'
				// });
				// dialog.open();
				/*create operation*/
				var oModel = this.getView().getModel();
				var oEntry = {};
			    oEntry.Zdeveloper = this.getView().byId("idDevId").getValue();
			    if( oEntry.Zdeveloper === "" ||  oEntry.Zdeveloper < 1 ){ 
				this.getView().byId("idDevId").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("idDevId").setTooltip("Please enter a valid value");
				iError++;
		    	}
		    	else{
					this.getView().byId("idDevId").setValueState(sap.ui.core.ValueState.None);
					this.getView().byId("idDevId").destroyTooltip();
		     	}
		     	if (iError > 0){ 
				return;
			}
				else 
		 	{
				// if (oEntry.Zdeveloper === "") {
				// 	dialog.close();
				// 	MessageToast.show("Please enter Developer ID");
				// } else {
					oEntry.ZdeveloperName = this.getView().byId("idDevName").getValue();
					oEntry.Zactive        = this.getView().byId("idDevActive").getSelected();
				
				
					oModel.create("/DevMasterSet", oEntry, {
						method: "POST",
						success: function(data) {
							// dialog.close();
							MessageBox.success("Record has been succesfully created");
							var oHistory = History.getInstance();
							var sPreviousHash = oHistory.getPreviousHash();
							if (sPreviousHash !== undefined) {
								window.history.go(-1);
							} // If you do not find a correct Hash, go to the Source screen using default router;
							else {
								var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
								oRouter.navTo("", true);
							}
						},
						error: function(e) {
							// dialog.close();
							MessageBox.error("Entry already exist");
						}
					});
				}
			}
		});
	});
