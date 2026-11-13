# Podrobni opisi še neimplementiranih primerov uporabe

## Primer uporabe: Prijava

**ID:** PU-01

**Cilj:**

Uporabnik želi varno dostopati do svojega uporabniškega računa in funkcionalnosti, ki so na voljo prijavljenim uporabnikom.

**Akterji:**

- Neprijavljeni uporabnik
- Sistem

**Predpogoji:**

- Uporabnik ima ustvarjen uporabniški račun.
- Uporabnik ni prijavljen v aplikacijo.

**Stanje sistema po PU:**

Uporabnik je uspešno prijavljen v sistem. Sistem si zapomni njegovo prijavno stanje in mu omogoči dostop do funkcionalnosti, ki so namenjene prijavljenim uporabnikom.

**Scenarij:**

1. Uporabnik odpre aplikacijo.
2. Izbere možnost »Prijava«.
3. Sistem prikaže obrazec za prijavo.
4. Uporabnik vnese uporabniško ime oziroma e-poštni naslov in geslo.
5. Uporabnik potrdi vnos.
6. Sistem preveri pravilnost vnesenih podatkov.
7. Sistem uporabnika uspešno prijavi.

**Alternativni tokovi:**

1a. Uporabnik se odloči, da se ne bo prijavil, in zapusti obrazec.

4a. Uporabnik vnese napačne prijavne podatke. Sistem prikaže obvestilo o nepravilnih podatkih in omogoči ponovni poskus prijave.

**Izjeme:**

- Če pride do napake pri povezavi s podatkovno bazo, sistem prikaže obvestilo o napaki in prijave ne izvede.
- Če uporabniški račun ne obstaja, sistem uporabnika obvesti, da prijava ni mogoča.

---

## Primer uporabe: Upravljanje receptov

**ID:** PU-02

**Cilj:**

Administrator želi upravljati vse recepte v aplikaciji, kar vključuje pregledovanje, dodajanje, urejanje in brisanje receptov.

**Akterji:**

- Administrator
- Sistem

**Predpogoji:**

- Administrator ima ustvarjen uporabniški račun.
- Administrator je uspešno prijavljen v aplikacijo.
- Administrator ima ustrezna dovoljenja za upravljanje receptov.

**Stanje sistema po PU:**

Stanje sistema se lahko spremeni, če administrator doda, uredi ali izbriše recept. Če administrator samo pregleda recepte, se stanje sistema ne spremeni.

**Scenarij:**

1. Administrator odpre aplikacijo.
2. Prijavi se v svoj uporabniški račun.
3. Izbere možnost za upravljanje receptov.
4. Sistem prikaže seznam vseh receptov.
5. Administrator izbere želeno dejanje: pregled, dodajanje, urejanje ali brisanje recepta.
6. Sistem izvede izbrano dejanje.
7. Sistem prikaže posodobljen seznam receptov.

**Alternativni tokovi:**

4a. V aplikaciji še ni nobenega recepta. Sistem prikaže obvestilo, da seznam receptov trenutno ne vsebuje podatkov.

5a. Administrator se odloči, da ne bo izvedel nobenega dejanja, in zapusti stran za upravljanje receptov.

**Izjeme:**

- Če pride do napake pri shranjevanju ali posodabljanju recepta, sistem prikaže obvestilo o napaki.
- Če recepta ni mogoče izbrisati, sistem administratorja obvesti, da brisanje ni bilo uspešno.
- Če administrator nima ustreznih dovoljenj, mu sistem ne omogoči dostopa do funkcionalnosti.

---

## Primer uporabe: Upravljanje uporabnikov

**ID:** PU-03

**Cilj:**

Administrator želi upravljati uporabniške račune v aplikaciji ter imeti pregled nad registriranimi uporabniki.

**Akterji:**

- Administrator
- Sistem

**Predpogoji:**

- Administrator ima ustvarjen uporabniški račun.
- Administrator je uspešno prijavljen v aplikacijo.
- V sistemu obstaja funkcionalnost uporabniških računov.

**Stanje sistema po PU:**

Stanje sistema se spremeni, če administrator doda, uredi ali izbriše uporabniški račun. Pri samem pregledu uporabnikov se stanje sistema ne spremeni.

**Scenarij:**

