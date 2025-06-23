# Transformer sessionize -> openfeedback

Prérequis :

* NodeJS
* variable d'environnement SESSIONIZE_API_URL contenant l'URL sessionize pour toutes les données, de la forme `https://sessionize.com/api/v2/<id>/view/All`

`npm run transform` génère le fichier `build/breizcamp.json` à mettre à disposition d'OpenFeedback, par exemple dans un Gist
