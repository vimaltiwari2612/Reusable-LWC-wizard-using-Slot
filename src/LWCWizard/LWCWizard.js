import {LightningElement, track} from 'lwc';

export default class LWCWizard extends LightningElement {
  @track
  currentStep = '0';
  @track
  pages = [];
  componentsRegistered = 0;
  privateChildrenRecord = [];
  isWizardSet = false;

  @track
  componentVisibilityMatrix = {
    showFirst: true,
    showSecond: true,
    showThird: true,
    showForth: true,
    showFifth: true,
    showSixth: true,
  }

  updateComponentVisibility() {
    this.componentVisibilityMatrix.showFirst = false;
    this.componentVisibilityMatrix.showSecond = false;
    this.componentVisibilityMatrix.showThird = false;
    this.componentVisibilityMatrix.showForth = false;
    this.componentVisibilityMatrix.showFifth = false;
    this.componentVisibilityMatrix.showSixth = false;

    if (this.currentStep == '1') this.componentVisibilityMatrix.showFirst = true;
    if (this.currentStep == '2') this.componentVisibilityMatrix.showSecond = true;
    if (this.currentStep == '3') this.componentVisibilityMatrix.showThird = true;
    if (this.currentStep == '4') this.componentVisibilityMatrix.showForth = true;
    if (this.currentStep == '5') this.componentVisibilityMatrix.showFifth = true;
    if (this.currentStep == '6') this.componentVisibilityMatrix.showSixth = true;
  }

  setPageCount(count) {
    let i = 1;
    while (i <= count) {
      this.pages.push({label: i.toString(), value: i.toString()});
      i++;
    }
    if (this.pages.length > 0) {
      this.currentStep = '1';
    }
  }

  handleChildRegister(event) {
    const item = event.detail;
    const guid = item.guid;
    this.privateChildrenRecord[guid] = item;
    this.componentsRegistered++;
    // Add a callback that
    // notifies the parent when child is unregistered
    item.callbacks.registerDisconnectCallback(this.handleChildUnregister);
  }

  handleChildUnregister(event) {
    const item = event.detail;
    const guid = item.guid;
    this.privateChildrenRecord[guid] = undefined;
    this.componentsRegistered--;
  }

  renderedCallback() {
    if (!this.isWizardSet) {
      this.setPageCount(this.componentsRegistered);
      this.isWizardSet = true;
      this.updateComponentVisibility();
    }
  }

  get isEnableNext() {
    return parseInt(this.currentStep) != this.pages.length;
  }

  get isEnablePrev() {
    return parseInt(this.currentStep) > 1;
  }

  get isEnableFinish() {
    return parseInt(this.currentStep) === this.pages.length;
  }

  handleNext() {
    this.currentStep = (parseInt(this.currentStep) + 1).toString();
    this.updateComponentVisibility();
  }

  handlePrev() {
    this.currentStep = (parseInt(this.currentStep) - 1).toString();
    this.updateComponentVisibility();
  }

  handleFinish() {
    this.updateComponentVisibility();
  }
}
