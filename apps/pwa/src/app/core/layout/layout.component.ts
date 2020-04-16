import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '@fullstack/data';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { environment } from 'apps/pwa/src/environments/environment';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';

interface Destination {
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'pwa-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  appName = environment.APP_NAME;
  destinations: Destination[];
  currentUser$: Observable<CurrentUser>;

  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit(): void {
    this.currentUser$ = this.currentUserService.getCurrentUser$();
    this.destinations = [
      {
        name: 'Home',
        path: 'home',
        icon: 'home',
      },
      {
        name: 'Profile',
        path: 'profile',
        icon: 'person',
      },
      {
        name: 'Article',
        path: 'article',
        icon: 'book',
      },
    ];
  }

  onSignoutClick(): void {
    return this.currentUserService.deleteCurrentUser();
  }
}
