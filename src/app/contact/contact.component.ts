import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  formSubmitted: boolean = false;
  formSuccess: boolean = false;
  formError: string = '';

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      console.log('Form invalid', form);
      return;
    }

    this.http
      .post<{ message: string }>(
        'http://localhost:5000/submit-form',
        form.value
      )
      .subscribe({
        next: (response) => {
          console.log('Received response:', response);
          this.formSuccess = true;
          form.reset();
          this.formSubmitted = false;
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          this.formError = 'There was an error submitting the form.';
          this.formSubmitted = false;
        },
      });

    this.formSuccess = true;
    form.reset();
    this.formSubmitted = false;
  }
}
