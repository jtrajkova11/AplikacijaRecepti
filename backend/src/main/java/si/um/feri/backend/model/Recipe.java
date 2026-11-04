package si.um.feri.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ime;
    private String opis;
    private String sestavine;
    private int casPriprave;

    public Recipe() {

}

    public Recipe(String ime, String opis, String sestavine, int casPriprave) {
        this.ime = ime;
        this.opis = opis;
        this.sestavine = sestavine;
        this.casPriprave = casPriprave;
    }

    public Long getId() {
        return id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getSestavine() {
        return sestavine;
    }

    public void setSestavine(String sestavine) {
        this.sestavine = sestavine;
    }

    public int getCasPriprave() {
        return casPriprave;
    }

    public void setCasPriprave(int casPriprave) {
        this.casPriprave = casPriprave;
    }
}
