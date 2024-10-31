import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss',
})
export class AddClientComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this._initAuthForm();
  }

  private _initAuthForm() {
    this.form = this.formBuilder.group({
      organization: ['', [Validators.required]],
      person: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form?.invalid) return;

    // Correctly access the form controls
    this.clientsService
      .addClient(
        this.getAuthForm['organization'].value,
        this.getAuthForm['person'].value,
        this.getAuthForm['phone'].value
      )
      .subscribe(
        (response: any) => {
          window.location.reload();
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
