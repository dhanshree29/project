import { browser, by, element } from 'protractor';

describe('Recipe App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should display the name of the application', () => {
    expect(element(by.css('.navbar-brand')).getText()).toContain('Recipe Dashboard');
  });

  it('should display message - No recipes available!', () => {
    expect(element(by.css('.msg-txt')).getText()).toContain('No recipes available!');
  });

  it('has no recipes listed', () => {
    expect(element.all(by.tagName('app-recipe-item')).count()).toEqual(0);
  });

});
