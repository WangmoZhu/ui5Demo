
// ---- sap.ui.fl.transport.TransportDialog --------------------------------------------------------------------------

/**
 * Constructor for a new transport/TransportDialog.
 * 
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial
 * property values, aggregated and associated objects as well as event handlers.
 * See {@link sap.ui.base.ManagedObject#constructor} for a general description of the syntax of the settings object.
 * 
 * @ui5-settings
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul>
 * <li>{@link #getPkg pkg} : string</li>
 * <li>{@link #getTransports transports} : any</li>
 * <li>{@link #getLrepObject lrepObject} : any</li>
 * <li>{@link #getHidePackage hidePackage} : boolean</li>
 * </ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link #event:ok ok} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link #event:cancel cancel} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * </ul>
 * </li>
 * </ul>
 * 
 * In addition, all settings applicable to the base type {@link sap.m.Dialog#constructor sap.m.Dialog}
 * can be used as well.
 * 
 * @param {string} [sId] id for the new control, generated automatically if no id is given
 * @param {object} [mSettings] initial settings for the new control
 * 
 * @class
 * The Transport Dialog Control can be used to implement a value help for selecting an ABAP package and transport request. It is not a generic utility, but part of the Variantmanament and therefore cannot be used in any other application.
 * @extends sap.m.Dialog
 * 
 * @constructor
 * @public
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 * 
 */
sap.ui.fl.transport.TransportDialog = function(sId,mSettings) {};
/**
 * This event will be fired when the user clicks the Cancel button on the dialog.
 * @event
 * 
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.cancel = function(oControlEvent) {  };

/**
 * This event will be fired when the user clicks the OK button on the dialog.
 * @event
 * 
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.ok = function(oControlEvent) {  };

/**
 * Attaches event handler <code>fnFunction</code> to the {@link #event:cancel cancel} event of this <code>sap.ui.fl.transport.TransportDialog</code>.
 * 
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener</code> if specified, 
 * otherwise it will be bound to this <code>sap.ui.fl.transport.TransportDialog</code> itself.
 * 
 * This event will be fired when the user clicks the Cancel button on the dialog.
 * 
 * @param {object}
 *            [oData] An application-specific payload object that will be passed to the event handler along with the event object when firing the event
 * @param {function}
 *            fnFunction The function to be called when the event occurs
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.fl.transport.TransportDialog</code> itself
 * 
 * @returns {sap.ui.fl.transport.TransportDialog} Reference to <code>this</code> in order to allow method chaining
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.attachCancel = function(oData,fnFunction,oListener) { return new sap.ui.fl.transport.TransportDialog(); };

/**
 * Attaches event handler <code>fnFunction</code> to the {@link #event:ok ok} event of this <code>sap.ui.fl.transport.TransportDialog</code>.
 * 
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener</code> if specified, 
 * otherwise it will be bound to this <code>sap.ui.fl.transport.TransportDialog</code> itself.
 * 
 * This event will be fired when the user clicks the OK button on the dialog.
 * 
 * @param {object}
 *            [oData] An application-specific payload object that will be passed to the event handler along with the event object when firing the event
 * @param {function}
 *            fnFunction The function to be called when the event occurs
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.fl.transport.TransportDialog</code> itself
 * 
 * @returns {sap.ui.fl.transport.TransportDialog} Reference to <code>this</code> in order to allow method chaining
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.attachOk = function(oData,fnFunction,oListener) { return new sap.ui.fl.transport.TransportDialog(); };

/**
 * Detaches event handler <code>fnFunction</code> from the {@link #event:cancel cancel} event of this <code>sap.ui.fl.transport.TransportDialog</code>.
 * 
 * The passed function and listener object must match the ones used for event registration.
 * 
 * @param {function}
 *            fnFunction The function to be called, when the event occurs
 * @param {object}
 *            oListener Context object on which the given function had to be called
 * @returns {sap.ui.fl.transport.TransportDialog} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.detachCancel = function(fnFunction,oListener) { return new sap.ui.fl.transport.TransportDialog(); };

/**
 * Detaches event handler <code>fnFunction</code> from the {@link #event:ok ok} event of this <code>sap.ui.fl.transport.TransportDialog</code>.
 * 
 * The passed function and listener object must match the ones used for event registration.
 * 
 * @param {function}
 *            fnFunction The function to be called, when the event occurs
 * @param {object}
 *            oListener Context object on which the given function had to be called
 * @returns {sap.ui.fl.transport.TransportDialog} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.detachOk = function(fnFunction,oListener) { return new sap.ui.fl.transport.TransportDialog(); };

/**
 * Creates a new subclass of class sap.ui.fl.transport.TransportDialog with name <code>sClassName</code>
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of information as described in {@link sap.m.Dialog.extend}.
 * 
 * @param {string} sClassName Name of the class being created
 * @param {object} [oClassInfo] Object literal with information about the class
 * @param {function} [FNMetaImpl] Constructor function for the metadata object; if not given, it defaults to <code>sap.ui.core.ElementMetadata</code>
 * @returns {function} Created class / constructor function
 * @public
 * @static
 * 
 */
