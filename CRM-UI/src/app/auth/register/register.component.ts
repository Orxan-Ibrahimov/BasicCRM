import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'ok';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initAuthForm();
  }

  private _initAuthForm() {
    this.form = this.formBuilder.group({
      name: ['sss', [Validators.required, Validators.minLength(3)]],
      surname: ['sss', [Validators.required, Validators.minLength(3)]],
      email: [
        'sss@gmail.com',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        ],
      ],
      password: ['11111111', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['11111111', [Validators.required]],
    },
    { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form?.invalid) return;
    else if (this.passwordMatchValidator(this.form)) return;

    this.authService
      .register(
        this.getAuthForm?.['name'].value,
        this.getAuthForm?.['surname'].value,
        this.getAuthForm?.['email'].value,
        this.getAuthForm?.['password'].value
      )
      .subscribe(
        () => {
          this.router.navigateByUrl('/auth/login');
        },
        (response) => {
          this.authError = true;
          this.authMessage = response.error.message;
        }
      );
  }

  private passwordMatchValidator(form: FormGroup) {
   
    return form.get('password')?.value === form.get('confirm_password')?.value
      ? null
      : { mismatch: true };
  }

   get getAuthForm() {
    return this.form?.controls;
  }
}
