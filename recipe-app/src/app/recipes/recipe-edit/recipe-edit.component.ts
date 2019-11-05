import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(400)),
    ]),
  ]
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  recipeForm: FormGroup;
  id: number;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Fetch Id from paramaters and load a form based on mode.
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.recipeFrm();
        }
      );
  }

  recipeFrm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeeatCount;
    let recipeInstructions = '';
    let recipeType = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) { // If mode is edit populate value in form element.
      this.recipeService.getRecipeById(this.id)
        .subscribe((recipe) => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeeatCount = recipe.eatCount;
          recipeInstructions = recipe.instructions;
          recipeType = recipe.indicator;

          // Push ingredient to array.
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required)
                })
              );
            }
          }
          this.recipeForm = new FormGroup({
            name: new FormControl(recipeName, Validators.required),
            imagePath: new FormControl(recipeImagePath, [Validators.required, Validators.pattern(/\.(jpe?g|png|gif|bmp)$/i)]),
            eatCount: new FormControl(recipeeatCount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            instructions: new FormControl(recipeInstructions, [Validators.required, Validators.minLength(5)]),
            indicator: new FormControl(recipeType, Validators.required),
            ingredients: recipeIngredients
          });
        }); // Get single recipe and pass to tpl.

    }
    // Map a formcontrol to template element.

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, [Validators.required, Validators.pattern(/\.(jpe?g|png|gif|bmp)$/i)]),
      eatCount: new FormControl(recipeeatCount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      instructions: new FormControl(recipeInstructions, [Validators.required, Validators.minLength(5)]),
      indicator: new FormControl(recipeType, Validators.required),
      ingredients: recipeIngredients
    });
  }


  // Add ingredient on edit form.
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  // Delete single ingredient on edit form.
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  // On click on cancle button navigate to home page.
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // Function called when form is submitted.
  onSubmit() {
    if (this.editMode) { // If mode is edit then update recipe.
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else { // If mode is not edit then add recipe.
      this.recipeService.addRecipe(this.recipeForm.value);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  // Add multiple items for ingredient.
  getControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