sap.ui.fl.transport.TransportDialog.extend = function(sClassName,oClassInfo,FNMetaImpl) { return function() {}; };

/**
 * Fires event {@link #event:cancel cancel} to attached listeners.
 * 
 * @param {object} [mParameters] Parameters to pass along with the event
 * @returns {sap.ui.fl.transport.TransportDialog} Reference to <code>this</code> in order to allow method chaining
 * @protected
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.fireCancel = function(mParameters) { return new sap.ui.fl.transport.TransportDialog(); };

/**
 * Fires event {@link #event:ok ok} to attached listeners.
 * 
 * @param {object} [mParameters] Parameters to pass along with the event
 * @returns {sap.ui.fl.transport.TransportDialog} Reference to <code>this</code> in order to allow method chaining
 * @protected
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.fireOk = function(mParameters) { return new sap.ui.fl.transport.TransportDialog(); };

/**
 * Gets current value of property {@link #getHidePackage hidePackage}.
 * 
 * Flag indicating whether the selection of an ABAP package is to be hidden or not.
 * 
 * @returns {boolean} Value of property <code>hidePackage</code>
 * 
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.getHidePackage = function() { return false; };

/**
 * Gets current value of property {@link #getLrepObject lrepObject}.
 * 
 * The LREP object for which as transport request has to be selected
 * 
 * @returns {any} Value of property <code>lrepObject</code>
 * 
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.getLrepObject = function() { return null; };

/**
 * Returns a metadata object for class sap.ui.fl.transport.TransportDialog.
 * 
 * @returns {sap.ui.base.Metadata} Metadata object describing this class
 * @public
 * @static
 * 
 */
sap.ui.fl.transport.TransportDialog.getMetadata = function() { return new sap.ui.base.Metadata(); };

/**
 * Gets current value of property {@link #getPkg pkg}.
 * 
 * An ABAP package that can be used as default for the ABAP package selection.
 * 
 * @returns {string} Value of property <code>pkg</code>
 * 
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.getPkg = function() { return ""; };

/**
 * Gets current value of property {@link #getTransports transports}.
 * 
 * The set of ABAP transport requests that can be selected by a user.
 * 
 * @returns {any} Value of property <code>transports</code>
 * 
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.getTransports = function() { return null; };

/**
 * Flag indicating whether the selection of an ABAP package is to be hidden or not.
 * @param {boolean}
 *            bHide if set to <code>true</code>, the package selection is hidden.
 * 
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.setHidePackage = function(bHide) {  };

/**
 * The LREP object for which as transport request has to be selected.
 * The property can only be set once and afterwards it cannot be changed.
 * @param {object}
 *            oObject an LREP object for which as transport request has to be selected. The object has the attributes name, namespace and type.
 * 
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.setLrepObject = function(oObject) {  };

/**
 * An ABAP package that can be used as default for the ABAP package selection.
 * The property can only be set once and afterwards it cannot be changed.
 * @param {string}
 *            sPackage an ABAP package that can be used as default for the ABAP package selection.
 * 
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.setPkg = function(sPackage) {  };

/**
 * The set of ABAP transport requests that can be selected by a user.
 * @param {array}
 *            aSelection the set of ABAP transport requests that can be selected by a user.
 * 
 * @public
 * 
 */
sap.ui.fl.transport.TransportDialog.prototype.setTransports = function(aSelection) {  };


