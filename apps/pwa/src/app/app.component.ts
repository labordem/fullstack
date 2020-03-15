import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'pwa-root',
  template: `
    <div>Api status: {{ apiResponse$ | async | json }}</div>
  `
})
export class AppComponent implements OnInit {
  title = environment.APP_NAME;
  apiResponse$: Observable<Object>;

  constructor(private http: HttpClient, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(environment.APP_NAME);
    this.apiResponse$ = this.http.get<Object>(
      `//${environment.API_DOMAIN}:${environment.API_PORT}/${environment.API_PREFIX}`
    );
  }
}
