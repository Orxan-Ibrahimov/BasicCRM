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
import { LocaleStorageService } from '../../../services/locale-storage.service';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';

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
  me: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private usersService: UsersService,
    private tokenStorageService: LocaleStorageService
  ) {}
  ngOnInit(): void {
    this.tokenStorageService.me().subscribe((data) => {
      if (data)
        this.usersService.getUserById(data?.id).subscribe((user) => {
          this.me = user;
          console.log(this.me.role);
        });
    });

    this._initAuthForm();
  }

  private _initAuthForm() {
    this.form = this.formBuilder.group({
      organization: ['', [Validators.required]],
      person: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.me?.role !== 'admin') {
      alert('Only admins can remove clients.');
      return;
    }

    this.isSubmitted = true;

    if (this.form?.invalid) return;

    // Correctly access the form controls
    this.clientsService
      .addClient(
        this.getAuthForm['organization'].value,
        this.getAuthForm['person'].value,
        this.getAuthForm['phone'].value,
        this.getAuthForm['address'].value
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
