
package si.um.feri.backend.repository;

import si.um.feri.backend.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByImeContainingIgnoreCase(String ime);
}
