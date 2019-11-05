import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-entry',
  templateUrl: './recipe-entry.component.html',
  styleUrls: ['./recipe-entry.component.css']
})
export class RecipeEntryComponent implements OnInit {
  count: number;

  constructor(private recipeservice: RecipeService) { }

  ngOnInit() {
    // Fetching recipe count to display message in template based on count.
    this.recipeservice.recipeCount
      .subscribe((countRecipe) => {
        this.count = countRecipe;
      });
  }
}
