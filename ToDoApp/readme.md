# ToDoApp

Dit voorbeeld is een beginnetje voor een ToDo applicatie die gebruikt maakt van een WebSQL database. Dit voorbeeld kun je gebruiken op iOS en Android telefoons in een Cordova app.

## Functies
Op dit moment kun je een ToDo toevoegen met een titel en een deadline datum waarop je de taak gedaan moet hebben. Deze informatie blijft bewaard zolang de app op je telefoon staat. Verder is er een knop om de complete lijst met todo's te wissen.

## Beperkingen
Dit is slechts een beginnetje bedoeld als voorbeeld waardoor nog veel functionaliteit mist:

- Je kunt een todo nog niet als voltooid markeren of individuele todo's wissen / wijzigen
- De deadline datum wordt nog niet op een mooie manier weergegeven op het scherm
- Er zit nog geen foutafhandeling in de code; als er iets mis gaat stopt het script simpelweg met werken of het voert een database transactie niet uit. In het beste geval krijg je wel feedback in de console, maar als gebruiker krijg je nog geen feedback.