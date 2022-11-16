import LightningAlert from 'lightning/alert';
import {api, LightningElement, track} from 'lwc';

export default class ChildLwc extends LightningElement {
  @api
  frame;
  @api
  name;
  @track
  text;

  handleChange(event) {
    this.text = event.target.value;
  }

  sendData() {
    const ev = new CustomEvent('sharedata', {detail: {data: this.text, frame: this.frame}});
    this.dispatchEvent(ev);
  }

  @api
  validate() {
    if (this.text) {
      this.sendData();
      return true;
    }
    LightningAlert.open(
        {message: 'Please provide all Inputs for ' + this.name, theme: 'error', label: 'Error'});
    return false;
  }
}
