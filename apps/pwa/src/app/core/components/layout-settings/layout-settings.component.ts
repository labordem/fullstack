import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Theme, ThemeService } from '../../services/theme.service';

@Component({
  selector: 'pwa-layout-settings',
  templateUrl: './layout-settings.component.html',
  styleUrls: ['./layout-settings.component.scss'],
})
export class LayoutSettingsComponent implements OnInit {
  isDarkThemeToggled: boolean;
  themes: Theme[];
  appliedTheme: Theme;

  constructor(
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.applyTheme(this.themeService.theme);
    this.isDarkThemeToggled = this.appliedTheme.isDarkTheme;
    this.themes = this.themeService.availableThemes;
  }

  onToggleDarkTheme(): void {
    const newTheme: Theme = this.themeService.theme;
    this.isDarkThemeToggled = newTheme.isDarkTheme ? false : true;
    newTheme.isDarkTheme = this.isDarkThemeToggled;
    this.applyTheme(newTheme);
  }

  onChooseTheme(theme: Theme): void {
    let newTheme: Theme = theme;
    if (newTheme) {
      newTheme.isDarkTheme = this.isDarkThemeToggled;
    } else {
      newTheme = this.themeService.defaultTheme;
    }
    return this.applyTheme(newTheme);
  }

  private applyTheme(theme: Theme): void {
    if (theme.isDarkTheme) {
      this.renderer.addClass(this.document.body, 'mat-dark-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'mat-dark-theme');
    }
    this.renderer.setProperty(
      this.document.documentElement,
      'style',
      `
        --palette-primary-500: ${theme.colorPrimary};
        --palette-primary-contrast-500: ${theme.colorPrimaryContrast};
        --palette-accent-500: ${theme.colorAccent};
        --palette-accent-contrast-500: ${theme.colorAccentContrast};
        --palette-warn-500: ${theme.colorWarn};
        --palette-warn-contrast-500: ${theme.colorWarn};
      `
    );
    this.themeService.theme = theme;
    this.appliedTheme = theme;
  }
}