1. Administrator odpre aplikacijo.
2. Prijavi se v svoj uporabniški račun.
3. Izbere možnost »Upravljanje uporabnikov«.
4. Sistem prikaže seznam registriranih uporabnikov.
5. Administrator izbere uporabnika, ki ga želi upravljati.
6. Administrator izbere želeno dejanje: pregled, dodajanje, urejanje ali brisanje uporabniškega računa.
7. Sistem izvede izbrano dejanje.
8. Sistem prikaže posodobljen seznam uporabnikov.

**Alternativni tokovi:**

4a. V sistemu še ni registriranih uporabnikov. Sistem prikaže ustrezno obvestilo.

5a. Administrator se odloči, da ne bo izbral nobenega uporabnika, in zapusti stran.

**Izjeme:**

- Če pride do napake pri shranjevanju uporabniških podatkov, sistem prikaže obvestilo o napaki.
- Če uporabniškega računa ni mogoče izbrisati ali urediti, sistem administratorja obvesti o neuspešnem dejanju.
- Če administrator nima ustreznih dovoljenj, mu sistem ne omogoči upravljanja uporabnikov.

---

## Primer uporabe: Shranjevanje priljubljenih receptov

**ID:** PU-04

**Cilj:**

Prijavljeni uporabnik želi shraniti izbrane recepte med priljubljene, da jih lahko pozneje hitreje najde in ponovno pregleda.

**Akterji:**

- Prijavljeni uporabnik
- Sistem

**Predpogoji:**

- Uporabnik ima ustvarjen uporabniški račun.
- Uporabnik je prijavljen v aplikacijo.
- V aplikaciji obstaja vsaj en recept.

**Stanje sistema po PU:**

Stanje sistema se spremeni, saj se izbrani recept doda na seznam priljubljenih receptov uporabnika.

**Scenarij:**

1. Prijavljeni uporabnik odpre aplikacijo.
2. Pregleda seznam razpoložljivih receptov.
3. Izbere recept, ki ga želi shraniti med priljubljene.
4. Izbere možnost »Dodaj med priljubljene«.
5. Sistem izbrani recept shrani na seznam priljubljenih receptov uporabnika.
6. Sistem prikaže obvestilo o uspešno shranjenem receptu.

**Alternativni tokovi:**

3a. Uporabnik se odloči, da recepta ne bo shranil med priljubljene, in nadaljuje pregledovanje receptov.

4a. Recept je že shranjen med priljubljenimi. Sistem uporabnika obvesti, da je recept že na seznamu priljubljenih.

**Izjeme:**

- Če pride do napake pri shranjevanju recepta med priljubljene, sistem prikaže obvestilo o napaki.
- Če izbrani recept ne obstaja več, sistem uporabnika obvesti, da recepta ni mogoče shraniti.

---

## Primer uporabe: Brisanje lastnih receptov

**ID:** PU-05

**Cilj:**

Prijavljeni uporabnik želi izbrisati recept, ki ga je sam dodal v aplikacijo.

**Akterji:**

- Prijavljeni uporabnik
- Sistem

**Predpogoji:**

- Uporabnik ima ustvarjen uporabniški račun.
- Uporabnik je uspešno prijavljen v aplikacijo.
- Uporabnik ima v aplikaciji vsaj en svoj recept.

**Stanje sistema po PU:**

Stanje sistema se spremeni, saj se izbrani recept odstrani iz podatkovne baze in ni več prikazan na seznamu receptov.

**Scenarij:**

1. Prijavljeni uporabnik odpre aplikacijo.
2. Prijavi se v svoj uporabniški račun.
3. Odpre seznam svojih receptov.
4. Izbere recept, ki ga želi izbrisati.
5. Izbere možnost »Izbriši recept«.
6. Sistem preveri, ali izbrani recept pripada prijavljenemu uporabniku.
7. Sistem prikaže vprašanje za potrditev brisanja.
8. Uporabnik potrdi brisanje.
9. Sistem izbriše recept iz podatkovne baze.
10. Sistem prikaže obvestilo o uspešnem brisanju in posodobljen seznam receptov.

**Alternativni tokovi:**

4a. Uporabnik se odloči, da recepta ne bo izbrisal, in se vrne na seznam svojih receptov.

7a. Uporabnik prekliče brisanje. Sistem recepta ne izbriše in ga ohrani na seznamu.

**Izjeme:**

- Če izbrani recept ne pripada prijavljenemu uporabniku, sistem brisanje zavrne.
- Če recept ne obstaja več, sistem uporabnika obvesti, da recepta ni mogoče izbrisati.
- Če pride do napake pri brisanju iz podatkovne baze, sistem prikaže obvestilo o neuspešnem brisanju.