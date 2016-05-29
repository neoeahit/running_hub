import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';

let styles   = require('./login.css');
let template = require('./login.html');

declare const FB:any;

@Component({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template,
  styles: [ styles ]
})

export class Login {

    constructor() {
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
