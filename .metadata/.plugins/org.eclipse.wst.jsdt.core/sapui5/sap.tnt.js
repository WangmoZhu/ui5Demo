
// ---- sap.tnt --------------------------------------------------------------------------


// ---- sap.tnt.InfoLabel --------------------------------------------------------------------------

/**
 * Constructor for a new <code>InfoLabel</code>.
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
 * <li>{@link #getText text} : string (default: )</li>
 * <li>{@link #getRenderMode renderMode} : sap.tnt.RenderMode (default: Loose)</li>
 * <li>{@link #getColorScheme colorScheme} : int (default: 7)</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize</li>
 * <li>{@link #getDisplayOnly displayOnly} : boolean (default: false)</li>
 * <li>{@link #getTextDirection textDirection} : sap.ui.core.TextDirection (default: Inherit)</li>
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
 * The <code>InfoLabel</code> is a small non-interactive control which contains text information and non-semantic color chosen from a list of predefined color schemes. It serves the purpose to attract the user attention to some piece of information (state, quantity, condition, etc.).
 * 
 * <h3>Overview</h3>
 * 
 * The control visualizes text information without user interaction. The text inside the control is always in upper case. It can have smaller or larger side paddings which can be specified by the <code>renderMode</code> property.
 * The  text-background color pair can be changed by setting a digit between 1 and 9 that corresponds to the 9 predefined color combinations of the <code>colorScheme</code> property.
 * The control is designed to be vertically aligned with UI5 Input and Button control families.
 * When using <code>InfoLabel</code> in non-editable <code>Forms</code>, <code>Tables</code>, etc., set <code>displayOnly=true</code> for best visual results.
 * 
 * <h3>Usage Guidelines</h3>
 * <ul>
 * <li>If the text is longer than the width of the control, it doesn’t wrap. Instead, it’s represented as ellipsis. </li>
 * <li>When truncated, the full text in the control is not visible. Therefore, it’s recommended to make more space for longer items to be fully displayed.</li>
 * <li>Colors are not semantic and have no visual representation in sap_belize_hcb and sap_belize_hcw themes.</li>
 * <li>The control shows plain text only, formatting is not visualized.</li>
 * </ul>
 * 
 * @extends sap.ui.core.Control
 * @version 1.58.0
 * 
 * @constructor
 * @public
 * @since 1.54
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 * 
 */
sap.tnt.InfoLabel = function(sId,mSettings) {};
/**
 * Binds property {@link #getText text} to model data.
 * 
 * See {@link sap.ui.base.ManagedObject#bindProperty ManagedObject.bindProperty} for a 
 * detailed description of the possible properties of <code>oBindingInfo</code>
 * @param {object} oBindingInfo The binding information
 * @returns {sap.tnt.InfoLabel} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.bindText = function(oBindingInfo) { return new sap.tnt.InfoLabel(); };

/**
 * Creates a new subclass of class sap.tnt.InfoLabel with name <code>sClassName</code>
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
sap.tnt.InfoLabel.extend = function(sClassName,oClassInfo,FNMetaImpl) { return function() {}; };

/**
 * Gets current value of property {@link #getColorScheme colorScheme}.
 * 
 * Specifies the fill and text color of the control. Accepts a digit as a value.
 * You can choose from 9 predefined background and text color combinations.
 * The color schemes are non-semantic, you can select them according to your own preferences.
 * The default <code>colorScheme</code> is 7.
 * 
 * Default value is <code>7</code>.
 * @returns {int} Value of property <code>colorScheme</code>
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.getColorScheme = function() { return 0; };

/**
 * Gets current value of property {@link #getDisplayOnly displayOnly}.
 * 
 * Determines if the <code>InfoLabel</code> is in <code>displayOnly</code> mode.
 * When set to <code>true</code> the control size adjusts to fit other controls, for example non-editable <code>Forms</code>.
 * 
 * Default value is <code>false</code>.
 * @returns {boolean} Value of property <code>displayOnly</code>
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.getDisplayOnly = function() { return false; };

/**
 * Returns a metadata object for class sap.tnt.InfoLabel.
 * 
 * @returns {sap.ui.base.Metadata} Metadata object describing this class
 * @public
 * @static
 * 
 */
sap.tnt.InfoLabel.getMetadata = function() { return new sap.ui.base.Metadata(); };

