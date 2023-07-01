import { Article } from "./article.model";

export interface BasketItem {
  article: Article;
  quantity: number;
  isTakeaway: boolean;
}
