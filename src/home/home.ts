import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router-deprecated';
import { AuthHttp } from 'angular2-jwt';

let styles = require('./home.css');
let template = require('./home.html');


@Component({
  selector: 'home',
  directives: [CORE_DIRECTIVES],
  template: template,
  styles: [styles]
})
export class Home {}