/**
 * Gets current value of property {@link #getRenderMode renderMode}.
 * 
 * Specifies the type of the <code>InfoLabel</code> paddings - loose or narrow.
 * <b>Note:</b> By default the padding is loose. It is recommended to use narrow (smaller) paddings for numeric texts.
 * 
 * Default value is <code>Loose</code>.
 * @returns {sap.tnt.RenderMode} Value of property <code>renderMode</code>
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.getRenderMode = function() { return new sap.tnt.RenderMode(); };

/**
 * Gets current value of property {@link #getText text}.
 * 
 * Specifies the text inside the <code>InfoLabel</code> control.
 * 
 * Default value is <code>empty string</code>.
 * @returns {string} Value of property <code>text</code>
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.getText = function() { return ""; };

/**
 * Gets current value of property {@link #getTextDirection textDirection}.
 * 
 * Available options for the text direction are LTR and RTL. By default the control inherits the text direction from its parent control.
 * 
 * Default value is <code>Inherit</code>.
 * @returns {sap.ui.core.TextDirection} Value of property <code>textDirection</code>
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.getTextDirection = function() { return new sap.ui.core.TextDirection(); };

/**
 * Gets current value of property {@link #getWidth width}.
 * 
 * Specifies the width of the <code>InfoLabel</code> control. By default, the <code>InfoLabel</code> control has the width of the content. Set this property to restrict the width to a custom value.
 * 
 * @returns {sap.ui.core.CSSSize} Value of property <code>width</code>
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.getWidth = function() { return new sap.ui.core.CSSSize(); };

/**
 * Sets a new value for property {@link #getColorScheme colorScheme}.
 * 
 * Specifies the fill and text color of the control. Accepts a digit as a value.
 * You can choose from 9 predefined background and text color combinations.
 * The color schemes are non-semantic, you can select them according to your own preferences.
 * The default <code>colorScheme</code> is 7.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>7</code>.
 * @param {int} iColorScheme New value for property <code>colorScheme</code>
 * @returns {sap.tnt.InfoLabel} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.setColorScheme = function(iColorScheme) { return new sap.tnt.InfoLabel(); };

/**
 * Sets a new value for property {@link #getDisplayOnly displayOnly}.
 * 
 * Determines if the <code>InfoLabel</code> is in <code>displayOnly</code> mode.
 * When set to <code>true</code> the control size adjusts to fit other controls, for example non-editable <code>Forms</code>.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>false</code>.
 * @param {boolean} bDisplayOnly New value for property <code>displayOnly</code>
 * @returns {sap.tnt.InfoLabel} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.setDisplayOnly = function(bDisplayOnly) { return new sap.tnt.InfoLabel(); };

/**
 * Sets a new value for property {@link #getRenderMode renderMode}.
 * 
 * Specifies the type of the <code>InfoLabel</code> paddings - loose or narrow.
 * <b>Note:</b> By default the padding is loose. It is recommended to use narrow (smaller) paddings for numeric texts.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>Loose</code>.
 * @param {sap.tnt.RenderMode} sRenderMode New value for property <code>renderMode</code>
 * @returns {sap.tnt.InfoLabel} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.setRenderMode = function(sRenderMode) { return new sap.tnt.InfoLabel(); };

/**
 * Sets a new value for property {@link #getText text}.
 * 
 * Specifies the text inside the <code>InfoLabel</code> control.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>empty string</code>.
 * @param {string} sText New value for property <code>text</code>
 * @returns {sap.tnt.InfoLabel} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.setText = function(sText) { return new sap.tnt.InfoLabel(); };

/**
 * Sets a new value for property {@link #getTextDirection textDirection}.
 * 
 * Available options for the text direction are LTR and RTL. By default the control inherits the text direction from its parent control.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>Inherit</code>.
 * @param {sap.ui.core.TextDirection} sTextDirection New value for property <code>textDirection</code>
 * @returns {sap.tnt.InfoLabel} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.setTextDirection = function(sTextDirection) { return new sap.tnt.InfoLabel(); };

/**
 * Sets a new value for property {@link #getWidth width}.
 * 
 * Specifies the width of the <code>InfoLabel</code> control. By default, the <code>InfoLabel</code> control has the width of the content. Set this property to restrict the width to a custom value.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * @param {sap.ui.core.CSSSize} sWidth New value for property <code>width</code>
 * @returns {sap.tnt.InfoLabel} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.setWidth = function(sWidth) { return new sap.tnt.InfoLabel(); };

/**
 * Unbinds property {@link #getText text} from model data.
 * @returns {sap.tnt.InfoLabel} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.InfoLabel.prototype.unbindText = function() { return new sap.tnt.InfoLabel(); };


// ---- sap.tnt.NavigationList --------------------------------------------------------------------------

/**
 * Constructor for a new NavigationList.
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
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize</li>
 * <li>{@link #getExpanded expanded} : boolean (default: true)</li>
 * </ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} : sap.tnt.NavigationListItem[] (default)</li>
 * </ul>
 * </li>
 * <li>Associations
 * <ul>
 * <li>{@link #getAriaDescribedBy ariaDescribedBy} : (sap.ui.core.ID | sap.ui.core.Control)[]</li>
 * <li>{@link #getAriaLabelledBy ariaLabelledBy} : (sap.ui.core.ID | sap.ui.core.Control)[]</li>
 * <li>{@link #getSelectedItem selectedItem} : (sap.ui.core.ID | sap.tnt.NavigationListItem)</li>
 * </ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link #event:itemSelect itemSelect} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
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
 * The NavigationList control is an interactive control, which provides a choice of
 * different items, ordered as a list.
 * @extends sap.ui.core.Control
 * @version 1.58.0
 * 
 * @constructor
 * @public
 * @since 1.34
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 * 
 */
sap.tnt.NavigationList = function(sId,mSettings) {};
/**
 * Fired when an item is selected.
 * @event
 * 
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.ui.core.Item} oControlEvent.getParameters.item The selected item.
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.itemSelect = function(oControlEvent) {  };

/**
 * Adds some ariaDescribedBy into the association {@link #getAriaDescribedBy ariaDescribedBy}.
 * 
 * @param {sap.ui.core.ID | sap.ui.core.Control} vAriaDescribedBy The ariaDescribedBy to add; if empty, nothing is inserted
 * @returns {sap.tnt.NavigationList} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.addAriaDescribedBy = function(vAriaDescribedBy) { return new sap.tnt.NavigationList(); };

/**
 * Adds some ariaLabelledBy into the association {@link #getAriaLabelledBy ariaLabelledBy}.
 * 
 * @param {sap.ui.core.ID | sap.ui.core.Control} vAriaLabelledBy The ariaLabelledBy to add; if empty, nothing is inserted
 * @returns {sap.tnt.NavigationList} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.addAriaLabelledBy = function(vAriaLabelledBy) { return new sap.tnt.NavigationList(); };

/**
 * Adds some item to the aggregation {@link #getItems items}.
 * @param {sap.tnt.NavigationListItem}
 *            oItem The item to add; if empty, nothing is inserted
 * @returns {sap.tnt.NavigationList} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.addItem = function(oItem) { return new sap.tnt.NavigationList(); };

/**
 * Attaches event handler <code>fnFunction</code> to the {@link #event:itemSelect itemSelect} event of this <code>sap.tnt.NavigationList</code>.
 * 
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener</code> if specified, 
 * otherwise it will be bound to this <code>sap.tnt.NavigationList</code> itself.
 * 
 * Fired when an item is selected.
 * 
 * @param {object}
 *            [oData] An application-specific payload object that will be passed to the event handler along with the event object when firing the event
 * @param {function}
 *            fnFunction The function to be called when the event occurs
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.tnt.NavigationList</code> itself
 * 
 * @returns {sap.tnt.NavigationList} Reference to <code>this</code> in order to allow method chaining
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.attachItemSelect = function(oData,fnFunction,oListener) { return new sap.tnt.NavigationList(); };

/**
 * Destroys all the items in the aggregation {@link #getItems items}.
 * @returns {sap.tnt.NavigationList} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.destroyItems = function() { return new sap.tnt.NavigationList(); };

/**
 * Detaches event handler <code>fnFunction</code> from the {@link #event:itemSelect itemSelect} event of this <code>sap.tnt.NavigationList</code>.
 * 
 * The passed function and listener object must match the ones used for event registration.
 * 
 * @param {function}
 *            fnFunction The function to be called, when the event occurs
 * @param {object}
 *            oListener Context object on which the given function had to be called
 * @returns {sap.tnt.NavigationList} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.detachItemSelect = function(fnFunction,oListener) { return new sap.tnt.NavigationList(); };

/**
 * Creates a new subclass of class sap.tnt.NavigationList with name <code>sClassName</code>
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
sap.tnt.NavigationList.extend = function(sClassName,oClassInfo,FNMetaImpl) { return function() {}; };

/**
 * Fires event {@link #event:itemSelect itemSelect} to attached listeners.
 * 
 * @param {object} [mParameters] Parameters to pass along with the event
 * @param {sap.ui.core.Item} [mParameters.item] The selected item.
 * 
 * @returns {sap.tnt.NavigationList} Reference to <code>this</code> in order to allow method chaining
 * @protected
 * 
 */
