import { Recipee } from './mainPage.po';
import { browser, by, element } from 'protractor';
const targetRecipe = {
  id: 1,
  name: 'Chicken Masala',
  imagePath: '/assets/masala-chicken.jpg',
  indicator: 'nonveg',
  eatCount: 4,
  ingredients: [{ name: 'chicken' }, { name: 'tomato' }, { name: 'onion' },],
  instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  creationDate: '04-10-2019 12:30'
}

describe('Recipe App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  /* Scenarios to be Tested
   1. should display the name of the application
   2. Has Recipe Listing
   3. should display 3 recipes intially
   4. Search should work with input string as chicken masala
   5. continues search with input string and recipeType as veg
   6. continues search with input string and recipeType as nonveg
   7. Route to recipe detail page when clicked
   8. create a new recipe
 */

  it('should display the name of the application', () => {
    expect(element(by.css('.navbar-brand')).getText()).toContain('Recipe Dashboard');
  });

  it('has recipe Listing as the active view', () => {
    expect(element(by.css('.recipe-listing')).isPresent()).toBeTruthy();
  });

  it('has top recipes listed', () => {
    expect(element.all(by.css('app-recipe-item')).count()).toEqual(3);
  });

  it(`continues search with input string`, () => {
    element(by.css('.search-box')).sendKeys('chicken masala');
    browser.sleep(1000);
    expect(element.all(by.css('app-recipe-item')).count()).toBe(1);
  });

  it(`continues search with input string and recipeType as veg`, () => {
    element(by.css('.search-box')).sendKeys('chicken masala');
    element(by.id('veg')).click();
    browser.sleep(1000);
    expect(element.all(by.css('app-recipe-item')).count()).toBe(1);
  });

  it(`continues search with input string and recipeType as nonveg`, () => {
    element(by.css('.search-box')).sendKeys('chicken masala');
    element(by.id('nonveg')).click();
    browser.sleep(1000);
    expect(element.all(by.css('app-recipe-item')).count()).toBe(0);
  });

  it('can route to recipe details', () => {
    element.all(by.css('.list-group-item')).first().click();
    browser.sleep(1000);
    expect(element(by.css('app-recipe-detail')).isPresent()).toBeTruthy();
    let recipeDetail = element(by.css('app-recipe-detail'));
    let recipe = Recipee.recipeDetail(recipeDetail);
    expect(recipe.name).toEqual(targetRecipe.name);
  });

  it('should accept and save input values', () => {
    element(by.css('.new-recipe')).click();
    element(by.id('name')).sendKeys('Sandwich');
    element(by.id('pplCount')).sendKeys('6');
    element(by.id('imagePath')).sendKeys('/assets/pavbhaji.jpg');
    element(by.id('description')).sendKeys('Sandwich Recipe');
    element(by.id('vegtype')).click();
    element(by.css('.add-item')).click();
    browser.sleep(1000);
    element(by.id('name0')).sendKeys('tomato');
    element(by.css('.submit-btn')).click();
    expect(element.all(by.css('app-recipe-item')).count()).toEqual(4);
  });

});