// ---- sap.ui.fl.transport.TransportSelection --------------------------------------------------------------------------

/**
 * @public
 * @constructor
 * @version 1.58.0
 * @since 1.38.0
 * Helper object to select an ABAP transport for an LREP object. This is not a generic utility to select a transport request, but part
 *        of the SmartVariant control.
 * @param jQuery.sap.global} jQuery a reference to the jQuery implementation.
 * @param {sap.ui.fl.Utils} Utils a reference to the flexibility utilities implementation.
 * @param {sap.ui.fl.transport.Transports} Transports a reference to the transport service implementation.
 * @param {sap.ui.fl.transport.TransportDialog} TransportDialog a reference to the transport dialog implementation.
 * @param {sap.ui.fl.registry.Settings} FlexSettings a reference to the settings implementation
 * @returns {sap.ui.fl.transport.TransportSelection} a new instance of <code>sap.ui.fl.transport.TransportSelection</code>.
 * 
 */
sap.ui.fl.transport.TransportSelection = function(Utils,Transports,TransportDialog,FlexSettings) {};
/**
 * Prepare all changes and assign them to an existing transport.
 * 
 * @public
 * @param {Object} oTransportInfo - object containing the package name and the transport
 * @param {string} oTransportInfo.packageName - name of the package
 * @param {string} oTransportInfo.transport - ID of the transport
 * @param {Array} aAllLocalChanges - array that includes all local changes
 * @returns {Promise} Returns a Promise which resolves without parameters
 * 
 */
sap.ui.fl.transport.TransportSelection.prototype._prepareChangesForTransport = function(oTransportInfo,aAllLocalChanges) { return null; };

/**
 * Checks transport info object
 * 
 * @param {Object} [oTransportInfo] - transport info object
 * @returns {boolean} returns true if transport info is complete
 * @public
 * 
 */
sap.ui.fl.transport.TransportSelection.prototype.checkTransportInfo = function(oTransportInfo) { return false; };

/**
 * Opens the transport selection dialog
 * 
 * @param {sap.ui.fl.Change} [oChange] - the change for which the transport information should be retrieved
 * @param {object} oControl
 * @returns {Promise} promise that resolves
 * @public
 * 
 */
sap.ui.fl.transport.TransportSelection.prototype.openTransportSelection = function(oChange,oControl) { return null; };

/**
 * Selects a transport request for a given LREP object.
 * First checks if the Adaptation Transport Organizer (ATO) is enabled
 * If ATO is enabled and the layered repository object is in the CUSTOMER layer, the request 'ATO_NOTIFICATION' has to be used.
 * This request triggers in the back end that the change is added to an ATO collection.
 * If ATO is not enabled or LREP object not in CUSTOMER layer:
 * If the LREP object is already assigned to an open transport request or the LREP object is
 * assigned to a local ABAP package, no dialog to select a transport is started. Instead the success callback is invoked directly. The transport
 * dialog is shown if a package or a transport request has still to be selected, so if more than one transport request is available for the
 * current user and the LREP object is not locked in an open transport request.
 * 
 * @param {object} oObjectInfo the LREP object, which has the attributes name, name space, type, layer and package.
 * @param {function} fOkay call-back to be invoked when a transport request has successfully been selected.
 * @param {function} fError call-back to be invoked when an error occurred during selection of a transport request.
 * @param {boolean} bCompactMode flag indicating whether the transport dialog should be opened in compact mode.
 * @param {object} oControl Control instance
 * @public
 * 
 */
sap.ui.fl.transport.TransportSelection.prototype.selectTransport = function(oObjectInfo,fOkay,fError,bCompactMode,oControl) {  };

/**
 * Sets the transports for all changes.
 * 
 * @param {array} aChanges array of {sap.ui.fl.Change}
 * @param {object} oControl object of the root control for the transport
 * @returns {Promise} promise that resolves without parameters
 * @public
 * 
 */
sap.ui.fl.transport.TransportSelection.prototype.setTransports = function(aChanges,oControl) { return null; };


// ---- sap.ui.fl.variants.VariantManagement --------------------------------------------------------------------------

