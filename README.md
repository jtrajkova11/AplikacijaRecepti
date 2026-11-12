# AplikacijaRecepti – Tvoja kuhinja, tvoji recepti

## 1. O projektu

AplikacijaRecepti je spletna aplikacija za shranjevanje in upravljanje receptov. Uporabnik lahko dodaja nove recepte, pregleduje obstoječe, jih ureja in briše.

Vsak recept vsebuje ime, opis, sestavine in čas priprave. Aplikacija omogoča tudi iskanje receptov po imenu ter razvrščanje po imenu in času priprave.

Projekt je sestavljen iz frontenda, backenda in podatkovne baze PostgreSQL.

## 2. Uporabljene tehnologije

### 2.1 Frontend

- React 19.3.1 – knjižnica za izdelavo uporabniškega vmesnika.
- React DOM 19.3.1 – omogoča prikaz React komponent v brskalniku.
- JavaScript (ECMAScript) – programski jezik za razvoj frontend dela.
- Node.js 24.15.0 – izvajalno okolje za JavaScript.
- npm 11.12.1 – upravljanje paketov in odvisnosti.
- Vite 8.3.5 – orodje za razvoj in zagon frontend aplikacije (v package.json je navedeno ^8.3.4).
- CSS – oblikovanje uporabniškega vmesnika.
- ESLint 10.13.0 – preverjanje kakovosti in pravilnosti kode.

### 2.2 Backend

- Java JDK 21.0.8 – programski jezik in razvojno okolje.
- Spring Boot 4.0.8 – ogrodje za razvoj backenda.
- Spring Data JPA – dostop do podatkovne baze in upravljanje podatkov.
- Spring Web MVC – izdelava REST API-ja.
- PostgreSQL 18.6 – sistem za upravljanje relacijske podatkovne baze.
- PostgreSQL JDBC Driver 42.7.13 – omogoča povezavo med aplikacijo Java in podatkovno bazo PostgreSQL.
- Apache Maven 3.10.0 – upravljanje odvisnosti in gradnja projekta.
- Maven Wrapper – omogoča uporabo ustrezne različice Maven orodja prek projekta.
- Springdoc OpenAPI 3.0.2 – generiranje dokumentacije REST API-ja.

Različici Spring Data JPA in Spring Web MVC upravlja Spring Boot prek svojega sistema za upravljanje odvisnosti.

### 2.3 Druga orodja

- IntelliJ IDEA 2025.2.3 – razvojno okolje za backend.
- Git 2.54.0 – sistem za upravljanje različic izvorne kode.
- GitHub – spletna platforma za shranjevanje kode in sodelovanje pri razvoju projekta.

## 3. Struktura projekta

Projekt je organiziran v dve glavni mapi: `backend` in `frontend`. V korenski mapi projekta se nahajajo tudi skupne konfiguracijske datoteke in dokumentacija.

