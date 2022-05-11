# Den Skrå Avis / The Skewed Ebay

# Projekt struktur
Projektet er udarbejdet ifm. eksamen på CBS i faget Programmering og udvikling af små systemer og databaser. Applikationen er en klon af DBA og arkitekturen er opbygget således:

![image](https://user-images.githubusercontent.com/23297071/167842229-1cf27c69-b759-435a-bfc3-eae7cb69016a.png)


## Installation

* Omdøb dbDEFAULT.config.js filen til db.config.js og indtast databaseoplysninger, den skal have denne struktur:
```
module.exports = {
  HOST: "SERVERNAVN.database.windows.net",
  USER: "DITNAVN",
  PASSWORD: "DITPASSWORD",
  DB: "varmdatabase",
  dialect: "mssql",
  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

```



* Hent programmet ned med git clone og kør følgende:
```
npm install
```

* For at køre tests:
```
npm test
```

* For at starte node.js serveren:
```
npm start
```




### Funktionelle krav til besvarelsen (Del 1)
* App’en skal tillade en bruger at oprette en profil
* App’en skal tillade en bruger at slette sin egen profil
* App’en skal tillade en bruger at opdatere sin egen profil
* App’en skal tillade brugeren at logge ind
* App’en skal tillade at hvis en bruger er logget ind kan de forblive logget ind.
* App’en skal gøre det muligt at en bruger kan oprette en vare med en varekategori, billede og pris.
* App’en skal gøre det muligt at en bruger kan slette en vare du har oprettet.
* App’en skal gøre det muligt at en bruger kan opdatere en vare du har oprettet.
* App’en skal gøre det muligt for en bruger at logge ud
* App’en skal kunne vise en bruger en tabel over de varer, som de har til salg.
* App’en skal have en kategori menu hvor man kan klikke og få præsenteret alle varer til salg inden for en given kategori.
* Lave udførlige unit tests til 1 krav (vælg mellem krav 1-9). Dette betyder at alt funktionalitet for kravet skal være unit testet.

### Funktionelle krav til besvarelsen (Del 2)
* App



#### Tools
Til næste gang jeg committer sebastians nemid kodeord fra config filen:
`
  git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch app/config/db.config.js" \
  --prune-empty --tag-name-filter cat -- --all
  git push --force --verbose --dry-run
  git push --force`
