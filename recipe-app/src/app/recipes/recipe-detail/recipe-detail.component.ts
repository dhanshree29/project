import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  Id: number;
  error: boolean;
  recipeSubscription: Subscription;
  displayRecipe: {
    id: number,
    ingredients: any,
    imagePath: string,
    instructions: string,
    eatCount: number,
    indicator: string,
    name: string,
    creationDate: any,
  };

  constructor(private recipeservice: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Fetching parameter from routes.
    this.Id = +this.route.snapshot.params['id'];
    this.route.params
      .subscribe((params: Params) => {
        this.Id = +params['id'];
        this.getSingleRecipe(this.Id);
      });
  }

  // Fetch single recipe.
  getSingleRecipe(recipeId) {
    // Get single recipe and pass to tpl.
    this.recipeservice.getRecipeById(recipeId).subscribe((singleRecipe: Recipe) => {
      this.displayRecipe = {
        id: singleRecipe.id,
        ingredients: singleRecipe.ingredients,
        imagePath: singleRecipe.imagePath,
        instructions: singleRecipe.instructions,
        eatCount: singleRecipe.eatCount,
        indicator: singleRecipe.indicator,
        name: singleRecipe.name,
        creationDate: singleRecipe.creationDate,
      };
      this.error = true;
    }, (error) => {
      this.error = false;
    });
  }

  // Navigate to edit recipe.
  onRecipeEdit() {
    this.router.navigate(['../', this.Id, 'edit'], { relativeTo: this.route });
  }

  // Delete a recipe and navigate to recipes page.
  onRecipeDelete() {
    this.recipeservice.deleteRecipe(this.Id);
    this.router.navigate(['/recipes']);
  }
}