```text
AplikacijaRecepti/
├── backend/
│   ├── .mvn/
│   │   └── wrapper/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── si/um/feri/backend/
│   │   │   │       ├── controller/
│   │   │   │       │   └── RecipeController.java
│   │   │   │       ├── model/
│   │   │   │       │   └── Recipe.java
│   │   │   │       ├── repository/
│   │   │   │       │   └── RecipeRepository.java
│   │   │   │       └── BackendApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/
│   │           └── si/um/feri/backend/
│   │               └── BackendApplicationTests.java
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

**Opis strukture:**

- `backend` – vsebuje zaledni del aplikacije, razvit v Javi s pomočjo Spring Boot.
- `frontend` – vsebuje uporabniški vmesnik, razvit s knjižnico React.
- `backend/src/main/java` – vsebuje glavno Java kodo aplikacije.
- `controller` – vsebuje `RecipeController`, ki sprejema HTTP zahtevke in skrbi za komunikacijo s frontendom.
- `model` – vsebuje razred `Recipe`, ki predstavlja recept.
- `repository` – vsebuje `RecipeRepository`, ki omogoča dostop do podatkovne baze.
- `resources/application.properties` – vsebuje konfiguracijo aplikacije in povezavo s podatkovno bazo.
- `backend/src/test` – vsebuje testne datoteke.
- `pom.xml` – vsebuje odvisnosti in konfiguracijo Maven projekta.
- `mvnw` in `mvnw.cmd` – omogočata uporabo Maven Wrapperja.
- `frontend/public` – vsebuje javno dostopne datoteke.
- `frontend/src` – vsebuje izvorno kodo frontend aplikacije.
- `assets` – vsebuje slike in grafične datoteke.
- `App.jsx` – glavna komponenta uporabniškega vmesnika.
- `App.css` in `index.css` – vsebujeta stile aplikacije.
- `main.jsx` – vstopna točka React aplikacije.
- `package.json` – vsebuje podatke o projektu, odvisnosti in ukaze za zagon.
- `package-lock.json` – vsebuje natančne različice nameščenih paketov.
- `vite.config.js` – vsebuje konfiguracijo orodja Vite.
- `eslint.config.js` – vsebuje konfiguracijo orodja ESLint.
- `.gitignore` – določa datoteke in mape, ki jih Git ne vključuje v repozitorij.
- `README.md` – vsebuje dokumentacijo projekta.

## 4. Navodila za nameščanje in zagon

### 4.1 Predpogoji

Za namestitev in zagon projekta potrebujemo:

- Java JDK 21.
- Node.js 24 in npm 11.
- PostgreSQL 18.
- Git.

### 4.2 Prenos projekta

Projekt prenesemo iz GitHub repozitorija:

```bash
git clone https://github.com/jtrajkova11/AplikacijaRecepti.git
```

Nato odpremo glavno mapo projekta:

```bash
cd AplikacijaRecepti
```

### 4.3 Nastavitev podatkovne baze

Najprej zaženemo PostgreSQL in ustvarimo podatkovno bazo z imenom `recepti_db`.

Povezava s podatkovno bazo je nastavljena v datoteki `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/recepti_db
spring.datasource.username=postgres
spring.datasource.password=${DB_PASSWORD}
```

Geslo za PostgreSQL nastavimo z okoljsko spremenljivko. V PowerShellu izvedemo:

```powershell
$env:DB_PASSWORD="your_postgresql_password"
```

Namesto `your_postgresql_password` vnesemo svoje geslo za PostgreSQL.

### 4.4 Zagon backenda

V prvem terminalu odpremo mapo `backend`:

```powershell
cd backend
```

Nastavimo okoljsko spremenljivko `DB_PASSWORD` in zaženemo backend:

```powershell
$env:DB_PASSWORD="your_postgresql_password"
.\mvnw.cmd spring-boot:run
```

Backend se zažene na naslovu `http://localhost:8080`.

REST API je dostopen na naslovu:

