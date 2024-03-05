import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@layout/header/header.component';
import HeroComponent from '@layout/hero/hero.component';
import { CategoryService } from '@shared/services/categories.service';
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    HeaderComponent,
    SpinnerComponent,
    HeroComponent,
  ],
  template: `
    @if (categories$ | async; as categories) {
      <app-header [categories]="categories" />
    }

    @if (showHeroSection()) {
      <app-hero />
    }

    <main class="container px-4 py-10 mx-auto">
      <router-outlet />
    </main>
    <app-spinner />
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showHeroSection = signal<boolean>(false);
  readonly categories$ = inject(CategoryService).getCategories();
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this._showHeroSection();
  }

  private _showHeroSection() {
    this._router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        tap((event: NavigationEnd) => {
          const isHomePage = event.url === '/' || event.url === '/products';
          this.showHeroSection.set(isHomePage);
        }),
      )
      .subscribe();
  }
}
