# AplikacijaRecepti – Tvoja kuhinja, tvoji recepti

## Člani skupine

- Anđela Pavlović
- Jovana Trajkova
- Niki Polanec

## 1. Vizija projekta

AplikacijaRecepti je namenjena vsem, ki radi kuhajo in želijo imeti svoje recepte shranjene na enem mestu. Namesto izpisov, zapiskov in razpršenih povezav uporabnik svojo zbirko receptov hitro pregleda, uredi in dopolni. Cilj aplikacije je, da je iskanje in priprava recepta čim enostavnejša.

### 1.1 Opis rešitve

AplikacijaRecepti je spletna aplikacija, v kateri uporabnik vodi svojo zbirko receptov. Vsak recept ima ime, opis, sestavine in čas priprave. Recepte lahko dodaja, ureja in briše, med njimi pa išče po imenu ter jih razvršča po imenu ali času priprave.

#### Ključne funkcionalnosti

- Dodajanje novih receptov.
- Pregled vseh shranjenih receptov.
- Urejanje obstoječih receptov.
- Brisanje receptov.
- Iskanje receptov po imenu.
- Razvrščanje receptov po imenu ali času priprave, naraščajoče ali padajoče.

### 1.2 Obseg rešitve in morebitne omejitve

Aplikacija pokriva osnovno upravljanje receptov (dodajanje, pregled, urejanje, brisanje, iskanje in razvrščanje). Zavedamo se naslednjih omejitev:

- Ni uporabniških računov, vsi uporabniki si delijo isto zbirko receptov.
- Sestavine so vpisane kot besedilo, ločeno z vejicami, brez količin in enot.
- Recepti nimajo slik, kategorij ali oznak.
- Iskanje deluje samo po imenu recepta.
- Aplikacija je trenutno namenjena lokalnemu zagonu, za delovanje morata teči frontend in backend ter podatkovna baza PostgreSQL.
- Uporabniški vmesnik je samo v slovenščini.

## 2. Besednjak

| Izraz | Pomen |
|---|---|
| Recept | Zapis jedi z imenom, opisom, sestavinami in časom priprave. Osnovna enota v aplikaciji. |
| Ime recepta | Naziv jedi, po katerem recept iščemo in razvrščamo. Obvezen podatek. |
| Opis recepta | Kratek opis jedi. Neobvezen podatek. |
| Sestavine | Seznam živil, ki jih potrebujemo za pripravo jedi. Vnesemo jih ločene z vejico, prikazane so kot seznam. Obvezen podatek. |
| Čas priprave | Čas, ki ga potrebujemo za pripravo jedi, izražen v minutah. Obvezen podatek. |
| Zbirka receptov | Vsi recepti, ki jih je uporabnik shranil v aplikaciji (v aplikaciji prikazana kot "Moji recepti"). |
| Kartica recepta | Prikaz posameznega recepta v zbirki z imenom, časom priprave, opisom in sestavinami. |
| Iskanje receptov | Filtriranje zbirke po imenu recepta. Velikost črk ni pomembna, dovolj je del imena. |
| Razvrščanje receptov | Urejanje zbirke po imenu recepta ali času priprave. |
| Vrstni red | Smer razvrščanja: naraščajoče (npr. od A do Ž, od najkrajšega časa) ali padajoče. |
| Privzeti vrstni red | Razvrstitev receptov po času dodajanja, torej tako, kot so bili shranjeni. |

## 3. O projektu

AplikacijaRecepti je spletna aplikacija za shranjevanje in upravljanje receptov. Uporabnik lahko dodaja nove recepte, pregleduje obstoječe, jih ureja in briše.

Vsak recept vsebuje ime, opis, sestavine in čas priprave. Aplikacija omogoča tudi iskanje receptov po imenu ter razvrščanje po imenu in času priprave.

Projekt je sestavljen iz frontenda, backenda in podatkovne baze PostgreSQL.

## 4. Uporabljene tehnologije

### Frontend
- **React 19.3.1** – izdelava uporabniškega vmesnika.
- **React DOM 19.3.1** – prikaz React komponent v brskalniku.
- **JavaScript** – programski jezik.
- **Vite 8.3.5** – razvoj in zagon aplikacije.
- **CSS** – oblikovanje uporabniškega vmesnika.
- **ESLint 10.13.0** – preverjanje kode.

### Backend
- **Java 21** – programski jezik.
- **Spring Boot 4.0.8** – razvoj backenda.
- **Spring Data JPA** – delo s podatkovno bazo.
- **Spring Web MVC** – izdelava REST API-ja.
- **PostgreSQL 18** – shranjevanje podatkov.
- **Maven** – upravljanje odvisnosti in zagon projekta.
- **Springdoc OpenAPI 3.0.2** – dokumentacija REST API-ja.

### Druga orodja
- **IntelliJ IDEA** – razvojno okolje.
- **Git in GitHub** – upravljanje različic in shranjevanje kode.

## 5. Struktura projekta

Projekt je razdeljen na dve glavni mapi: `backend` in `frontend`.

### 5.1 Backend

Mapa `backend` vsebuje zaledni del aplikacije, razvit v Javi s pomočjo Spring Boot.

