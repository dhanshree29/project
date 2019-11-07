import { by } from 'protractor';

export class Recipee {
  name: string;

  // Receipe id and name from the given detail element.
  static recipeDetail(detail) {
    let _name = detail.element(by.css('h1')).getText();
    return {
      name: _name
    };
  }
}
