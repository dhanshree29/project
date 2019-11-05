import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RecipeEditComponent } from './recipe-edit.component';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { of } from 'rxjs';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';



describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let router: Router;
  let dataService: RecipeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [RecipeEditComponent]
    })
      .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    dataService = fixture.debugElement.injector.get(RecipeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Onclick of cancle button should navigate to home',
    inject([Router], (router: Router) => {
      const spy = spyOn(router, 'navigate');
      const button = fixture.debugElement.query(By.css('.cancle-btn')).nativeElement;
      button.click();
      fixture.detectChanges();
      component.onCancel();
      const navArgs = spy.calls.first().args[0];
      expect(navArgs).toEqual(['../']);
    }));

  it('Onclick of submit button should update recipe', async(() => {
      component.editMode = true;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.submit-btn')).nativeElement;
      button.click();
      fixture.detectChanges();
      component.onSubmit();
      dataService.updateRecipe(1, {
        id: 1,
        name: 'Chicken Masala',
        imagePath: '/assets/masala-chicken.jpg',
        indicator: 'veg',
        eatCount: 4,
        ingredients: [{ name: 'chicken' }, { name: 'tomato' }, { name: 'onion' },],
        instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        creationDate: '04-10-2019 12:30'
      });
    }));

  it('Onclick of submit button should add recipe', async(() => {
      component.editMode = false;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.submit-btn')).nativeElement;
      button.click();
      fixture.detectChanges();
      component.onSubmit();
      dataService.addRecipe({
        id: 1,
        name: 'Chicken Masala',
        imagePath: '/assets/masala-chicken.jpg',
        indicator: 'veg',
        eatCount: 4,
        ingredients: [{ name: 'chicken' }, { name: 'tomato' }, { name: 'onion' },],
        instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        creationDate: '04-10-2019 12:30'
      });
    }));

  it('Onclick of add ingredient button should call onAddIngredient', () => {
    const button = fixture.debugElement.query(By.css('.add-item')).nativeElement;
    button.click();
    fixture.detectChanges();
    component.onAddIngredient();
  });

  it('Onclick of delete ingredient button should call onDeleteIngredient', () => {
    const button = fixture.debugElement.query(By.css('.add-item')).nativeElement;
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();
    component.onDeleteIngredient(0);
  });

  it('Should fetchdata single recipe based on editMode', async(() => {
    component.editMode = true;
    const response: Recipe = {
      id: 1,
      name: 'Chicken Masala',
      imagePath: '/assets/masala-chicken.jpg',
      indicator: 'veg',
      eatCount: 4,
      ingredients: [{ name: 'chicken' }, { name: 'tomato' }, { name: 'onion' },],
      instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      creationDate: '04-10-2019 12:30'
    };
    spyOn(dataService, 'getRecipeById').and.returnValue(of(response));
    component.recipeFrm();
    fixture.detectChanges();
    dataService.getRecipeById(1);
    expect(response.name).toEqual('Chicken Masala');
  }));

});
