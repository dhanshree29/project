import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeEntryComponent } from './recipe-entry.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecipeService } from '../recipe.service';

describe('RecipeEntryComponent', () => {
  let component: RecipeEntryComponent;
  let fixture: ComponentFixture<RecipeEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [RecipeEntryComponent]
    }).compileComponents();
	
    fixture = TestBed.createComponent(RecipeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message in a h1 tag if true', async(() => {
    const app = fixture.debugElement.componentInstance;
    app.count = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Please select Recipe!');
  }));

  it('should fetch recipe count when set', () => {
    const app = fixture.debugElement.componentInstance;
    const recipeService = fixture.debugElement.injector.get(RecipeService);
    expect(app.count).toBeUndefined();
    recipeService.recipeCount.next(3);
    fixture.detectChanges();
    recipeService.recipeCount.subscribe(
      countRecipe => app.count = countRecipe,
      fail
    );
  });

});