sap.tnt.NavigationList.prototype.fireItemSelect = function(mParameters) { return new sap.tnt.NavigationList(); };

/**
 * Returns array of IDs of the elements which are the current targets of the association {@link #getAriaDescribedBy ariaDescribedBy}.
 * 
 * @returns {sap.ui.core.ID[]}
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.getAriaDescribedBy = function() { return new Array(); };

/**
 * Returns array of IDs of the elements which are the current targets of the association {@link #getAriaLabelledBy ariaLabelledBy}.
 * 
 * @returns {sap.ui.core.ID[]}
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.getAriaLabelledBy = function() { return new Array(); };

/**
 * Gets current value of property {@link #getExpanded expanded}.
 * 
 * Specifies if the control is in expanded or collapsed mode.
 * 
 * Default value is <code>true</code>.
 * @returns {boolean} Value of property <code>expanded</code>
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.getExpanded = function() { return false; };

/**
 * Gets content of aggregation {@link #getItems items}.
 * 
 * The items displayed in the list.
 * 
 * @returns {sap.tnt.NavigationListItem[]}
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.getItems = function() { return new Array(); };

/**
 * Returns a metadata object for class sap.tnt.NavigationList.
 * 
 * @returns {sap.ui.base.Metadata} Metadata object describing this class
 * @public
 * @static
 * 
 */
sap.tnt.NavigationList.getMetadata = function() { return new sap.ui.base.Metadata(); };

/**
 * Gets the currently selected <code>NavigationListItem</code>.
 * @public
 * @return {sap.tnt.NavigationListItem|null} The selected item or null if nothing is selected
 * 
 */
sap.tnt.NavigationList.prototype.getSelectedItem = function() { return new sap.tnt.NavigationListItem(); };

/**
 * Gets current value of property {@link #getWidth width}.
 * 
 * Specifies the width of the control.
 * 
 * @returns {sap.ui.core.CSSSize} Value of property <code>width</code>
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.getWidth = function() { return new sap.ui.core.CSSSize(); };

/**
 * Checks for the provided <code>sap.tnt.NavigationListItem</code> in the aggregation {@link #getItems items}.
 * and returns its index if found or -1 otherwise.
 * @param {sap.tnt.NavigationListItem}
 *           oItem The item whose index is looked for
 * @returns {int} The index of the provided control in the aggregation if found, or -1 otherwise
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.indexOfItem = function(oItem) { return 0; };

/**
 * Inserts a item into the aggregation {@link #getItems items}.
 * 
 * @param {sap.tnt.NavigationListItem}
 *            oItem The item to insert; if empty, nothing is inserted
 * @param {int}
 *              iIndex The <code>0</code>-based index the item should be inserted at; for
 *              a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value
 *              greater than the current size of the aggregation, the item is inserted at
 *              the last position
 * @returns {sap.tnt.NavigationList} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.insertItem = function(oItem,iIndex) { return new sap.tnt.NavigationList(); };

/**
 * Removes all the controls in the association named {@link #getAriaDescribedBy ariaDescribedBy}.
 * @returns {sap.ui.core.ID[]} An array of the removed elements (might be empty)
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.removeAllAriaDescribedBy = function() { return new Array(); };

/**
 * Removes all the controls in the association named {@link #getAriaLabelledBy ariaLabelledBy}.
 * @returns {sap.ui.core.ID[]} An array of the removed elements (might be empty)
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.removeAllAriaLabelledBy = function() { return new Array(); };

/**
 * Removes all the controls from the aggregation {@link #getItems items}.
 * 
 * Additionally, it unregisters them from the hosting UIArea.
 * @returns {sap.tnt.NavigationListItem[]} An array of the removed elements (might be empty)
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.removeAllItems = function() { return new Array(); };

/**
 * Removes an ariaDescribedBy from the association named {@link #getAriaDescribedBy ariaDescribedBy}.
 * @param {int | sap.ui.core.ID | sap.ui.core.Control} vAriaDescribedBy The ariaDescribedBy to be removed or its index or ID
 * @returns {sap.ui.core.ID} The removed ariaDescribedBy or <code>null</code>
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.removeAriaDescribedBy = function(vAriaDescribedBy) { return new sap.ui.core.ID(); };

/**
 * Removes an ariaLabelledBy from the association named {@link #getAriaLabelledBy ariaLabelledBy}.
 * @param {int | sap.ui.core.ID | sap.ui.core.Control} vAriaLabelledBy The ariaLabelledBy to be removed or its index or ID
 * @returns {sap.ui.core.ID} The removed ariaLabelledBy or <code>null</code>
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.removeAriaLabelledBy = function(vAriaLabelledBy) { return new sap.ui.core.ID(); };

/**
 * Removes a item from the aggregation {@link #getItems items}.
 * 
 * @param {int | string | sap.tnt.NavigationListItem} vItem The item to remove or its index or id
 * @returns {sap.tnt.NavigationListItem} The removed item or <code>null</code>
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.removeItem = function(vItem) { return new sap.tnt.NavigationListItem(); };

/**
 * Sets a new value for property {@link #getExpanded expanded}.
 * 
 * Specifies if the control is in expanded or collapsed mode.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>true</code>.
 * @param {boolean} bExpanded New value for property <code>expanded</code>
 * @returns {sap.tnt.NavigationList} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.setExpanded = function(bExpanded) { return new sap.tnt.NavigationList(); };

/**
 * Sets the association for selectedItem. Set <code>null</code> to deselect.
 * @public
 * @param {string|sap.tnt.NavigationListItem} selectedItem The control to be set as selected
 * @param {boolean} suppressInvalidate If true, the managed object's invalidate method is not called
 * @return {sap.tnt.NavigationList|null} The <code>selectedItem</code> association
 * 
 */
