import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LocaleStorageService } from '../../services/locale-storage.service';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink], // Import ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Corrected from styleUrl to styleUrls
})
export class LoginComponent {
  form!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: LocaleStorageService
  ) {}

  ngOnInit(): void {
    this._initAuthForm();
  }

  private _initAuthForm() {
    this.form = this.formBuilder.group({
      email: [
        'orxan@gmail.com',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      password: ['Orxan620', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form?.invalid) return;

    // Correctly access the form controls
    this.authService
      .login(
        this.getAuthForm['email'].value, // Use 'email' as the control name
        this.getAuthForm['password'].value // Use 'password' as the control name
      )
      .subscribe(
        (response: any) => {
         
          this.tokenStorage.setItem(response['token']);
          this.router.navigateByUrl('/home');
        },
        (response) => {        
          this.authError = true;
          this.authMessage = response.error.message;
        }
      );
  }

  get getAuthForm() {
    return this.form?.controls;
  }
}
