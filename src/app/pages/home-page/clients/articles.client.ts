import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ArticlesClient {
  private readonly routeBase = 'api/articles';

  constructor(private readonly httpClient: HttpClient) {}

  public getAllArticles(): Observable<Article[]> {
    const url = `${environment.apiBaseUrl}/${this.routeBase}`;
    return this.httpClient.get<Article[]>(url);
  }
}