/**
 * Constructor for a new VariantManagement.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial
 * property values, aggregated and associated objects as well as event handlers.
 * See {@link sap.ui.base.ManagedObject#constructor} for a general description of the syntax of the settings object.
 * 
 * @ui5-settings
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul>
 * <li>{@link #getShowExecuteOnSelection showExecuteOnSelection} : boolean (default: false)</li>
 * <li>{@link #getShowSetAsDefault showSetAsDefault} : boolean (default: true)</li>
 * <li>{@link #getManualVariantKey manualVariantKey} : boolean (default: false)</li>
 * <li>{@link #getInErrorState inErrorState} : boolean (default: false)</li>
 * <li>{@link #getEditable editable} : boolean (default: true)</li>
 * <li>{@link #getModelName modelName} : string</li>
 * <li>{@link #getUpdateVariantInURL updateVariantInURL} : boolean (default: false)</li>
 * </ul>
 * </li>
 * <li>Associations
 * <ul>
 * <li>{@link #getFor for} : (sap.ui.core.ID | sap.ui.core.Control)[]</li>
 * </ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link #event:save save} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link #event:manage manage} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link #event:initialized initialized} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link #event:select select} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * </ul>
 * </li>
 * </ul>
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.core.Control#constructor sap.ui.core.Control}
 * can be used as well.
 * 
 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
 * @param {object} [mSettings] Initial settings for the new control
 * 
 * @class
 * The <code>VariantManagement</code> control can be used to manage variants.
 * 
 * <h3>Usage</h3>
 * 
 * You can use this control in most controls that are enabled for <i>UI adaptation at runtime</i>.
 * 
 * @see {@link topic:f1430c0337534d469da3a56307ff76af UI Adaptation at Runtime: Enable Your App}
 * 
 * @extends sap.ui.core.Control
 * @constructor
 * @public
 * @since 1.56
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 * 
 */