- `src/main/java/si/um/feri/backend` – vsebuje Java kodo.
- `controller` – vsebuje `RecipeController`, ki sprejema HTTP zahtevke in skrbi za komunikacijo s frontendom.
- `model` – vsebuje razred `Recipe`, ki predstavlja recept.
- `repository` – vsebuje `RecipeRepository` za dostop do podatkovne baze.
- `src/main/resources` – vsebuje konfiguracijske datoteke.
- `application.properties` – vsebuje nastavitve aplikacije in povezave s podatkovno bazo.
- `pom.xml` – vsebuje odvisnosti projekta.
- `mvnw` in `mvnw.cmd` – omogočata uporabo Maven Wrapperja.

### 5.2 Frontend

Mapa `frontend` vsebuje uporabniški del aplikacije, izdelan s knjižnico React.

- `public` – vsebuje javne datoteke.
- `src` – vsebuje izvorno kodo aplikacije.
- `assets` – vsebuje slike in grafične datoteke.
- `App.jsx` – glavna komponenta aplikacije.
- `App.css` in `index.css` – vsebujeta stile aplikacije.
- `main.jsx` – vstopna točka React aplikacije.
- `package.json` – vsebuje odvisnosti in ukaze za zagon.
- `package-lock.json` – vsebuje natančne različice nameščenih paketov in njihove odvisnosti.
- `vite.config.js` – vsebuje konfiguracijo Vite.
- `eslint.config.js` – vsebuje konfiguracijo orodja ESLint.

V glavni mapi se nahajata tudi `.gitignore`, ki določa datoteke, ki se ne vključijo v Git, in `README.md` z dokumentacijo projekta.

## 6. Navodila za nameščanje in zagon

### 6.1 Predpogoji

Za zagon projekta potrebujemo:

- Java JDK 21
- Node.js in npm
- PostgreSQL 18
- Git

### 6.2 Prenos projekta

Projekt prenesemo iz GitHub repozitorija:

```bash
git clone https://github.com/jtrajkova11/AplikacijaRecepti.git
```

Nato odpremo glavno mapo projekta:

```bash
cd AplikacijaRecepti
```

### 6.3 Nastavitev podatkovne baze

Najprej zaženemo PostgreSQL in ustvarimo podatkovno bazo z imenom `recepti_db`.

Povezava s podatkovno bazo je nastavljena v datoteki `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/recepti_db
spring.datasource.username=postgres
spring.datasource.password=${DB_PASSWORD}
```

Geslo nastavimo z okoljsko spremenljivko. V PowerShellu izvedemo:

```powershell
$env:DB_PASSWORD="your_postgresql_password"
```

Namesto `your_postgresql_password` vnesemo svoje geslo za PostgreSQL.

### 6.4 Zagon backenda

V prvem terminalu odpremo mapo `backend`:

```powershell
cd backend
```

Nastavimo okoljsko spremenljivko `DB_PASSWORD` in zaženemo backend:

```powershell
$env:DB_PASSWORD="your_postgresql_password"
.\mvnw.cmd spring-boot:run
```

Backend deluje na naslovu:

http://localhost:8080

### 6.5 Zagon frontenda

V drugem terminalu odpremo mapo `frontend`:

```powershell
cd frontend
```

Namestimo potrebne pakete:

```powershell
npm install
```

Zaženemo frontend:

```powershell
npm run dev
```

Frontend deluje na naslovu:

http://localhost:5173

Za pravilno delovanje aplikacije morata biti frontend in backend zagnana hkrati.

### 6.6 Swagger UI

Dokumentacija REST API-ja je dostopna na naslovu:

http://localhost:8080/swagger-ui.html

## 7. Navodila za razvijalce

Izvorna koda projekta je shranjena v GitHub repozitoriju:

https://github.com/jtrajkova11/AplikacijaRecepti

Za delo s projektom uporabljamo Git. Osnovni postopek dela je:

1. Prenesemo projekt z ukazom `git clone`.
2. Pred začetkom dela pridobimo zadnje spremembe:

```bash
git pull
```

3. Izvedemo spremembe v kodi.
4. Preverimo delovanje aplikacije.
5. Dodamo spremenjene datoteke:

```bash
git add .
```

6. Ustvarimo commit z opisnim sporočilom:

```bash
git commit -m "Update recipes"
```

7. Spremembe pošljemo na GitHub:

```bash
git push
```

Gesel in drugih občutljivih podatkov ne dodajamo v Git repozitorij.

## 8. Standardi kodiranja

Pri pisanju kode upoštevamo naslednja pravila:

- Uporabljamo jasna in razumljiva imena spremenljivk, metod in razredov.
- Imena Java razredov pišemo z veliko začetnico, npr. `RecipeController`.
- Imena metod in spremenljivk pišemo z malo začetnico.
- Imena React komponent pišemo z veliko začetnico, npr. `App`.
- Kodo razdelimo na manjše in pregledne dele.
- Uporabljamo enotno zamikanje kode.
- Odstranimo neuporabljeno kodo.
- Gesel ne shranjujemo neposredno v izvorno kodo ali javni repozitorij.