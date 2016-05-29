import {Component} from '@angular/core';
import {Http} from '@angular/http';
import { CORE_DIRECTIVES } from '@angular/common';

let styles = require('./about.css');
let template = require('./about.html');

@Component({
  selector: 'home',
  directives: [CORE_DIRECTIVES],
  template: template,
  styles: [styles]
})
export class About {
  constructor(http: Http) {}
}