sap.ui.fl.variants.VariantManagement = function(sId,mSettings) {};
/**
 * This event is fired when the model and context are set.
 * @event
 * 
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.initialized = function(oControlEvent) {  };

/**
 * This event is fired when users apply changes to variants in the Manage Variants dialog.
 * @event
 * 
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.manage = function(oControlEvent) {  };

/**
 * This event is fired when the Save Variant dialog is closed with OK for a variant.
 * @event
 * 
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {string} oControlEvent.getParameters.name The variant title
 * @param {boolean} oControlEvent.getParameters.overwrite Indicates if an existing variant is overwritten or if a new variant is created
 * @param {string} oControlEvent.getParameters.key The variant key
 * @param {boolean} oControlEvent.getParameters.execute The Execute on Selection indicator
 * @param {boolean} oControlEvent.getParameters.def The default variant indicator
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.save = function(oControlEvent) {  };

/**
 * This event is fired when a new variant is selected.
 * @event
 * 
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {string} oControlEvent.getParameters.key The variant key
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.select = function(oControlEvent) {  };

/**
 * Adds some for into the association {@link #getFor for}.
 * 
 * @param {sap.ui.core.ID | sap.ui.core.Control} vFor The for to add; if empty, nothing is inserted
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.addFor = function(vFor) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Attaches event handler <code>fnFunction</code> to the {@link #event:initialized initialized} event of this <code>sap.ui.fl.variants.VariantManagement</code>.
 * 
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener</code> if specified, 
 * otherwise it will be bound to this <code>sap.ui.fl.variants.VariantManagement</code> itself.
 * 
 * This event is fired when the model and context are set.
 * 
 * @param {object}
 *            [oData] An application-specific payload object that will be passed to the event handler along with the event object when firing the event
 * @param {function}
 *            fnFunction The function to be called when the event occurs
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.fl.variants.VariantManagement</code> itself
 * 
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.attachInitialized = function(oData,fnFunction,oListener) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Attaches event handler <code>fnFunction</code> to the {@link #event:manage manage} event of this <code>sap.ui.fl.variants.VariantManagement</code>.
 * 
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener</code> if specified, 
 * otherwise it will be bound to this <code>sap.ui.fl.variants.VariantManagement</code> itself.
 * 
 * This event is fired when users apply changes to variants in the Manage Variants dialog.
 * 
 * @param {object}
 *            [oData] An application-specific payload object that will be passed to the event handler along with the event object when firing the event
 * @param {function}
 *            fnFunction The function to be called when the event occurs
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.fl.variants.VariantManagement</code> itself
 * 
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.attachManage = function(oData,fnFunction,oListener) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Attaches event handler <code>fnFunction</code> to the {@link #event:save save} event of this <code>sap.ui.fl.variants.VariantManagement</code>.
 * 
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener</code> if specified, 
 * otherwise it will be bound to this <code>sap.ui.fl.variants.VariantManagement</code> itself.
 * 
 * This event is fired when the Save Variant dialog is closed with OK for a variant.
 * 
 * @param {object}
 *            [oData] An application-specific payload object that will be passed to the event handler along with the event object when firing the event
 * @param {function}
 *            fnFunction The function to be called when the event occurs
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.fl.variants.VariantManagement</code> itself
 * 
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.attachSave = function(oData,fnFunction,oListener) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Attaches event handler <code>fnFunction</code> to the {@link #event:select select} event of this <code>sap.ui.fl.variants.VariantManagement</code>.
 * 
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener</code> if specified, 
 * otherwise it will be bound to this <code>sap.ui.fl.variants.VariantManagement</code> itself.
 * 
 * This event is fired when a new variant is selected.
 * 
 * @param {object}
 *            [oData] An application-specific payload object that will be passed to the event handler along with the event object when firing the event
 * @param {function}
 *            fnFunction The function to be called when the event occurs
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.fl.variants.VariantManagement</code> itself
 * 
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.attachSelect = function(oData,fnFunction,oListener) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Detaches event handler <code>fnFunction</code> from the {@link #event:initialized initialized} event of this <code>sap.ui.fl.variants.VariantManagement</code>.
 * 
 * The passed function and listener object must match the ones used for event registration.
 * 
 * @param {function}
 *            fnFunction The function to be called, when the event occurs
 * @param {object}
 *            oListener Context object on which the given function had to be called
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.detachInitialized = function(fnFunction,oListener) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Detaches event handler <code>fnFunction</code> from the {@link #event:manage manage} event of this <code>sap.ui.fl.variants.VariantManagement</code>.
 * 
 * The passed function and listener object must match the ones used for event registration.
 * 
 * @param {function}
 *            fnFunction The function to be called, when the event occurs
 * @param {object}
 *            oListener Context object on which the given function had to be called
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.detachManage = function(fnFunction,oListener) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Detaches event handler <code>fnFunction</code> from the {@link #event:save save} event of this <code>sap.ui.fl.variants.VariantManagement</code>.
 * 
 * The passed function and listener object must match the ones used for event registration.
 * 
 * @param {function}
 *            fnFunction The function to be called, when the event occurs
 * @param {object}
 *            oListener Context object on which the given function had to be called
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.detachSave = function(fnFunction,oListener) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Detaches event handler <code>fnFunction</code> from the {@link #event:select select} event of this <code>sap.ui.fl.variants.VariantManagement</code>.
 * 
 * The passed function and listener object must match the ones used for event registration.
 * 
 * @param {function}
 *            fnFunction The function to be called, when the event occurs
 * @param {object}
 *            oListener Context object on which the given function had to be called
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.detachSelect = function(fnFunction,oListener) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Creates a new subclass of class sap.ui.fl.variants.VariantManagement with name <code>sClassName</code>
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of information as described in {@link sap.ui.core.Control.extend}.
 * 
 * @param {string} sClassName Name of the class being created
 * @param {object} [oClassInfo] Object literal with information about the class
 * @param {function} [FNMetaImpl] Constructor function for the metadata object; if not given, it defaults to <code>sap.ui.core.ElementMetadata</code>
 * @returns {function} Created class / constructor function
 * @public
 * @static
 * 
 */
sap.ui.fl.variants.VariantManagement.extend = function(sClassName,oClassInfo,FNMetaImpl) { return function() {}; };

