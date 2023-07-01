import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { ArticlesClient } from '../clients/articles.client';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesClient: ArticlesClient) {}

  public getAllArticles(): Observable<Article[]> {
    return this.articlesClient.getAllArticles();
    // .pipe(
    //   map((articles) => {
    //     const artilcesSorted = [...articles];
    //     artilcesSorted.sort((a, b) => a.quantity - b.quantity);
    //     return artilcesSorted;
    //   })
    // );
  }
}
