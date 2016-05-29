import {Component} from '@angular/core';
import {RouteConfig, RouterLink, Router} from '@angular/router-deprecated';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Home} from '../home/home';
import {Login} from '../login/login';
import {About} from '../about/about';


let template = require('./app.html');

@Component({
  selector: 'auth-app',
  template: template,
  directives: [ LoggedInRouterOutlet ]
})
@RouteConfig([
  { path: '/', redirectTo: ['/Home'] },
  { path: '/home', component: Home, as: 'Home' },
  { path: '/login', component: Login, as: 'Login' },
  { path: '/about', component: About, as: 'About' }
  ])

export class App {
  constructor(public router: Router) {
  }
}
