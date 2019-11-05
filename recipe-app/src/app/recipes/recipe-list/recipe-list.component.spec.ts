import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipesearchPipe } from './recipesearch.pipe';
import { recipefilterPipe } from './recipefilter.pipe';

import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of, throwError } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [RecipeListComponent, RecipeItemComponent, RecipesearchPipe, recipefilterPipe],

    }).compileComponents();
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the loader if data is not fetched', () => {
    let app = fixture.debugElement.componentInstance; // get the app from fixture
    app.isFetching = true;
    fixture.detectChanges(); // We trigger change detection so that template get rendered.
    let compiled = fixture.debugElement.nativeElement; // Getting the native element to access the template
    // On this compiled template we expect <p> tag should render loader.
    expect(compiled.querySelector('p').textContent).toContain(app.loader);
  });

  it('should call FetchRecipe for listing recipes', async(() => {
    // Here we create a component in testing environment.
    fixture.detectChanges();
    component = fixture.componentInstance;

    const dataService = fixture.debugElement.injector.get(RecipeService);
    const response: { message: string, recipes: Recipe[] } = {
      message: 'Posts fetch successfully!',
      recipes: [
        {
          id: 1,
          name: 'Chicken Masala',
          imagePath: '/assets/masala-chicken.jpg',
          indicator: 'veg',
          eatCount: 4,
          ingredients: [{ name: 'chicken' }, { name: 'tomato' }, { name: 'onion' },],
          instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          creationDate: '04-10-2019 12:30'
        }
      ]
    };
    expect(component.isFetching).toEqual(true);
    spyOn(dataService, 'fetchRecipes').and.returnValue(of(response));

    component.ngOnInit();
    component.isFetching = true;

    fixture.detectChanges();
    expect(dataService.fetchRecipes).toHaveBeenCalledWith();
    expect(response.recipes.length).toEqual(1);
    component.isFetching = false;
  }));

  it('should check for the fetchRecipes error call', async(() => {
    fixture.detectChanges();
    component = fixture.componentInstance;

    const dataService = fixture.debugElement.injector.get(RecipeService);
    let message: string;
    expect(component.isFetching).toEqual(true);
    spyOn(dataService, 'fetchRecipes').and.returnValue(throwError({ message: 'Please try after sometime' }));

    component.ngOnInit();
    component.isFetching = true;

    fixture.detectChanges();
    dataService.fetchRecipes();
    expect(dataService.fetchRecipes).toHaveBeenCalledWith();
    component.isFetching = false;
    component.error = message;
  }));

});
