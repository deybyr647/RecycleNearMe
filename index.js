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

