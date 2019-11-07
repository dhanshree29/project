import { TestBed, inject } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeService],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([RecipeService],
    (service: RecipeService) => {
      recipeService = service;
  }));

  it('should be created', () => {
    expect(recipeService).toBeTruthy();
  });

  it('should fetch a list of recipes', () => {
    recipeService.fetchRecipes().subscribe(data => {
      expect(data.recipes.length).toEqual(3);
      expect(data.recipes[0].name).toEqual('Chicken Masala');
      expect(data.recipes[1].name).toEqual('Pizaa');
      expect(data.recipes[2].name).toEqual('Pav Bhaji');
      recipeService.setRecipes(data.recipes);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/getRecipes`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch a recipe by Id', () => {
    recipeService.getRecipeById(1).subscribe(recipe => {
      expect(recipe[0].name).toEqual('Chicken Masala');
    });
  });

  it('should allow adding recipes', () => {
    const recipe: Recipe = {
      id: 4,
      name: 'Pasta',
      imagePath: '/assets/vegetables-italian-pizza-restaurant.jpg',
      indicator: 'nonveg',
      eatCount: 8,
      ingredients: [{ name: 'bread' }, { name: 'cheese' },],
      instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      creationDate: '04-10-2019 12:30',
    }
    recipeService.addRecipe(recipe);
    recipeService.fetchRecipes().subscribe(data => {
      expect(data.recipes.length).toEqual(4);
    });
  });

  it('should allow deleting recipe', () => {
    recipeService.deleteRecipe(1);
    recipeService.recipeCount.subscribe(
      response => { expect(response).toEqual(2); }
    );
  });

  it('should update recipe', () => {
    const mockRecipe = {
      id: 1,
      name: 'Chicken Masala',
      imagePath: '/assets/masala-chicken.jpg',
      indicator: 'veg',
      eatCount: 4,
      ingredients: [{ name: 'chicken' }, { name: 'tomato' }, { name: 'onion' },],
      instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      creationDate: '04-10-2019 12:30'
    };
    recipeService.updateRecipe(1, mockRecipe);
  });

});
