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
            q = quotesArr[randInt(0, quotesArr.length)];
            quote.innerHTML = `${q.text} - ${q.author}`;

            setInterval(() => {
                q = quotesArr[randInt(0, quotesArr.length)];
                quote.innerHTML = `${q.text} - ${q.author}`;

            }, 4900);
        })
}

window.onload = setQuote();

//News Articles
let articlesSrc = `https://gnews.io/api/v3/search?q=recycling|ecology&token=4865d69f5b43d26383fdad98b6d5e27c`;
let articlesContainer = document.querySelector('.articles-container');

let displayArticles = (articleObj) => {
    let articleCard = document.createElement('div');
    articleCard.className = 'article';

    let articleImg = document.createElement('img');
    articleImg.src = articleObj.image;
    articleCard.appendChild(articleImg);

    let articleInfo = document.createElement('div');
    articleInfo.className = 'article-info';

    let articleHeader = document.createElement('h4');
    let articleLink = document.createElement('a');
    articleLink.href = articleObj.url;
    articleLink.innerHTML = articleObj.title;
    articleHeader.appendChild(articleLink);
    articleInfo.appendChild(articleHeader);

    let articleDescription = document.createElement('p');
    articleDescription.innerHTML = articleObj.description;
    articleInfo.appendChild(articleDescription);

    articleCard.appendChild(articleInfo);

    articlesContainer.appendChild(articleCard);
}

let getArticles = () => {
    fetch(articlesSrc)
        .then((response) => (
            response.json()
        ))

        .then((data) => {
            let articlesJSON = data;
            console.log(articlesJSON)
            let articlesArr = articlesJSON.articles;
            articlesArr.forEach(article => {
                displayArticles(article);
            })
            //displayArticles(articlesArr[0]);
        })
}