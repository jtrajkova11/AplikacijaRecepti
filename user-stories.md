# Uporabniške zgodbe – prijava, vloge in shranjeni recepti (vaja 6)

Nova funkcionalnost: **prijava uporabnikov, vloge (gost / uporabnik / administrator), objava in upravljanje lastnih receptov, shranjevanje ("všečkanje") receptov ter skrbniško moderiranje.**

## Vloge

| Vloga | Pravice |
|-------|---------|
| Gost (neprijavljen) | Pregled, iskanje in razvrščanje receptov |
| Uporabnik (prijavljen) | Vse, kar zmore gost + objava novih receptov, urejanje in brisanje lastnih receptov, shranjevanje receptov |
| Administrator | Vse, kar zmore uporabnik + brisanje poljubnega recepta in odstranitev poljubnega uporabnika |

## Pregled zgodb

| ID | Zgodba | Odgovorna oseba |
|----|--------|-----------------|
| US-01 | Registracija, prijava in odjava | Jovana Trajkova |
| US-02 | Pregled, iskanje in razvrščanje receptov kot gost | Niki Polanec |
| US-03 | Objava, urejanje in brisanje lastnih receptov | Niki Polanec |
| US-04 | Shranjevanje receptov | Anđela Pavlović |
| US-05 | Skrbniško moderiranje (brisanje receptov in uporabnikov) | Jovana Trajkova |

> Pomoč pri INVEST: zgodbe so neodvisne toliko, kolikor to dovoljuje tema (US-01 je osnova za US-03 do US-05), vsaka je vrednostna za uporabnika, dovolj majhna za en sprint, in preverljiva prek kriterijev sprejemljivosti.

---

## US-01 – Registracija, prijava in odjava

**Kot** obiskovalec želim **ustvariti račun in se prijaviti**, **da** lahko uporabljam funkcije, ki so na voljo samo registriranim uporabnikom.

**Odgovorna oseba:** Jovana Trajkova

### Kriteriji sprejemljivosti

**AC-01.1 – Uspešna prijava**
- Given: obstaja registriran uporabnik z imenom "ana" in geslom "Skrivno123"
- When: obiskovalec v prijavni obrazec vnese "ana" in "Skrivno123" ter potrdi
- Then: obiskovalec je prijavljen, v glavi vidi svoje uporabniško ime, možnosti za prijavo in registracijo pa zamenja gumb "Odjava".

**AC-01.2 – Napačni podatki**
- Given: obstaja uporabnik "ana"
- When: obiskovalec vnese "ana" in napačno geslo
- Then: ostane neprijavljen in vidi sporočilo "Napačno uporabniško ime ali geslo"; sporočilo ne razkrije, kateri podatek je napačen.

**AC-01.3 – Zasedeno uporabniško ime**
- Given: uporabnik "ana" že obstaja
- When: obiskovalec se poskusi registrirati z imenom "ana"
- Then: račun ni ustvarjen in prikaže se sporočilo "Uporabniško ime je že zasedeno".

**AC-01.4 – Prekratko geslo**
- Given: obiskovalec je v obrazcu za registracijo
- When: vnese geslo z manj kot 8 znaki
- Then: račun ni ustvarjen in prikaže se sporočilo "Geslo mora imeti vsaj 8 znakov".

**AC-01.5 – Odjava**
- Given: uporabnik je prijavljen
- When: klikne "Odjava"
- Then: je odjavljen in ne more objavljati, urejati, brisati ali shranjevati receptov, dokler se ponovno ne prijavi.

