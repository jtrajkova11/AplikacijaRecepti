
package si.um.feri.backend.controller;

import si.um.feri.backend.model.Recipe;
import si.um.feri.backend.repository.RecipeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeRepository recipeRepository;

    public RecipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        Recipe savedRecipe = recipeRepository.save(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
    }

    @GetMapping
    public List<Recipe> getAllRecipes(
            @RequestParam(required = false) String ime,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        List<Recipe> recipes;

        if (ime != null && !ime.isBlank()) {
            recipes = recipeRepository.findByImeContainingIgnoreCase(ime);
        } else {
            recipes = recipeRepository.findAll();
        }

        if (!sortBy.equals("ime")
                && !sortBy.equals("casPriprave")
                && !sortBy.equals("id")) {
            sortBy = "id";
        }
        final String sortField = sortBy;
        Sort.Direction sortDirection =
                direction.equalsIgnoreCase("desc")
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;

        recipes.sort((r1, r2) -> {
            int result;

            if (sortField.equals("ime")) {
                result = r1.getIme().compareToIgnoreCase(r2.getIme());
            } else if (sortField.equals("casPriprave")) {
                result = Integer.compare(
                        r1.getCasPriprave(), r2.getCasPriprave());
            } else {
                result = Long.compare(r1.getId(), r2.getId());
            }

            return sortDirection == Sort.Direction.ASC ? result : -result;
        });

        return recipes;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(
            @PathVariable Long id,
            @RequestBody Recipe updatedRecipe) {

        Optional<Recipe> existingRecipe = recipeRepository.findById(id);

        if (existingRecipe.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Recipe recipe = existingRecipe.get();
        recipe.setIme(updatedRecipe.getIme());
        recipe.setOpis(updatedRecipe.getOpis());
        recipe.setSestavine(updatedRecipe.getSestavine());
        recipe.setCasPriprave(updatedRecipe.getCasPriprave());

        Recipe savedRecipe = recipeRepository.save(recipe);
        return ResponseEntity.ok(savedRecipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        if (!recipeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        recipeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
