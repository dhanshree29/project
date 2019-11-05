export interface Recipe {
  id: number;
  name: string;
  imagePath: string;
  indicator: string;
  eatCount: number;
  ingredients: Array<{ name: string }>;
  instructions: any;
  creationDate: any;
}