sap.tnt.NavigationList.prototype.setSelectedItem = function(selectedItem,suppressInvalidate) { return new sap.tnt.NavigationList(); };

/**
 * Sets a new value for property {@link #getWidth width}.
 * 
 * Specifies the width of the control.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * @param {sap.ui.core.CSSSize} sWidth New value for property <code>width</code>
 * @returns {sap.tnt.NavigationList} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationList.prototype.setWidth = function(sWidth) { return new sap.tnt.NavigationList(); };


// ---- sap.tnt.NavigationListItem --------------------------------------------------------------------------

/**
 * Constructor for a new NavigationListItem.
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
 * <li>{@link #getIcon icon} : sap.ui.core.URI (default: )</li>
 * <li>{@link #getExpanded expanded} : boolean (default: true)</li>
 * <li>{@link #getHasExpander hasExpander} : boolean (default: true)</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * </ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} : sap.tnt.NavigationListItem[] (default)</li>
 * </ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link #event:select select} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * </ul>
 * </li>
 * </ul>
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.core.Item#constructor sap.ui.core.Item}
 * can be used as well.
 * 
 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
 * @param {object} [mSettings] Initial settings for the new control
 * 
 * @class
 * The NavigationListItem control represents an action, which can be selected by the user.
 * It can provide sub items.
 * @extends sap.ui.core.Item
 * @version 1.58.0
 * 
 * @constructor
 * @public
 * @since 1.34
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 * 
 */
sap.tnt.NavigationListItem = function(sId,mSettings) {};
/**
 * Fired when this item is selected.
 * @event
 * 
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.ui.core.Item} oControlEvent.getParameters.item The selected item.
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.select = function(oControlEvent) {  };

/**
 * Adds some item to the aggregation {@link #getItems items}.
 * @param {sap.tnt.NavigationListItem}
 *            oItem The item to add; if empty, nothing is inserted
 * @returns {sap.tnt.NavigationListItem} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.addItem = function(oItem) { return new sap.tnt.NavigationListItem(); };

/**
 * Attaches event handler <code>fnFunction</code> to the {@link #event:select select} event of this <code>sap.tnt.NavigationListItem</code>.
 * 
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener</code> if specified, 
 * otherwise it will be bound to this <code>sap.tnt.NavigationListItem</code> itself.
 * 
 * Fired when this item is selected.
 * 
 * @param {object}
 *            [oData] An application-specific payload object that will be passed to the event handler along with the event object when firing the event
 * @param {function}
 *            fnFunction The function to be called when the event occurs
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.tnt.NavigationListItem</code> itself
 * 
 * @returns {sap.tnt.NavigationListItem} Reference to <code>this</code> in order to allow method chaining
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.attachSelect = function(oData,fnFunction,oListener) { return new sap.tnt.NavigationListItem(); };

/**
 * Destroys all the items in the aggregation {@link #getItems items}.
 * @returns {sap.tnt.NavigationListItem} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.destroyItems = function() { return new sap.tnt.NavigationListItem(); };

/**
 * Detaches event handler <code>fnFunction</code> from the {@link #event:select select} event of this <code>sap.tnt.NavigationListItem</code>.
 * 
 * The passed function and listener object must match the ones used for event registration.
 * 
 * @param {function}
 *            fnFunction The function to be called, when the event occurs
 * @param {object}
 *            oListener Context object on which the given function had to be called
 * @returns {sap.tnt.NavigationListItem} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.detachSelect = function(fnFunction,oListener) { return new sap.tnt.NavigationListItem(); };

/**
 * Creates a new subclass of class sap.tnt.NavigationListItem with name <code>sClassName</code>
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of information as described in {@link sap.ui.core.Item.extend}.
 * 
 * @param {string} sClassName Name of the class being created
 * @param {object} [oClassInfo] Object literal with information about the class
 * @param {function} [FNMetaImpl] Constructor function for the metadata object; if not given, it defaults to <code>sap.ui.core.ElementMetadata</code>
 * @returns {function} Created class / constructor function
 * @public
 * @static
 * 
 */
sap.tnt.NavigationListItem.extend = function(sClassName,oClassInfo,FNMetaImpl) { return function() {}; };

/**
 * Fires event {@link #event:select select} to attached listeners.
 * 
 * @param {object} [mParameters] Parameters to pass along with the event
 * @param {sap.ui.core.Item} [mParameters.item] The selected item.
 * 
 * @returns {sap.tnt.NavigationListItem} Reference to <code>this</code> in order to allow method chaining
 * @protected
 * 
 */
sap.tnt.NavigationListItem.prototype.fireSelect = function(mParameters) { return new sap.tnt.NavigationListItem(); };

