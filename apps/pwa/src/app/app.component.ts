import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'pwa-root',
  template: `
    <div>Api status: {{ apiResponse$ | async | json }}</div>
  `
})
export class AppComponent implements OnInit {
  title = 'pwa';
  apiResponse$: Observable<Object>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.apiResponse$ = this.http.get<Object>('http://localhost:3001/api');
  }
}
