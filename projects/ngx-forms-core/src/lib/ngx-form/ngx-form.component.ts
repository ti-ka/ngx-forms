import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form } from '../models';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-ngx-form',
  templateUrl: './ngx-form.component.html',
  styleUrls: ['./ngx-form.component.scss']
})
export class NgxFormComponent implements OnInit {

  @Input() form: Form;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  formGroup: FormGroup;

  constructor(private http: HttpClient
  //            , private router: Router
  ){}

  submitForm() {
    if (this.form.submitUrl) {
      const data = this.formGroup.value;
      this.http.request(this.form.method, this.form.submitUrl, data).subscribe(response => {
        console.log(response);
        alert(this.form.successMessage || 'The form has been submitted.');
        if (this.form.successUrl) {
          // return this.router.navigateByUrl(this.form.successUrl);
        }
      }, error => {
        console.log(error);
        alert(this.form.errorMessage || 'The form submission failed');
      });
    }

    this.submit.emit(this.formGroup.value);
  }

  ngOnInit() {
    const formGroupModel = {};
    this.form.sections.map(s => s.groups)
      .reduce((a, b) => a.concat(b))
      .forEach(group => {
          const formGroupItems = {};
          group.questions.forEach(q => {
              formGroupItems[q.id] = new FormControl(q.value);
          });
          formGroupModel[group.name] = new FormGroup(formGroupItems);
      });

    this.formGroup = new FormGroup(formGroupModel);
  }

  fileSelected(event, uploadControl, filenameControl) {
    // perhaps upload the file and fetch name
    filenameControl.value = uploadControl.value;
    this.formGroup.value['files']['image'] = filenameControl.value;
  }

}