/**
 * Fires event {@link #event:initialized initialized} to attached listeners.
 * 
 * @param {object} [mParameters] Parameters to pass along with the event
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * @protected
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.fireInitialized = function(mParameters) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Fires event {@link #event:manage manage} to attached listeners.
 * 
 * @param {object} [mParameters] Parameters to pass along with the event
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * @protected
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.fireManage = function(mParameters) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Fires event {@link #event:save save} to attached listeners.
 * 
 * @param {object} [mParameters] Parameters to pass along with the event
 * @param {string} [mParameters.name] The variant title
 * @param {boolean} [mParameters.overwrite] Indicates if an existing variant is overwritten or if a new variant is created
 * @param {string} [mParameters.key] The variant key
 * @param {boolean} [mParameters.execute] The Execute on Selection indicator
 * @param {boolean} [mParameters.def] The default variant indicator
 * 
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * @protected
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.fireSave = function(mParameters) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Fires event {@link #event:select select} to attached listeners.
 * 
 * @param {object} [mParameters] Parameters to pass along with the event
 * @param {string} [mParameters.key] The variant key
 * 
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * @protected
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.fireSelect = function(mParameters) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Gets the currently selected variant key.
 * @public
 * @returns {String} The currently selected variant key. In case the model is yet not set <code>null</code> will be returned.
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getCurrentVariantKey = function() { return null; };

/**
 * Gets current value of property {@link #getEditable editable}.
 * 
 * Indicates that the control is in edit state. If set to <code>false</code> the footer of the views list will be hidden.
 * 
 * Default value is <code>true</code>.
 * @returns {boolean} Value of property <code>editable</code>
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getEditable = function() { return false; };

/**
 * Returns array of IDs of the elements which are the current targets of the association {@link #getFor for}.
 * 
 * @returns {sap.ui.core.ID[]}
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getFor = function() { return new Array(); };

/**
 * Gets current value of property {@link #getInErrorState inErrorState}.
 * 
 * Indicates that the control is in error state. If set to <code>true</code> error message will be displayed whenever the variant is
 * opened.
 * 
 * Default value is <code>false</code>.
 * @returns {boolean} Value of property <code>inErrorState</code>
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getInErrorState = function() { return false; };

/**
 * Gets current value of property {@link #getManualVariantKey manualVariantKey}.
 * 
 * If set to<code>true</code>, the key for a vendor variant will be added manually.<br>
 * <b>Node:</b>This flag is only used internally in the app variant scenarios.
 * 
 * Default value is <code>false</code>.
 * @returns {boolean} Value of property <code>manualVariantKey</code>
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getManualVariantKey = function() { return false; };

/**
 * Returns a metadata object for class sap.ui.fl.variants.VariantManagement.
 * 
 * @returns {sap.ui.base.Metadata} Metadata object describing this class
 * @public
 * @static
 * 
 */
sap.ui.fl.variants.VariantManagement.getMetadata = function() { return new sap.ui.base.Metadata(); };

