import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from './services/articles.service';
import { Subject, takeUntil } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { BasketItem } from 'src/app/models/basket-item.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  public articles: Article[] = [];
  public articleBasketRef: Record<string, BasketItem> = {};
  public quantity = 0;

  private readonly destroy$ = new Subject<void>();

  public constructor(private readonly articlesService: ArticlesService) {}

  public ngOnInit(): void {
    this.getAllArtilcesObservable();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAllArtilcesObservable(): void {
    this.articlesService
      .getAllArticles()
      .pipe(takeUntil(this.destroy$))
      .subscribe((articles) => {
        this.articles = articles;
      });
  }
}
