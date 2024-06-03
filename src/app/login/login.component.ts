import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.loginForm = this.fb.group({
      password: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
    {
      this.loginForm.controls['email'].valueChanges.subscribe((value) => {});
    }
  }
  isValid(field: string) {
    return (
      this.loginForm.controls[field]?.valid &&
      this.loginForm.controls[field]?.touched
    );
  }
  isInvalid(field: string) {
    return (
      !this.loginForm.controls[field]?.valid &&
      this.loginForm.controls[field]?.touched
    );
  }

  submitting() {
    this.dataService.login(this.loginForm.value).subscribe(
      (r) => {
        console.log(r);
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
