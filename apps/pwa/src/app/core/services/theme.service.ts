import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Theme {
  name: string;
  isDarkTheme: boolean;
  colorPrimary: string;
  colorPrimaryContrast: string;
  colorAccent: string;
  colorAccentContrast: string;
  colorWarn: string;
  colorWarnContrast: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject: BehaviorSubject<Theme>;

  constructor() {
    this.themeSubject = new BehaviorSubject<Theme>(
      JSON.parse(localStorage.getItem('theme')) || this.defaultTheme
    );
  }

  get theme$(): Observable<Theme> {
    return this.themeSubject.asObservable();
  }

  get theme(): Theme {
    return this.themeSubject.value;
  }

  set theme(newValue: Theme) {
    this.themeSubject.next(newValue);
    localStorage.setItem('theme', JSON.stringify(newValue));
  }

  get defaultTheme(): Theme {
    return this.availableThemes[0];
  }

  get availableThemes(): Theme[] {
    return [
      {
        name: 'angular',
        isDarkTheme: false,
        colorPrimary: '#e24242',
        colorPrimaryContrast: 'white',
        colorAccent: '#007acb',
        colorAccentContrast: 'white',
        colorWarn: '#F44336',
        colorWarnContrast: 'white'
      },
      {
        name: 'javascript',
        isDarkTheme: false,
        colorPrimary: '#fbd601',
        colorPrimaryContrast: 'black',
        colorAccent: 'black',
        colorAccentContrast: 'white',
        colorWarn: '#F44336',
        colorWarnContrast: 'white'
      },
      {
        name: 'typescript',
        isDarkTheme: false,
        colorPrimary: '#007acb',
        colorPrimaryContrast: 'white',
        colorAccent: 'black',
        colorAccentContrast: 'white',
        colorWarn: '#F44336',
        colorWarnContrast: 'white'
      }
    ];
  }
}