/**
 * Gets current value of property {@link #getModelName modelName}.
 * 
 * Determines the name of the model. The binding context will be defined by the current ID.
 * <p>
 * <b>Note:</b> In a UI adaptation scenario, this property is not used at all because the model name is <i>$FlexVariants</i>
 * 
 * @returns {string} Value of property <code>modelName</code>
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getModelName = function() { return ""; };

/**
 * Gets current value of property {@link #getShowExecuteOnSelection showExecuteOnSelection}.
 * 
 * Indicates that Execute on Selection is visible in the Save Variant and the Manage Variants dialogs.
 * 
 * Default value is <code>false</code>.
 * @returns {boolean} Value of property <code>showExecuteOnSelection</code>
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getShowExecuteOnSelection = function() { return false; };

/**
 * Gets current value of property {@link #getShowSetAsDefault showSetAsDefault}.
 * 
 * Indicates that set as default is visible in the Save Variant and the Manage Variants dialogs.
 * 
 * Default value is <code>true</code>.
 * @returns {boolean} Value of property <code>showSetAsDefault</code>
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getShowSetAsDefault = function() { return false; };

/**
 * Returns the title control of the VariantManagement. Usage in RTA scenario.
 * @protected
 * @returns {sap.m.Title} title part of the VariantManagement control.
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getTitle = function() { return new sap.m.Title(); };

/**
 * Gets current value of property {@link #getUpdateVariantInURL updateVariantInURL}.
 * 
 * Determines the intention of setting the current variant based on passed information.
 * <p>
 * <b>Note:</b> The VariantManagement control does not react in any way to this property.
 * 
 * Default value is <code>false</code>.
 * @returns {boolean} Value of property <code>updateVariantInURL</code>
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getUpdateVariantInURL = function() { return false; };

/**
 * Retrieves all variants.
 * @public
 * @returns {array} with all variants. In case the model is yet not set an empty array will be returned.
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.getVariants = function() { return null; };

/**
 * Opens the manage dialog.
 * @public
 * @param {boolean} bCreateAlways in case this is set to <code>true</code> the former dialog will be destroyed, before a new one is created.
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.openManagementDialog = function(bCreateAlways) {  };

/**
 * Removes all the controls in the association named {@link #getFor for}.
 * @returns {sap.ui.core.ID[]} An array of the removed elements (might be empty)
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.removeAllFor = function() { return new Array(); };

/**
 * Removes an for from the association named {@link #getFor for}.
 * @param {int | sap.ui.core.ID | sap.ui.core.Control} vFor The for to be removed or its index or ID
 * @returns {sap.ui.core.ID} The removed for or <code>null</code>
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.removeFor = function(vFor) { return new sap.ui.core.ID(); };

/**
 * Sets the new selected variant.
 * @public
 * @param {String} sKey the variant key which should be selected.
 * @returns {sap.ui.fl.variants.VariantManagement} the current instance of {@link sap.ui.fl.variants.VariantManagement}.
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.setCurrentVariantKey = function(sKey) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Sets a new value for property {@link #getEditable editable}.
 * 
 * Indicates that the control is in edit state. If set to <code>false</code> the footer of the views list will be hidden.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>true</code>.
 * @param {boolean} bEditable New value for property <code>editable</code>
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.setEditable = function(bEditable) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Sets a new value for property {@link #getInErrorState inErrorState}.
 * 
 * Indicates that the control is in error state. If set to <code>true</code> error message will be displayed whenever the variant is
 * opened.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>false</code>.
 * @param {boolean} bInErrorState New value for property <code>inErrorState</code>
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.setInErrorState = function(bInErrorState) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Sets a new value for property {@link #getManualVariantKey manualVariantKey}.
 * 
 * If set to<code>true</code>, the key for a vendor variant will be added manually.<br>
 * <b>Node:</b>This flag is only used internally in the app variant scenarios.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>false</code>.
 * @param {boolean} bManualVariantKey New value for property <code>manualVariantKey</code>
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.setManualVariantKey = function(bManualVariantKey) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Sets a new value for property {@link #getModelName modelName}.
 * 
 * Determines the name of the model. The binding context will be defined by the current ID.
 * <p>
 * <b>Note:</b> In a UI adaptation scenario, this property is not used at all because the model name is <i>$FlexVariants</i>
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * @param {string} sModelName New value for property <code>modelName</code>
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.setModelName = function(sModelName) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Sets a new value for property {@link #getShowExecuteOnSelection showExecuteOnSelection}.
 * 
 * Indicates that Execute on Selection is visible in the Save Variant and the Manage Variants dialogs.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>false</code>.
 * @param {boolean} bShowExecuteOnSelection New value for property <code>showExecuteOnSelection</code>
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.setShowExecuteOnSelection = function(bShowExecuteOnSelection) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Sets a new value for property {@link #getShowSetAsDefault showSetAsDefault}.
 * 
 * Indicates that set as default is visible in the Save Variant and the Manage Variants dialogs.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>true</code>.
 * @param {boolean} bShowSetAsDefault New value for property <code>showSetAsDefault</code>
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.setShowSetAsDefault = function(bShowSetAsDefault) { return new sap.ui.fl.variants.VariantManagement(); };

/**
 * Sets a new value for property {@link #getUpdateVariantInURL updateVariantInURL}.
 * 
 * Determines the intention of setting the current variant based on passed information.
 * <p>
 * <b>Note:</b> The VariantManagement control does not react in any way to this property.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>false</code>.
 * @param {boolean} bUpdateVariantInURL New value for property <code>updateVariantInURL</code>
 * @returns {sap.ui.fl.variants.VariantManagement} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.ui.fl.variants.VariantManagement.prototype.setUpdateVariantInURL = function(bUpdateVariantInURL) { return new sap.ui.fl.variants.VariantManagement(); };


// ---- SwitchChanges --------------------------------------------------------------------------

// ---- static fields of namespaces ---------------------------------------------------------------------
