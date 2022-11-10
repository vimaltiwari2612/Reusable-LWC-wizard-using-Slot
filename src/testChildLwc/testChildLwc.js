import { LightningElement } from 'lwc';

export default class TestChildLwc extends LightningElement {

  // child.js
connectedCallback() {
    const itemregister = new CustomEvent('privateitemregister', {
        bubbles: true,
        detail: {
            callbacks: {
                registerDisconnectCallback: this.registerDisconnectCallback
            },
            guid: 1,
         }
    });
 
    this.dispatchEvent(itemregister);
}


// Store the parent's callback so we can invoke later
registerDisconnectCallback(callback) {
  //  this.disconnectFromParent = callback;
}

disconnectedCallback() {
  //  this.disconnectFromParent(this.guid);
}

}