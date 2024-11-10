# be-prog-ind

A CLI based program for event handling.
Using javascript, Inquirer and Axios.

## Set up

Clone the repository, open it and and run npm install

Before starting you have to clone, install and run this.
https://github.com/RobinNygren/event-planning-api

## start program

Use npm start to run the program.

First you have to login then you can select options from the menu, choose exit to stop running the program.
If you dont have a registrered user, use account bellow:

username: johan
password: 12345

## Frågor

### 1.

Mitt program hanterar fel vid API-anrop genom att omge varje funktion som gör ett anrop med try-catch block. Om fel uppstår vid anrop, fångas det i catch blocket, där ett meddelande skrivs ut till användaren. Felmeddelandena kommer från error.response.data om de är tillgängliga, vilket gör att användaren lättare kan förstå orsaken till felet.

Att hantera fel är viktigt för en klientapplikation eftersom det gör programmet mer användarvänligt och robust. Utan felhantering riskerar programmet att krasha och användaren förstår inte heller vad som går fel.

### 2.

Ett utav dom extra npm-paket jag installerat är chalk, vilket används för att färglägga texten i terminalen. Jag använde chalk för att göra statusmeddelanden som "Login successful" gröna och felmeddelanden röda samt styling. Detta ger tydlig feedback till användaren och gör det enklare att se när något gått fel eller lyckats i applikationen. Chalk var inte absolut nödvändigt, men det förbättrar användarupplevelsen och ger ett trevligare utseende.

### 3.

Ett problem jag stötte på var att jag ville att man skulle kunna välja på namn ur en lista vid registrering och borttagning av användare, men participants arrayen på events innehåller endast användarnas ID, så det listades bara ut id:n.
För att lösa problemet fick jag lägga till ett extra api anrop för att hämta ut namnen baserat på id, från user endpointen istället för event endpointen.

Av denna lösning lärde jag hur man kan använda fler api-anrop för att hämta kompletterande data från en annan plats.