/**
 * Gets current value of property {@link #getExpanded expanded}.
 * 
 * Specifies if the item is expanded.
 * 
 * Default value is <code>true</code>.
 * @returns {boolean} Value of property <code>expanded</code>
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.getExpanded = function() { return false; };

/**
 * Gets current value of property {@link #getHasExpander hasExpander}.
 * 
 * Specifies if the item has an expander.
 * 
 * Default value is <code>true</code>.
 * @returns {boolean} Value of property <code>hasExpander</code>
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.getHasExpander = function() { return false; };

/**
 * Gets current value of property {@link #getIcon icon}.
 * 
 * Specifies the icon for the item.
 * 
 * Default value is <code>empty string</code>.
 * @returns {sap.ui.core.URI} Value of property <code>icon</code>
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.getIcon = function() { return new sap.ui.core.URI(); };

/**
 * Gets content of aggregation {@link #getItems items}.
 * 
 * The sub items.
 * 
 * @returns {sap.tnt.NavigationListItem[]}
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.getItems = function() { return new Array(); };

/**
 * Returns a metadata object for class sap.tnt.NavigationListItem.
 * 
 * @returns {sap.ui.base.Metadata} Metadata object describing this class
 * @public
 * @static
 * 
 */
sap.tnt.NavigationListItem.getMetadata = function() { return new sap.ui.base.Metadata(); };

/**
 * Gets current value of property {@link #getVisible visible}.
 * 
 * Specifies if the item should be shown.
 * 
 * Default value is <code>true</code>.
 * @returns {boolean} Value of property <code>visible</code>
 * @since 1.52
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.getVisible = function() { return false; };

/**
 * Checks for the provided <code>sap.tnt.NavigationListItem</code> in the aggregation {@link #getItems items}.
 * and returns its index if found or -1 otherwise.
 * @param {sap.tnt.NavigationListItem}
 *           oItem The item whose index is looked for
 * @returns {int} The index of the provided control in the aggregation if found, or -1 otherwise
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.indexOfItem = function(oItem) { return 0; };

/**
 * Inserts a item into the aggregation {@link #getItems items}.
 * 
 * @param {sap.tnt.NavigationListItem}
 *            oItem The item to insert; if empty, nothing is inserted
 * @param {int}
 *              iIndex The <code>0</code>-based index the item should be inserted at; for
 *              a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value
 *              greater than the current size of the aggregation, the item is inserted at
 *              the last position
 * @returns {sap.tnt.NavigationListItem} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.insertItem = function(oItem,iIndex) { return new sap.tnt.NavigationListItem(); };

/**
 * Removes all the controls from the aggregation {@link #getItems items}.
 * 
 * Additionally, it unregisters them from the hosting UIArea.
 * @returns {sap.tnt.NavigationListItem[]} An array of the removed elements (might be empty)
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.removeAllItems = function() { return new Array(); };

/**
 * Removes a item from the aggregation {@link #getItems items}.
 * 
 * @param {int | string | sap.tnt.NavigationListItem} vItem The item to remove or its index or id
 * @returns {sap.tnt.NavigationListItem} The removed item or <code>null</code>
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.removeItem = function(vItem) { return new sap.tnt.NavigationListItem(); };

/**
 * Sets a new value for property {@link #getExpanded expanded}.
 * 
 * Specifies if the item is expanded.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>true</code>.
 * @param {boolean} bExpanded New value for property <code>expanded</code>
 * @returns {sap.tnt.NavigationListItem} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.setExpanded = function(bExpanded) { return new sap.tnt.NavigationListItem(); };

/**
 * Sets a new value for property {@link #getHasExpander hasExpander}.
 * 
 * Specifies if the item has an expander.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>true</code>.
 * @param {boolean} bHasExpander New value for property <code>hasExpander</code>
 * @returns {sap.tnt.NavigationListItem} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.setHasExpander = function(bHasExpander) { return new sap.tnt.NavigationListItem(); };

/**
 * Sets a new value for property {@link #getIcon icon}.
 * 
 * Specifies the icon for the item.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>empty string</code>.
 * @param {sap.ui.core.URI} sIcon New value for property <code>icon</code>
 * @returns {sap.tnt.NavigationListItem} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.setIcon = function(sIcon) { return new sap.tnt.NavigationListItem(); };

/**
 * Sets a new value for property {@link #getVisible visible}.
 * 
 * Specifies if the item should be shown.
 * 
 * When called with a value of <code>null</code> or <code>undefined</code>, the default value of the property will be restored.
 * 
 * Default value is <code>true</code>.
 * @param {boolean} bVisible New value for property <code>visible</code>
 * @returns {sap.tnt.NavigationListItem} Reference to <code>this</code> in order to allow method chaining
 * @since 1.52
 * 
 * @public
 * 
 */
sap.tnt.NavigationListItem.prototype.setVisible = function(bVisible) { return new sap.tnt.NavigationListItem(); };


// ---- sap.tnt.RenderMode --------------------------------------------------------------------------

// dummy function to make Eclipse aware of namespace
sap.tnt.RenderMode.toString = function() { return ""; };

// ---- sap.tnt.SideNavigation --------------------------------------------------------------------------

/**
 * Constructor for a new SideNavigation.
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
 * <li>{@link #getExpanded expanded} : boolean (default: true)</li>
 * </ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItem item} : sap.tnt.NavigationList (default)</li>
 * <li>{@link #getFixedItem fixedItem} : sap.tnt.NavigationList</li>
 * <li>{@link #getFooter footer} : sap.tnt.NavigationList</li>
 * </ul>
 * </li>
 * <li>Associations
 * <ul>
 * <li>{@link #getSelectedItem selectedItem} : (sap.ui.core.ID | sap.tnt.NavigationListItem)</li>
 * </ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link #event:itemSelect itemSelect} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
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
 * The SideNavigation control is a container, which consists of flexible and fixed parts on top of each other.
 * <h4>Responsive Behavior</h4>
 * <ul>
 * <li>The flexible part adapts its size to the fixed one.</li>
 * <li>The flexible part has a scrollbar when the content is larger than the available space.</li>
 * </ul>
 * <b>Note:</b> In order for the SideNavigation to stretch properly, its parent layout control should only be the sap.tnt.ToolPage.
 * @extends sap.ui.core.Control
 * @version 1.58.0
 * 
 * @constructor
 * @public
 * @since 1.34
 * @see {@link fiori:https://experience.sap.com/fiori-design-web/side-navigation/ Side Navigation}
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 * 
 */
