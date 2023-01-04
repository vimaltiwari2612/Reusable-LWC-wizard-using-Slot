/*
It’s a reusable LWC wizard frame component which can used to add a child in c/wizard.
*/
import {api, LightningElement} from 'lwc';
/**
 * @alias WizardFrame
 * @extends LightningElement
 * @hideconstructor
 *
 * @example
 * <c-wizard-frame frame="1" name="Frame Name"></c-wizard-frame>
 */
export default class WizardFrame extends LightningElement {
  /**
   * Represents Frame number
   * @type {Integer}
   */
  @api
  frame;
  /**
   * Represents Frame name
   * @type {String}
   */
  @api
  name;
  /**
   * Represents an event to be triggered before moving next to next frame
   * @type {String}
   */
  @api
  beforeNext;
  /**
   * Represents an event to be triggered before laoding current frame
   * @type {String}
   */
  @api
  beforeLoad;

  // Constants
  SELECTOR = '*';
  childrenArr = [];

  /**
   * @description Method to register child components
   * @param event
   */
  handleSlotChange(event) {
    if (this.childrenArr) {
      this._getAllScreens().forEach(item => this.childrenArr.push(item));
    }
  }

  /**
   * @description Method to get all Child components
   */
  _getAllScreens() {
    return this.querySelectorAll(this.SELECTOR);
  }

  /**
   * @description Method to validate current wizard Frame
   */
  @api
  validate() {
    return this._areAllComponentsValid(this.beforeNext);
  }

  /**
   * @description Method to Load current wizard Frame
   */
  @api
  load() {
    return this._areAllComponentsValid(this.beforeLoad);
  }

  /**
   * @description Method to validate all child components within a wizard frame
   */
  _areAllComponentsValid(eventType) {
    var validChildren = this.childrenArr.filter(child => {
      return this._validateCurrentComponent(child, eventType) == true;
    });
    return (validChildren.length == this.childrenArr.length)
  }

  /**
   * @description Method to run all the functions of a child component,
   * registered in an event type
   * @param child - instance of child Comp., eventType - next, load etc
   */
  _validateCurrentComponent(child, eventType) {
    let isValid = true;
    if (child && eventType) {
      let functionNames = eventType.split(',');
      if (functionNames) {
        functionNames.forEach(functionName => {
          isValid =
              (child[functionName.trim()] && (typeof child[functionName.trim()] === 'function')
                  && child[functionName.trim()]());
          if (!isValid) return isValid;
        });
      }
    }
    return isValid;
  }
}
