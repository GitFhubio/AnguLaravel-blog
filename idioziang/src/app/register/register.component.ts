import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomValidators} from '../custom-validators';
import {MainService} from '../main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  status: string='';
  message: string='';
  // qui dopo control: c'era FormControl
  static isValidEmail(control : any ): any {
    const emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return emailRegexp.test(control.value) ? null : {
      invalidEmail: true
    };
  }
  constructor(fb: FormBuilder, private authService: MainService, public router: Router) {
    this.userForm = fb.group({
      email: fb.control('', [Validators.required, Validators.minLength(3), RegisterComponent.isValidEmail]),
      name: fb.control('', [Validators.required, Validators.minLength(3)]),
      password: fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),

      ])
    },
      );
  }
  ngOnInit(): void {
  }
  // registerUser(): void {
  //   console.log(this.userForm.value);
  // }
  registerUser(): void {
    this.authService.register(this.userForm.value)
      .subscribe(
        response  => {
          console.log(response);
          if (response == 1) {
// una volta che lo registro lo loggo gia dentro cosi ha token e puo accedere ad area riservata
            this.authService.login(this.userForm.value)
            .subscribe(
              response  => {
                console.log(response);
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
            // this.router.navigate(['/login']); // questo era prima che mettessi login dentro register
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
