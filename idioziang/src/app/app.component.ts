import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { MainService } from './main.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faHamburger=faHamburger;
  title = 'idioziang';
  constructor(public router:Router,public mservice:MainService) {}
}
