import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  environmentapiUrl: string;
  recipesChanged = new Subject<Recipe[]>();
  recipeCount = new Subject<number>();
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.environmentapiUrl = environment.apiUrl;
  }

  // Emit changed data and count for other components.
  updatedRecipeEmitter() {
    this.recipesChanged.next([...this.recipes]);
    this.recipeCount.next(this.recipes.length);
  }

  // Assign fetched Recipe and emit data.
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updatedRecipeEmitter();
  }


  // Get single recipe.
  getRecipeById(recipeId) {
    const getSingleRecipe = this.environmentapiUrl + '/recipes/';
    return this.http.get<Recipe>(getSingleRecipe + recipeId);
  }


  // Add recipe to array.
  addRecipe(recipeData) {
    const currentDate = new Date();
    const recipeId = Date.now();
    const singleRecipe: Recipe = {
      id: recipeId, name: recipeData.name, imagePath: recipeData.imagePath,
      indicator: recipeData.indicator, eatCount: recipeData.eatCount, ingredients: recipeData.ingredients,
      instructions: recipeData.instructions, creationDate: currentDate
    };

    this.recipes.push(singleRecipe);
    const postApi = this.environmentapiUrl + '/posts';
    this.http
      .post(
        postApi,
        this.recipes
      )
      .subscribe(() => {
        this.updatedRecipeEmitter();
      });
  }

  // Update recipes from client.
  updateRecipe(index: number, updatedRecipe: Recipe) {
    const currentDate = new Date();
    const oneRecipe: Recipe = {
      id: index, name: updatedRecipe.name, imagePath: updatedRecipe.imagePath,
      indicator: updatedRecipe.indicator, eatCount: updatedRecipe.eatCount, ingredients: updatedRecipe.ingredients,
      instructions: updatedRecipe.instructions, creationDate: currentDate
    };

    const updateApi = this.environmentapiUrl + '/recipesupdate/';
    this.http.put(updateApi + index, oneRecipe)
      .subscribe(() => {
        const updatedRecipes = [...this.recipes];
        const updatedIndex = updatedRecipes.findIndex(p => p.id === oneRecipe.id);
        updatedRecipes[updatedIndex] = oneRecipe;
        this.recipes = updatedRecipes;
        // Emit updated recipes for other component.
        this.updatedRecipeEmitter();
        // Redirects to recipes page.
        this.router.navigate(['/recipes/', index]);
      });
  }

  // Delete recipes from client.
  deleteRecipe(recipeId: number) {
    const deleteApi = this.environmentapiUrl + '/recipes/';
    this.http.delete(deleteApi + recipeId)
      .subscribe((response) => {
        this.recipes = response['remainingPost'];
        this.updatedRecipeEmitter();
      });
  }


  // Fetch recipes from server via api. uses angular http module.
  fetchRecipes() {
    const getApi = this.environmentapiUrl + '/getRecipes';
    return this.http.get<{ message: string, recipes: Recipe[] }>(getApi);
  }

}