sap.tnt.SideNavigation = function(sId,mSettings) {};
/**
 * Fired when an item is selected.
 * @event
 * 
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.ui.core.Item} oControlEvent.getParameters.item The selected item.
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.itemSelect = function(oControlEvent) {  };

/**
 * Attaches event handler <code>fnFunction</code> to the {@link #event:itemSelect itemSelect} event of this <code>sap.tnt.SideNavigation</code>.
 * 
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener</code> if specified, 
 * otherwise it will be bound to this <code>sap.tnt.SideNavigation</code> itself.
 * 
 * Fired when an item is selected.
 * 
 * @param {object}
 *            [oData] An application-specific payload object that will be passed to the event handler along with the event object when firing the event
 * @param {function}
 *            fnFunction The function to be called when the event occurs
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.tnt.SideNavigation</code> itself
 * 
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.attachItemSelect = function(oData,fnFunction,oListener) { return new sap.tnt.SideNavigation(); };

/**
 * Binds aggregation {@link #getItem item} to model data.
 * 
 * See {@link sap.ui.base.ManagedObject#bindAggregation ManagedObject.bindAggregation} for a 
 * detailed description of the possible properties of <code>oBindingInfo</code>.
 * @param {object} oBindingInfo The binding information
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.bindItem = function(oBindingInfo) { return new sap.tnt.SideNavigation(); };

/**
 * Destroys the fixedItem in the aggregation {@link #getFixedItem fixedItem}.
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.destroyFixedItem = function() { return new sap.tnt.SideNavigation(); };

/**
 * Destroys the footer in the aggregation {@link #getFooter footer}.
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.destroyFooter = function() { return new sap.tnt.SideNavigation(); };

/**
 * Destroys the item in the aggregation {@link #getItem item}.
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.destroyItem = function() { return new sap.tnt.SideNavigation(); };

/**
 * Detaches event handler <code>fnFunction</code> from the {@link #event:itemSelect itemSelect} event of this <code>sap.tnt.SideNavigation</code>.
 * 
 * The passed function and listener object must match the ones used for event registration.
 * 
 * @param {function}
 *            fnFunction The function to be called, when the event occurs
 * @param {object}
 *            oListener Context object on which the given function had to be called
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.detachItemSelect = function(fnFunction,oListener) { return new sap.tnt.SideNavigation(); };

/**
 * Creates a new subclass of class sap.tnt.SideNavigation with name <code>sClassName</code>
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
sap.tnt.SideNavigation.extend = function(sClassName,oClassInfo,FNMetaImpl) { return function() {}; };

/**
 * Fires event {@link #event:itemSelect itemSelect} to attached listeners.
 * 
 * @param {object} [mParameters] Parameters to pass along with the event
 * @param {sap.ui.core.Item} [mParameters.item] The selected item.
 * 
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * @protected
 * 
 */
sap.tnt.SideNavigation.prototype.fireItemSelect = function(mParameters) { return new sap.tnt.SideNavigation(); };

/**
 * Gets current value of property {@link #getExpanded expanded}.
 * 
 * Specifies if the control is expanded.
 * 
 * Default value is <code>true</code>.
 * @returns {boolean} Value of property <code>expanded</code>
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.getExpanded = function() { return false; };

/**
 * Gets content of aggregation {@link #getFixedItem fixedItem}.
 * 
 * Defines the content inside the fixed part.
 * 
 * @returns {sap.tnt.NavigationList}
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.getFixedItem = function() { return new sap.tnt.NavigationList(); };

/**
 * Gets content of aggregation {@link #getFooter footer}.
 * 
 * Defines the content inside the footer.
 * 
 * @returns {sap.tnt.NavigationList}
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.getFooter = function() { return new sap.tnt.NavigationList(); };

/**
 * Gets content of aggregation {@link #getItem item}.
 * 
 * Defines the content inside the flexible part.
 * 
 * @returns {sap.tnt.NavigationList}
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.getItem = function() { return new sap.tnt.NavigationList(); };

/**
 * Returns a metadata object for class sap.tnt.SideNavigation.
 * 
 * @returns {sap.ui.base.Metadata} Metadata object describing this class
 * @public
 * @static
 * 
 */
sap.tnt.SideNavigation.getMetadata = function() { return new sap.ui.base.Metadata(); };

/**
 * ID of the element which is the current target of the association {@link #getSelectedItem selectedItem}, or <code>null</code>.
 * 
 * @returns {sap.ui.core.ID}
 * @since 1.52.0
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.getSelectedItem = function() { return new sap.ui.core.ID(); };

/**
 * Sets if the control is in expanded or collapsed mode.
 * 
 * @public
 * @param {boolean} isExpanded Indication if the SideNavigation is expanded.
 * @returns {sap.tnt.SideNavigation} this SideNavigation reference for chaining.
 * 
 */
sap.tnt.SideNavigation.prototype.setExpanded = function(isExpanded) { return new sap.tnt.SideNavigation(); };

