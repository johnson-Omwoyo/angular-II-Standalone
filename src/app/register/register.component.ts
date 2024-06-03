import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      dateOfBirth: [null, Validators.required],
      lastName: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }
  isValid(field: string) {
    return (
      this.registerForm.controls[field]?.touched &&
      this.registerForm.controls[field]?.valid
    );
  }
  isInvalid(field: string) {
    return (
      this.registerForm.controls[field]?.touched &&
      !this.registerForm.controls[field]?.valid
    );
  }
  passNotMatch(field: string, field2: string) {
    return (
      this.registerForm.controls[field2]?.touched &&
      this.registerForm.controls[field].value !=
        this.registerForm.controls[field2].value
    );
  }

  onSubmit() {
    this.dataService.register(this.registerForm.value).subscribe(
      (r) => {
        console.log(r);
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.displaytoast();
      }
    );
  }
  displaytoast() {
    const toast = document.getElementById('toastElement');
    if (toast) {
      toast.className = 'show';
      setTimeout(() => {
        toast.className = toast.className.replace('show', '');
      }, 1000);
    }
  }
}
