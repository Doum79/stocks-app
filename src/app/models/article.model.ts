export interface Article {
  id: number;
  name: string;
  reference: string;
  quantity: number;
  price: number;
  typeArticleId: number;
  canTakeaway: boolean;
}