### Podrobnosti implementacije
- Gesla se shranjujejo samo kot zgoščena vrednost (BCrypt, knjižnica `spring-security-crypto`), nikoli kot navadno besedilo.
- Ob prijavi backend ustvari naključen žeton (UUID), ga shrani v tabelo `auth_tokens` in ga vrne frontendu. Frontend ga hrani v `localStorage` in ga pošilja v glavi `Authorization: Bearer <žeton>`. Ob odjavi se žeton izbriše.
- Entiteta `AppUser`: `id`, `username` (unikatno), `passwordHash`, `role` (`USER` ali `ADMIN`). Nove registracije so vedno `USER`.
- Končne točke: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`.
- Statusi: `401` napačni podatki, `409` zasedeno ime, `400` neveljaven vnos.
- Prvi administrator se ustvari ob zagonu iz okoljskih spremenljivk `ADMIN_USERNAME` in `ADMIN_PASSWORD`.

### Naloge (podnaloge)
1. **Backend: model uporabnika in avtentikacija** – Jovana Trajkova – entitete `AppUser` in `AuthToken`, zgoščevanje gesel, končne točke za registracijo, prijavo, odjavo.
2. **Frontend: obrazca za prijavo in registracijo** – Jovana Trajkova – obrazca s sporočili o napakah, shranjevanje žetona, prikaz stanja v glavi.
3. **Testi avtentikacije** – Jovana Trajkova – preverjanje AC-01.1 do AC-01.5.

---

## US-02 – Pregled, iskanje in razvrščanje receptov kot gost

**Kot** gost želim **pregledovati, iskati in razvrščati recepte brez prijave**, **da** hitro najdem recept brez ustvarjanja računa.

**Odgovorna oseba:** Niki Polanec

### Kriteriji sprejemljivosti

**AC-02.1 – Pregled seznama**
- Given: uporabnik ni prijavljen in obstaja vsaj en recept
- When: odpre seznam receptov
- Then: vidi vse recepte z imenom, časom priprave in avtorjem, brez gumbov za objavo, urejanje, brisanje ali shranjevanje.

**AC-02.2 – Iskanje**
- Given: obstajata recepta "Jabolčna pita" in "Goveji golaž"
- When: uporabnik poišče "jabolč"
- Then: seznam vsebuje samo "Jabolčna pita" (velikost črk ni pomembna).

**AC-02.3 – Razvrščanje**
- Given: obstaja več receptov
- When: uporabnik izbere razvrščanje po času priprave naraščajoče
- Then: recepti so urejeni od najkrajšega do najdaljšega časa priprave.

**AC-02.4 – Ni zadetkov**
- Given: noben recept ne vsebuje besede "xyz"
- When: uporabnik poišče "xyz"
- Then: seznam je prazen in prikaže se sporočilo "Ni najdenih receptov".

**AC-02.5 – Zaščitena stran za gosta**
- Given: uporabnik ni prijavljen
- When: poskusi odpreti obrazec za dodajanje recepta
- Then: obrazec ni dostopen in uporabnik je usmerjen na prijavo.

### Podrobnosti implementacije
- `GET /api/recipes?search=<besedilo>&sort=<name|preparationTime>&order=<asc|desc>` je javna končna točka (žeton ni potreben).
- Iskanje je po imenu recepta, brez razlikovanja velikih in malih črk.
- Neveljaven `sort` ali `order` vrne `400`.
- Frontend skrije omejene kontrole glede na stanje prijave, backend pa pravice preverja neodvisno.

### Naloge (podnaloge)
1. **Backend: iskanje in razvrščanje z validacijo parametrov** – Niki Polanec – razširitev `GET /api/recipes`.
2. **Frontend: stanje "Ni najdenih receptov" in skrivanje kontrol za goste** – Niki Polanec.
3. **Preusmeritev gosta z zaščitenih strani** – Niki Polanec.

---

## US-03 – Objava, urejanje in brisanje lastnih receptov

**Kot** prijavljen uporabnik želim **objavljati nove recepte ter urejati in brisati svoje**, **da** lahko delim in vzdržujem svojo zbirko.

**Odgovorna oseba:** Niki Polanec

### Kriteriji sprejemljivosti

**AC-03.1 – Objava**
- Given: uporabnik je prijavljen
- When: izpolni obrazec z imenom, sestavinami in časom priprave ter potrdi
- Then: recept se pojavi na seznamu in kot avtor je naveden uporabnik.

**AC-03.2 – Neveljaven recept**
- Given: uporabnik je prijavljen
- When: pošlje obrazec s praznim imenom
- Then: recept ni shranjen in prikaže se sporočilo "Ime recepta je obvezno".

**AC-03.3 – Urejanje lastnega recepta**
- Given: uporabnik je prijavljen in je avtor recepta "Jabolčna pita"
- When: spremeni ime v "Najboljša jabolčna pita" in shrani
- Then: seznam in podrobnosti prikazujejo novo ime.

**AC-03.4 – Brisanje lastnega recepta**
- Given: uporabnik je prijavljen in je avtor recepta
- When: potrdi brisanje
- Then: recept izgine s seznama in iz shranjenih receptov drugih uporabnikov.

**AC-03.5 – Tuj recept**
- Given: uporabnik je prijavljen, recept "Goveji golaž" pa je objavil nekdo drug
- When: odpre ta recept ali ga poskusi spremeniti ali izbrisati
- Then: gumbov za urejanje in brisanje ni, poskus spremembe pa je zavrnjen s sporočilom "Urejate lahko samo svoje recepte".

### Podrobnosti implementacije
- Recept ima polji `authorId` in `authorName`; lastništvo se preveri na strežniku ob vsaki spremembi.
- Končne točke: `POST /api/recipes`, `PUT /api/recipes/{id}`, `DELETE /api/recipes/{id}` (zahtevajo žeton).
- Statusi: `401` ni prijavljen, `403` ni lastnik (in ni administrator), `404` recept ne obstaja, `400` neveljaven vnos.
- Brisanje recepta izbriše tudi zapise o shranjevanju tega recepta.
- Obstoječi recepti brez avtorja (`authorId = null`) lahko urejajo in brišejo samo administratorji.

### Naloge (podnaloge)
1. **Backend: ustvarjanje, urejanje, brisanje s preverjanjem lastništva** – Niki Polanec.
2. **Frontend: obrazec in kontrole za lastne recepte** – Niki Polanec – dialog za potrditev brisanja.
3. **Testi pravil lastništva** – Niki Polanec – AC-03.1 do AC-03.5.

---

## US-04 – Shranjevanje receptov

**Kot** prijavljen uporabnik želim **med brskanjem shranjevati recepte**, **da** jih pozneje zlahka najdem.

**Odgovorna oseba:** Anđela Pavlović

### Kriteriji sprejemljivosti

**AC-04.1 – Shranjevanje**
- Given: uporabnik je prijavljen in recepta "Goveji golaž" še ni shranil
- When: klikne gumb za shranjevanje pri tem receptu
- Then: recept je označen kot shranjen in se pojavi na seznamu "Shranjeni recepti".

**AC-04.2 – Odstranitev iz shranjenih**
- Given: uporabnik je recept "Goveji golaž" shranil
- When: ponovno klikne gumb za shranjevanje
- Then: recept ni več označen in izgine iz "Shranjeni recepti".

**AC-04.3 – Trajnost**
- Given: uporabnik je shranil "Goveji golaž" in se odjavil
- When: se ponovno prijavi
- Then: "Goveji golaž" je še vedno med shranjenimi recepti.

**AC-04.4 – Gost ne more shranjevati**
- Given: uporabnik ni prijavljen
- When: pregleduje recepte
- Then: gumba za shranjevanje ni, neposreden poskus shranjevanja pa je zavrnjen.

**AC-04.5 – Izbrisan recept**
- Given: recept je bil izbrisan, medtem ko ga je uporabnik imel odprtega
- When: uporabnik klikne gumb za shranjevanje
- Then: prikaže se sporočilo "Recept ne obstaja več" in nič se ne shrani.

### Podrobnosti implementacije
- Tabela `saved_recipes(user_id, recipe_id)` z unikatnim parom, tako da dvojno shranjevanje ne ustvari dvojnika.
- Končne točke: `POST /api/recipes/{id}/save`, `DELETE /api/recipes/{id}/save`, `GET /api/users/me/saved`.
- Statusi: `401` ni prijavljen, `404` recept ne obstaja.

### Naloge (podnaloge)
1. **Backend: shranjevanje in končne točke** – Anđela Pavlović – entiteta `SavedRecipe`, repozitorij, controller.
2. **Frontend: gumb za shranjevanje in stran "Shranjeni recepti"** – Anđela Pavlović.
3. **Testi shranjevanja** – Anđela Pavlović – AC-04.1 do AC-04.5.

---

## US-05 – Skrbniško moderiranje

**Kot** administrator želim **izbrisati poljuben recept in odstraniti poljubnega uporabnika**, **da** aplikacija ostane brez neprimernih vsebin in zlorabljenih računov.

**Odgovorna oseba:** Jovana Trajkova

### Kriteriji sprejemljivosti

**AC-05.1 – Brisanje tujega recepta**
- Given: administrator je prijavljen in obstaja recept drugega uporabnika
- When: ga izbriše
- Then: recept izgine s seznama.

**AC-05.2 – Odstranitev uporabnika**
- Given: administrator je prijavljen in uporabnik "boris" ima dva recepta
- When: odstrani "borisa" in potrdi
- Then: "boris" se ne more več prijaviti in njegovi recepti niso več na seznamu.

**AC-05.3 – Navaden uporabnik**
- Given: navaden uporabnik je prijavljen
- When: poskusi odstraniti uporabnika ali izbrisati tuj recept
- Then: dejanje je zavrnjeno s sporočilom "Potrebne so skrbniške pravice" in nič se ne spremeni.

**AC-05.4 – Administrator ne more odstraniti sebe**
- Given: administrator je prijavljen
- When: poskusi odstraniti lasten račun
- Then: dejanje je zavrnjeno s sporočilom "Ne moreš odstraniti lastnega računa".

**AC-05.5 – Neobstoječ uporabnik**
- Given: administrator je prijavljen
- When: poskusi odstraniti uporabnika, ki je že odstranjen
- Then: prikaže se sporočilo "Uporabnik ne obstaja".

### Podrobnosti implementacije
- Preverjanje vloge poteka na strežniku iz uporabnika, vezanega na žeton, nikoli iz podatkov odjemalca.
- Končne točke: `GET /api/admin/users`, `DELETE /api/admin/users/{id}`; brisanje recepta uporablja `DELETE /api/recipes/{id}` s pravilom "lastnik ali administrator".
- Z odstranitvijo uporabnika se izbrišejo tudi njegovi recepti, zapisi o shranjevanju in žetoni.
- Prvi administrator nastane ob zagonu (`ADMIN_USERNAME`, `ADMIN_PASSWORD`).

### Naloge (podnaloge)
1. **Backend: skrbniške končne točke in kaskadno brisanje** – Jovana Trajkova.
2. **Frontend: seznam uporabnikov za administratorja in gumbi za brisanje** – Jovana Trajkova – vidno samo administratorju.
3. **Testi skrbniških pravic** – Jovana Trajkova – AC-05.1 do AC-05.5.

---

## Preverjanje po implementaciji

| Zgodba | Kriteriji | Rezultat | Preveril |
|--------|-----------|----------|----------|
| US-01 | AC-01.1 – 01.5 | ☐ | |
| US-02 | AC-02.1 – 02.5 | ☐ | |
| US-03 | AC-03.1 – 03.5 | ☐ | |
| US-04 | AC-04.1 – 04.5 | ☐ | |
| US-05 | AC-05.1 – 05.5 | ☐ | |
