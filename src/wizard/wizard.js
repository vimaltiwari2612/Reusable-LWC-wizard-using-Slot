/*
It’s a reusable LWC component wizard, which can hold any number of child LWC components irrespective
of their design.

1. Each step is a child WizardFrame.
2. The number of steps will be identified dynamically based on the child component’s markups.
3. On click of ‘Back’ and ‘Next’, components will be shown/hidden.
4. ‘Next’ and ‘Finish’ button will take care of validating the inner child components too.

*/
import {api, LightningElement, track} from 'lwc';
/**
 * @alias Wizard
 * @extends LightningElement
 * @hideconstructor
 *
 * @example
 * <c-wizard></c-wizard>
 */
export default class Wizard extends LightningElement {
  /**
   * To Show Finish Button at the end of wizard
   * @type {Boolean}
   */
  @api
  showFinishButton;
  /**
   * Track the current Step of wizard
   * @type {Integer}
   */
  @track
  currentStep = 1;
  /**
   * Holds the instances of wizard Frames
   * @type {Array}
   */
  @track
  pages = [];

  /**
   * Constants
   */
  SHOW_FRAME = '';
  HIDE_FRAME = 'slds-hide';
  SELECTOR = '*';

  /**
   * @description handler for slot change,
   * 1. to register children components, populate Progress bar
   * 2. Hide all frames
   * 3. show only first Frame
   */
  handleSlotChange() {
    this._populateScreensData();
    this._hideAllScreens();
    this._updateCurrentFrameVisibility(this.SHOW_FRAME);
  }

  /**
   * @description Method to populate wizard frames data for progress bar
   */
  _populateScreensData() {
    if (this.pages) {
      this._getAllScreens().forEach(item => {
        if (item.frame) {
          this.pages.push({label: item.name, value: item.frame, component: item});
        }
      });
    }
  }

  /**
   * @description Method to return all Wizard Frames (children)
   */
  _getAllScreens() {
    return this.querySelectorAll(this.SELECTOR);
  }

  /**
   * @description Method to hide all wizard frames
   */
  _hideAllScreens() {
    if (this.pages) {
      this.pages.forEach(item => {
        item.component.className = this.HIDE_FRAME;
      })
    }
  }

  /**
   * @description Method to get next button visibilty
   */
  get isEnableNext() {
    return parseInt(this.currentStep) != this.pages.length;
  }
  /**
   * @description Method to get back button visibilty
   */
  get isEnableBack() {
    return parseInt(this.currentStep) > 1;
  }
  /**
   * @description Method to get finish button visibility
   */
  get isLastScreen() {
    return parseInt(this.currentStep) === this.pages.length && this.showFinishButton == 'true';
  }

  /**
   * @description Method to handle next button event
   * 1. it validates the current frame by calling current frame's registered function
   * 2. one validated, hide the current frame
   * 3. Move a Step Ahead
   * 3. load the Curent frame by calling next frames' registered load function
   * 4. show the current frame
   */
  handleNext() {
    if (!this._validateCurrentFrame()) return;
    this._updateCurrentFrameVisibility(this.HIDE_FRAME);
    this.currentStep = (parseInt(this.currentStep) + 1).toString();
    if (!this._loadCurrentFrame()) return;
    this._updateCurrentFrameVisibility(this.SHOW_FRAME);
  }


  /**
   * @description  method to invoke the validate function of current wizard Frame
   */
  _validateCurrentFrame() {
    let currentScreen = this._getCurrentScreen();
    return (currentScreen && currentScreen.validate) ? currentScreen.validate() : true;
  }

  /**
   * @description Method to return current wizard frame
   */
  _getCurrentScreen() {
    if (this.pages) {
      let index = parseInt(this.currentStep) - 1;
      return this.pages[index].component;
    }
    return null;
  }

  /**
   * @description Method to update curent wizard frame visibilty
   * @param className
   */
  _updateCurrentFrameVisibility(className) {
    let currentScreen = this._getCurrentScreen();
    if (currentScreen) currentScreen.className = className;
  }

  /**
   * @description Method to invoke the load function of  current Wizard Frame
   */
  _loadCurrentFrame() {
    let currentScreen = this._getCurrentScreen();
    return (currentScreen && currentScreen.load) ? currentScreen.load() : true;
  }

  /**
   * @description Method to to handle Back Button event
   * 1. Hide Current Frame
   * 2. Go back a step
   * 3. Show Current Frame
   */
  handleBack() {
    this._updateCurrentFrameVisibility(this.HIDE_FRAME);
    this.currentStep = (parseInt(this.currentStep) - 1).toString();
    this._updateCurrentFrameVisibility(this.SHOW_FRAME);
  }
  /**
   * @description Method to handle Finish Button event
   * 1. validate current frame
   * 2. raise a finish event to parent
   */
  handleFinish() {
    if (!this._validateCurrentFrame()) return;
    this._raiseFinishEvent();
  }

  /**
   * @description Method to raise finish event
   */
  _raiseFinishEvent() {
    const finishEvent = new CustomEvent('wizardfinish', {detail: true});
    this.dispatchEvent(finishEvent);
  }
}
