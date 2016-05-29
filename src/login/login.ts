import { Component, enableProdMode, Injectable, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { contentHeaders } from '../common/headers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import {Observable} from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';
import { Jsonp, URLSearchParams } from '@angular/http';
import { JSONP_PROVIDERS }  from '@angular/http';

let styles   = require('./login.css');
let template = require('./login.html');

@Injectable()
class SubmitUserData {
constructor(private jsonp: Jsonp) {}

  submitUserData(data) {
    const endpoint = 'http://localhost:4000/auth/facebook';
    let params = new URLSearchParams();
    params.set('user', data); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    console.log(data);
    return this.jsonp
      .get(endpoint, { search : params})
      .map(res => res.json());
    }

}

declare const FB:any;

@Component({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template,
  styles: [ styles ],
  providers: [JSONP_PROVIDERS, SubmitUserData]
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
