import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'pwa-root',
  template: `<pwa-layout></pwa-layout>`,
})
export class AppComponent implements OnInit {
  title = environment.APP_NAME;

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(environment.APP_NAME);
  }
}
