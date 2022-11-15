import {LightningElement, track} from 'lwc';

export default class CpqQuoteSetupWizard extends LightningElement {
  @track
  currentStep = '1';
  @track
  pages = [];

  SHOW_FRAME = '';
  HIDE_FRAME = 'slds-hide';

  validate() {
    let currentScreen = this.getCurrentScreen();
    return (currentScreen) ? currentScreen.validate() : true;
  }

  updateCurrentFrameVisibility(className) {
    let currentScreen = this.getCurrentScreen();
    if (currentScreen) currentScreen.className = className;
  }

  getAllScreens() {
    return this.querySelectorAll('*');
  }

  getCurrentScreen() {
    if (this.pages) {
      let index = parseInt(this.currentStep) - 1;
      return this.pages[index].component;
    }
    return null;
  }

  populateScreensData() {
    if (this.pages) {
      this.getAllScreens().forEach(item => {
        if (item.frame) {
          this.pages.push({label: item.name, value: item.frame, component: item});
        }
      });
    }
  }

  hideAllScreens() {
    if (this.pages) {
      this.pages.forEach(item => {
        item.component.className = this.HIDE_FRAME;
      })
    }
  }

  handleSlotChange() {
    this.populateScreensData();
    this.hideAllScreens();
    this.updateCurrentFrameVisibility(this.SHOW_FRAME);
  }


  get isEnableNext() {
    return parseInt(this.currentStep) != this.pages.length;
  }

  get isEnablePrev() {
    return parseInt(this.currentStep) > 1;
  }

  get isLastScreen() {
    return parseInt(this.currentStep) === this.pages.length;
  }

  handleNext() {
    if (!this.validate()) return;
    this.updateCurrentFrameVisibility(this.HIDE_FRAME);
    this.currentStep = (parseInt(this.currentStep) + 1).toString();
    this.updateCurrentFrameVisibility(this.SHOW_FRAME);
  }

  handlePrev() {
    this.updateCurrentFrameVisibility(this.HIDE_FRAME);
    this.currentStep = (parseInt(this.currentStep) - 1).toString();
    this.updateCurrentFrameVisibility(this.SHOW_FRAME);
  }

  handleValidate() {
    this.validate();
  }
}