[http://localhost:8080/api/recipes](http://localhost:8080/api/recipes)

Dokumentacija API-ja (Swagger UI):

[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

### 4.5 Zagon frontenda

V drugem terminalu odpremo mapo frontend:

```bash
cd frontend
```

Namestimo potrebne pakete:

```bash
npm install
```

Zaženemo frontend aplikacijo:

```bash
npm run dev
```

Frontend deluje na naslovu:

http://localhost:5173

Za pravilno delovanje aplikacije morata biti frontend in backend zagnana hkrati.

### 4.6 Swagger UI

Dokumentacija REST API-ja je dostopna na naslovu:

http://localhost:8080/swagger-ui.html

## 5. Navodila za razvijalce

Izvorna koda projekta je shranjena v GitHub repozitoriju:

https://github.com/jtrajkova11/AplikacijaRecepti

Pri razvoju projekta uporabljamo Git in GitHub. Vsak član ekipe dela na svoji veji (branch), da se spremembe posameznih razvijalcev ne prepisujejo med seboj.

### 5.1 Priprava okolja

Najprej prenesemo projekt iz GitHub repozitorija:

```bash
git clone https://github.com/jtrajkova11/AplikacijaRecepti.git
```

Odpremo glavno mapo projekta:

```bash
cd AplikacijaRecepti
```

Preklopimo na glavno vejo in prenesemo najnovejše spremembe:

```bash
git switch main
git pull origin main
```

### 5.2 Ustvarjanje lastne veje

Pred začetkom dela ustvarimo novo vejo za nalogo, na kateri bomo delali.

Ime veje naj vsebuje vrsto dela in kratek opis naloge.

Primer za razvoj nove funkcionalnosti:

```bash
git switch -c feature/kratki-opis
```

Za razvoj nove funkcionalnosti uporabimo predpono `feature/`.

Primer za popravljanje napake:

```bash
git switch -c bugfix/kratki-opis
```

Za popravljanje napak uporabimo predpono `bugfix/`.

Imena vej naj bodo kratka, razumljiva in povezana z nalogo, na kateri delamo.

### 5.3 Shranjevanje in pošiljanje sprememb

Po končanem delu preverimo spremenjene datoteke:

```bash
git status
```

Dodamo datoteke, ki jih želimo vključiti v commit:

```bash
git add .
```

Ustvarimo commit z jasnim opisnim sporočilom:

```bash
git commit -m "Add recipe search functionality"
```

Spremembe pošljemo na GitHub:

```bash
git push -u origin feature/kratki-opis
```

Pri naslednjih posodobitvah iste veje uporabimo:

```bash
git push
```

### 5.4 Pull Request in združevanje sprememb

Ko je delo na veji končano:

1. Na GitHubu odpremo repozitorij projekta.
2. Ustvarimo nov Pull Request.
3. Kot ciljno vejo (base) izberemo `main`.
4. Kot izvorno vejo (compare) izberemo svojo vejo.
5. V opisu na kratko predstavimo opravljene spremembe.
6. Člani ekipe pregledajo spremembe.
7. Po pregledu in odobritvi Pull Request združimo (merge) v vejo `main`.

Po združitvi sprememb posodobimo svojo lokalno vejo `main`:

```bash
git switch main
git pull origin main
```

Če nadaljujemo z delom na svoji veji, jo posodobimo z najnovejšimi spremembami iz veje `main`:

```bash
git switch feature/kratki-opis
git merge main
```

### 5.5 Pravila sodelovanja

- Vsak član ekipe uporablja svoj GitHub račun in svojo vejo.
- Spremembe pošiljamo na GitHub v manjših, logično zaključenih commitih.
- Sporočila commitov naj jasno opisujejo opravljeno delo.
- Sprememb ne pošiljamo neposredno v vejo `main`.
- Pred združitvijo pregledamo spremembe v Pull Requestu.
- Pred začetkom nove naloge posodobimo lokalno vejo `main`.
- Gesel, ključev in drugih občutljivih podatkov ne dodajamo v Git repozitorij.
- Vsak član ekipe je odgovoren za preverjanje delovanja svoje spremembe.

## 6. Standardi kodiranja

Pri pisanju kode upoštevamo enotna pravila, da je projekt pregleden, razumljiv in enostaven za vzdrževanje.

### 6.1 Java

- Imena razredov zapisujemo v obliki PascalCase, npr. `RecipeController` in `RecipeRepository`.
- Imena metod in spremenljivk zapisujemo v obliki camelCase, npr. `getRecipeById` in `recipeName`.
- Imena paketov zapisujemo z malimi črkami.
- Vsak razred naj ima jasno določeno odgovornost.
- Kodo razdelimo na manjše in logično povezane metode.
- Uporabljamo razumljiva imena spremenljivk, metod in razredov.

### 6.2 JavaScript in React

- Imena React komponent zapisujemo z veliko začetnico, npr. `App`.
- Imena funkcij in spremenljivk zapisujemo v obliki camelCase, npr. `handleSubmit` in `recipeName`.
- Komponente naj bodo pregledne in naj imajo jasno določeno nalogo.
- JSX kodo zapisujemo pregledno in uporabljamo enotno zamikanje.
- Odstranimo neuporabljeno kodo in nepotrebne spremenljivke.
- Pri preverjanju kode uporabljamo ESLint.

### 6.3 Splošna pravila

- Uporabljamo enoten slog zapisovanja in zamikanja kode.
- Izbiramo jasna in opisna imena.
- Kodo razdelimo na logične in pregledne dele.
- Izogibamo se nepotrebnemu podvajanju kode.
- Spremembe preverimo pred pošiljanjem na GitHub.
- Gesel in drugih občutljivih podatkov ne zapisujemo neposredno v izvorno kodo ali javni GitHub repozitorij.