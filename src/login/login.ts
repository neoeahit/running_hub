import { Component, enableProdMode, Injectable, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { contentHeaders } from '../common/headers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import {Observable} from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';
import { Http, Headers, Response, RequestOptions, HTTP_PROVIDERS, URLSearchParams } from '@angular/http';

let styles   = require('./login.css');
let template = require('./login.html');

@Injectable()
class SubmitUserData {
  constructor(private http: Http) {}

  submitUserData(data) {
    const endpoint = 'http://localhost:4000/auth/facebook';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(data);
    return this.http
      .post(endpoint, data, options)
      .map(res => res.json());
    }

  private handleError (error: any) {
  // In a real world app, we might use a remote logging infrastructure
  // We'd also dig deeper into the error to get a better message
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg); // log to console instead
  console.log("i am here")
  return Promise.reject(errMsg);
}
}

declare const FB:any;

@Component({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template,
  styles: [ styles ],
  providers: [HTTP_PROVIDERS, SubmitUserData]
})

export class Login implements OnInit{

    constructor(private _api: SubmitUserData) {
        FB.init({
            appId      : '1034066206674244',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
        });
    }

    onFacebookLoginClick() {
        FB.login();
    }



    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            FB.api('/me', {fields: 'email,birthday,picture,first_name,gender,last_name,location'},
            function(response) {
                localStorage.setItem('jwt_stades', JSON.stringify(response));
            });
            if(localStorage.getItem('jwt_stades')){
                this._api.submitUserData(localStorage.getItem('jwt_stades')).subscribe(
              data => { console.log("success")},
              err => console.error(err),
              () => console.log('done posting data')
            );
              }
        }else if (resp.status === 'not_authorized') {
        }else {
        }
    };

    ngOnInit() {
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }
}
