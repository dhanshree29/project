import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeSubscription: Subscription;
  isFetching: boolean;
  error: string;
  loader = 'loading...';
  filterMsg = 'No matches, Please refine your search!';
  recipeMsg = 'No recipes available!';
  filterArr = [];
  recipeType = [{ checked: false, type: 'veg' }, { checked: false, type: 'nonveg' }];
  filterString: string;

  constructor(private recipeservice: RecipeService) { }

  ngOnInit() {
    this.isFetching = true;
    // Fetch recipes by subscribing to http request.
    this.recipeservice.fetchRecipes().subscribe(
      responseData => {
        this.isFetching = false;
        this.recipes = responseData.recipes;
        this.recipeservice.setRecipes(this.recipes);
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
    this.recipeSubscription = this.recipeservice.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  // Clear memory for stored subscription.
  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
