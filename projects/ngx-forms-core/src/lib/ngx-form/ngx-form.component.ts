import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Form } from '../models';

@Component({
    selector: 'lib-ngx-form',
    templateUrl: './ngx-form.component.html',
    styleUrls: ['./ngx-form.component.scss']
})
export class NgxFormComponent implements OnInit {

    @Input() form: Form;
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();

    formGroup: FormGroup;

    constructor(private http: HttpClient, /*private router: Router*/){}

    submitForm() {
        if (!this.form.submitUrl) {
            this.submit.emit(this.formGroup.value);
            return;
        }

        const data = this.formGroup.value;
        const request = this.http.request(this.form.method, this.form.submitUrl, data).toPromise();
        request.catch(err => {
            console.log(err);
            alert(this.form.errorMessage || 'The form submission failed');
            this.submit.error(err);
        }).then(response => {
            console.log(response);
            alert(this.form.successMessage || 'The form has been submitted.');
            this.submit.next(data);
            if (this.form.successUrl) {
                // return this.router.navigateByUrl(this.form.successUrl);
            }
        });
    }

    ngOnInit() {
        const formGroupModel = {};
        this.form.sections.map(s => s.groups)
            .reduce((a, b) => a.concat(b))
            .forEach(group => {
                const formGroupItems = {};
                group.questions.forEach(q => {
                    if (group.name) {
                        formGroupItems[q.name] = new FormControl(q.value);
                    } else {
                        formGroupModel[q.name] = new FormControl(q.value);
                    }
                });
                if (Object.keys(formGroupItems).length > 0) {
                    formGroupModel[group.name] = new FormGroup(formGroupItems);
                }
            });

        console.log(formGroupModel);
        this.formGroup = new FormGroup(formGroupModel);
    }

    fileSelected(event, uploadControl, filenameControl) {
        // perhaps upload the file and fetch name
        filenameControl.value = uploadControl.value;
        this.formGroup.value['image'] = filenameControl.value;
    }

}
