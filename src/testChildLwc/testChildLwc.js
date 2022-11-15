import {api, LightningElement, track} from 'lwc';

export default class TestChildLwc extends LightningElement {
  @api
  frame;
  @api
  name;

  @api validate(){
    return true
  }

}