/**
 * Sets the aggregated {@link #getFixedItem fixedItem}.
 * @param {sap.tnt.NavigationList} oFixedItem The fixedItem to set
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.setFixedItem = function(oFixedItem) { return new sap.tnt.SideNavigation(); };

/**
 * Sets the aggregated {@link #getFooter footer}.
 * @param {sap.tnt.NavigationList} oFooter The footer to set
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.setFooter = function(oFooter) { return new sap.tnt.SideNavigation(); };

/**
 * Sets the aggregated {@link #getItem item}.
 * @param {sap.tnt.NavigationList} oItem The item to set
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.setItem = function(oItem) { return new sap.tnt.SideNavigation(); };

/**
 * Sets the association for selectedItem
 * @public
 * @param {string|sap.tnt.NavigationListItem} selectedItem The control to be set as selected
 * @param {boolean} suppressInvalidate If true, the managed object's invalidate method is not called
 * @return {sap.tnt.SideNavigation|null} The <code>selectedItem</code> association
 * 
 */
sap.tnt.SideNavigation.prototype.setSelectedItem = function(selectedItem,suppressInvalidate) { return new sap.tnt.SideNavigation(); };

/**
 * Unbinds aggregation {@link #getItem item} from model data.
 * @returns {sap.tnt.SideNavigation} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.SideNavigation.prototype.unbindItem = function() { return new sap.tnt.SideNavigation(); };


// ---- sap.tnt.ToolHeader --------------------------------------------------------------------------

/**
 * Constructor for a new ToolHeader.
 * 
 * 
 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
 * @param {object} [mSettings] Initial settings for the new control
 * 
 * @class
 * 
 * The ToolHeader control is a horizontal container that is most
 * commonly used to display buttons, labels, and other various input controls.
 * <h4>Overview</h4>
 * The ToolHeader control is based on {@link sap.m.OverflowToolbar}. It contains clearly structured menus of commands that are available across the various apps within the same tool layout.
 * <h4>Usage</h4>
 * <ul>
 * <li>If an app implements side navigation in addition to the tool header menu, the menu icon must be the first item on the left-hand side of the tool header.</li>
 * <li>The app menu and the side navigation must not have any dependencies and must work independently.</li>
 * </ul>
 * @extends sap.m.OverflowToolbar
 * @version 1.58.0
 * 
 * @constructor
 * @public
 * @since 1.34
 * @see {@link fiori:https://experience.sap.com/fiori-design-web/tool-header/ Tool Header}
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 * 
 */
sap.tnt.ToolHeader = function(sId,mSettings) {};
/**
 * Creates a new subclass of class sap.tnt.ToolHeader with name <code>sClassName</code>
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of information as described in {@link sap.m.OverflowToolbar.extend}.
 * 
 * @param {string} sClassName Name of the class being created
 * @param {object} [oClassInfo] Object literal with information about the class
 * @param {function} [FNMetaImpl] Constructor function for the metadata object; if not given, it defaults to <code>sap.ui.core.ElementMetadata</code>
 * @returns {function} Created class / constructor function
 * @public
 * @static
 * 
 */
sap.tnt.ToolHeader.extend = function(sClassName,oClassInfo,FNMetaImpl) { return function() {}; };

/**
 * Returns a metadata object for class sap.tnt.ToolHeader.
 * 
 * @returns {sap.ui.base.Metadata} Metadata object describing this class
 * @public
 * @static
 * 
 */
sap.tnt.ToolHeader.getMetadata = function() { return new sap.ui.base.Metadata(); };


// ---- sap.tnt.ToolHeaderUtilitySeparator --------------------------------------------------------------------------

/**
 * Constructor for a new ToolHeaderUtilitySeparator.
 * 
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial
 * property values, aggregated and associated objects as well as event handlers.
 * See {@link sap.ui.base.ManagedObject#constructor} for a general description of the syntax of the settings object.
 * 
 * This class does not have its own settings, but all settings applicable to the base type
 * {@link sap.ui.core.Control#constructor sap.ui.core.Control} can be used.
 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
 * @param {object} [mSettings] Initial settings for the new control
 * 
 * @class
 * The ToolHeaderUtilitySeparator control is used in the sap.tnt.ToolHeader control
 * to specify where the overflow button is placed.
 * @extends sap.ui.core.Control
 * @version 1.58.0
 * 
 * @constructor
 * @public
 * @since 1.16
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 * 
 */
sap.tnt.ToolHeaderUtilitySeparator = function(sId,mSettings) {};
/**
 * Creates a new subclass of class sap.tnt.ToolHeaderUtilitySeparator with name <code>sClassName</code>
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
sap.tnt.ToolHeaderUtilitySeparator.extend = function(sClassName,oClassInfo,FNMetaImpl) { return function() {}; };

/**
 * Returns a metadata object for class sap.tnt.ToolHeaderUtilitySeparator.
 * 
 * @returns {sap.ui.base.Metadata} Metadata object describing this class
 * @public
 * @static
 * 
 */
sap.tnt.ToolHeaderUtilitySeparator.getMetadata = function() { return new sap.ui.base.Metadata(); };


// ---- sap.tnt.ToolPage --------------------------------------------------------------------------

/**
 * Constructor for a new ToolPage.
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
 * <li>{@link #getSideExpanded sideExpanded} : boolean (default: true)</li>
 * </ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getHeader header} : sap.tnt.ToolHeader</li>
 * <li>{@link #getSideContent sideContent} : sap.tnt.SideNavigation</li>
 * <li>{@link #getMainContents mainContents} : sap.ui.core.Control[]</li>
 * </ul>
 * </li>
 * </ul>
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.core.Control#constructor sap.ui.core.Control}
 * can be used as well.
 * 
 * @param {string} [sId] ID for the new control, generated automatically if no id is given
 * @param {object} [mSettings] Initial settings for the new control
 * 
 * @class
 * The ToolPage is a layout control, used to create a basic tools app that has a header, side navigation and contents area.
 * <h4>Overview</h4>
 * The control has three main areas - a header on top, navigation to the side and a content area that can hold any control. The header and side navigation use custom controls
 * - {@link sap.tnt.ToolHeader} and {@link sap.tnt.SideNavigation}.
 * <h4>Usage</h4>
 * The main usage of the sap.tnt controls is for scenarios in the tooling or administration space.
 * @extends sap.ui.core.Control
 * @version 1.58.0
 * 
 * @constructor
 * @public
 * @since 1.34
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 * 
 */
