import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form } from 'projects/ngx-forms-core/src/lib/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  form: Form;

  constructor(private http: HttpClient) {
  }

  async ngOnInit() {
    this.form = await this.http.get<Form>('./assets/config.json').toPromise();
  }

  submit(form) {
    console.log(form);
  }

}
