//Database Stuff

let database = firebase.database().ref()

let testUsername = 'deybyr647', testFirstName='Deyby', testLastName='Rodriguez', testEmail='deybyr647@gmail.com', testPassword='testPassword', testSavedArticles = ['medium', 'e'];

let refreshDB = () => {
    //e.preventDefault();
    const newUser = new User(testFirstName, testLastName, testEmail, testUsername, testPassword, testSavedArticles);
    console.log(newUser);
    database.push(newUser);
}

class User{
    constructor(firstName, lastName, email, username, password, savedArticles){
        this.name = {
            firstName,
            lastName
        };

        this.email = email;
        this.username = username;
        this.password = password;
        this.savedArticles = savedArticles;
    }
}

// Quotes stuff
let quote = document.querySelector('.quote');
let quotesSrc = 'https://type.fit/api/quotes';

let randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

let setQuote = () => {
    fetch(quotesSrc)
        .then((response) => (
            response.json()
        ))

        .then((quotesJSON) => {
            let quotesArr = quotesJSON;
            quotesArr.length = 50;
            let q;

            setInterval(() => {
                q = quotesArr[randInt(0,quotesArr.length)];
                quote.innerHTML = q.text;

            }, 1000);
        })
}

window.onload = setQuote();