sap.tnt.ToolPage = function(sId,mSettings) {};
/**
 * Adds some mainContent to the aggregation {@link #getMainContents mainContents}.
 * @param {sap.ui.core.Control}
 *            oMainContent The mainContent to add; if empty, nothing is inserted
 * @returns {sap.tnt.ToolPage} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.addMainContent = function(oMainContent) { return new sap.tnt.ToolPage(); };

/**
 * Destroys the header in the aggregation {@link #getHeader header}.
 * @returns {sap.tnt.ToolPage} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.destroyHeader = function() { return new sap.tnt.ToolPage(); };

/**
 * Destroys all the mainContents in the aggregation {@link #getMainContents mainContents}.
 * @returns {sap.tnt.ToolPage} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.destroyMainContents = function() { return new sap.tnt.ToolPage(); };

/**
 * Destroys the sideContent in the aggregation {@link #getSideContent sideContent}.
 * @returns {sap.tnt.ToolPage} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.destroySideContent = function() { return new sap.tnt.ToolPage(); };

/**
 * Creates a new subclass of class sap.tnt.ToolPage with name <code>sClassName</code>
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
sap.tnt.ToolPage.extend = function(sClassName,oClassInfo,FNMetaImpl) { return function() {}; };

/**
 * Gets content of aggregation {@link #getHeader header}.
 * 
 * The control to appear in the header area.
 * 
 * @returns {sap.tnt.ToolHeader}
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.getHeader = function() { return new sap.tnt.ToolHeader(); };

/**
 * Gets content of aggregation {@link #getMainContents mainContents}.
 * 
 * The content section.
 * 
 * @returns {sap.ui.core.Control[]}
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.getMainContents = function() { return new Array(); };

/**
 * Returns a metadata object for class sap.tnt.ToolPage.
 * 
 * @returns {sap.ui.base.Metadata} Metadata object describing this class
 * @public
 * @static
 * 
 */
sap.tnt.ToolPage.getMetadata = function() { return new sap.ui.base.Metadata(); };

/**
 * Gets content of aggregation {@link #getSideContent sideContent}.
 * 
 * The side menu of the layout.
 * 
 * @returns {sap.tnt.SideNavigation}
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.getSideContent = function() { return new sap.tnt.SideNavigation(); };

/**
 * Gets current value of property {@link #getSideExpanded sideExpanded}.
 * 
 * Indicates if the side area is expanded. Overrides the expanded property of the sideContent aggregation.
 * 
 * Default value is <code>true</code>.
 * @returns {boolean} Value of property <code>sideExpanded</code>
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.getSideExpanded = function() { return false; };

/**
 * Checks for the provided <code>sap.ui.core.Control</code> in the aggregation {@link #getMainContents mainContents}.
 * and returns its index if found or -1 otherwise.
 * @param {sap.ui.core.Control}
 *           oMainContent The mainContent whose index is looked for
 * @returns {int} The index of the provided control in the aggregation if found, or -1 otherwise
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.indexOfMainContent = function(oMainContent) { return 0; };

/**
 * Inserts a mainContent into the aggregation {@link #getMainContents mainContents}.
 * 
 * @param {sap.ui.core.Control}
 *            oMainContent The mainContent to insert; if empty, nothing is inserted
 * @param {int}
 *              iIndex The <code>0</code>-based index the mainContent should be inserted at; for
 *              a negative value of <code>iIndex</code>, the mainContent is inserted at position 0; for a value
 *              greater than the current size of the aggregation, the mainContent is inserted at
 *              the last position
 * @returns {sap.tnt.ToolPage} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.insertMainContent = function(oMainContent,iIndex) { return new sap.tnt.ToolPage(); };

/**
 * Removes all the controls from the aggregation {@link #getMainContents mainContents}.
 * 
 * Additionally, it unregisters them from the hosting UIArea.
 * @returns {sap.ui.core.Control[]} An array of the removed elements (might be empty)
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.removeAllMainContents = function() { return new Array(); };

/**
 * Removes a mainContent from the aggregation {@link #getMainContents mainContents}.
 * 
 * @param {int | string | sap.ui.core.Control} vMainContent The mainContent to remove or its index or id
 * @returns {sap.ui.core.Control} The removed mainContent or <code>null</code>
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.removeMainContent = function(vMainContent) { return new sap.ui.core.Control(); };

/**
 * Sets the aggregated {@link #getHeader header}.
 * @param {sap.tnt.ToolHeader} oHeader The header to set
 * @returns {sap.tnt.ToolPage} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.setHeader = function(oHeader) { return new sap.tnt.ToolPage(); };

/**
 * Sets the aggregated {@link #getSideContent sideContent}.
 * @param {sap.tnt.SideNavigation} oSideContent The sideContent to set
 * @returns {sap.tnt.ToolPage} Reference to <code>this</code> in order to allow method chaining
 * 
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.setSideContent = function(oSideContent) { return new sap.tnt.ToolPage(); };

/**
 * Sets the expand/collapse state of the SideContent.
 * @param {boolean} isSideExpanded defines whether the SideNavigation is expanded.
 * @returns {sap.tnt.ToolPage} Pointer to the control instance for chaining
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.setSideExpanded = function(isSideExpanded) { return new sap.tnt.ToolPage(); };

/**
 * Toggles the expand/collapse state of the SideContent.
 * @returns {sap.tnt.ToolPage} Pointer to the control instance for chaining.
 * @public
 * 
 */
sap.tnt.ToolPage.prototype.toggleSideContentMode = function() { return new sap.tnt.ToolPage(); };

// ---- static fields of namespaces ---------------------------------------------------------------------

// ---- sap.tnt.RenderMode --------------------------------------------------------------------------

/**
 * When type of the content of <code>InfoLabel</code> is text padding are loose
 * @public
 * 
 */
sap.tnt.RenderMode.Loose = "";

/**
 * When type of the content of <code>InfoLabel</code> is numeric paddings are narrow
 * @public
 * 
 */
sap.tnt.RenderMode.Narrow = "";

