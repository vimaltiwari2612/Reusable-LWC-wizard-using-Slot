import LightningAlert from 'lightning/alert';
import {api, LightningElement, track} from 'lwc';

export default class Container extends LightningElement {
  @api
  store = [];
  @track
  enableSave = false;

  async handleFinish() {
    console.table(this.store);
    let result = '';
    this.store.forEach(item => {
      result += 'Step '+item.frame + ' , data ' + item.data + ' | \n';
    });
    await LightningAlert.open({message: result, theme: 'success', label: 'Success'});
    // Alert has been closed
  }

  handleSharedData(event) {
    this.store[event.detail.frame - 1] = event.detail;
  }
}
