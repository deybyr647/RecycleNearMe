//News Articles
const proxy = 'https://cors-anywhere.herokuapp.com/';
let articlesSrc = `https://newsapi.org/v2/everything?q=recycling&apiKey=1a537385d7b54c8c958d1dce8e6c8ca0`;
let articlesContainer = document.querySelector('.articles-container');

let displayArticles = (articleObj) => {
    let articleCard = document.createElement('div');
    articleCard.className = 'article';

    let articleImg = document.createElement('img');
    articleImg.src = articleObj.urlToImage;
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
    fetch(proxy + articlesSrc)
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
        })

        .catch(() => console.log("Can’t access " + articlesSrc + " response. Blocked by browser?"))
}

window.onload = () => getArticles();