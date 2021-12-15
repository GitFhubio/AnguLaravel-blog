import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MainService} from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  passwordControl: FormControl;
  emailControl: FormControl;
  token: string='';
  status: string='';
  message: string='';
  // con tipo FormControl ho problemi
  static isValidEmail(control: any) {
    const emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return emailRegexp.test(control.value) ? null : {
      invalidEmail: true
    };
  }
  constructor(fb: FormBuilder, private authService: MainService, private router: Router) {
    this.passwordControl = fb.control('', [Validators.required, Validators.minLength(6)]);
    this.emailControl = fb.control('', [Validators.required, LoginComponent.isValidEmail]);
    this.userForm = fb.group({
      email: this.emailControl,
      password: this.passwordControl
    });
  }
  ngOnInit(): void {
  }
  login(): void {
    this.authService.login(this.userForm.value)
      .subscribe(
        response  => {
          console.log(response);
          console.log(this.authService.current('id'))
          if (response === true) {
            this.router.navigate(['/admin']);
          } else {
            this.status = 'error';
            this.message = 'Username or password is incorrect';
          }
        },
        error =>  {
          console.log(error);
          this.status = 'error';
          this.message = error[`message`];
        }
      );
  }
}
