//News Articles
const proxy = 'https://cors-anywhere.herokuapp.com/';
let articlesSrc = `https://newsapi.org/v2/everything?q='how to recycle'&pageSize=7&apiKey=1a537385d7b54c8c958d1dce8e6c8ca0`;

//let articlesSrc = `https://gnews.io/api/v3/search?image=required&q={what is recycling}&token=4865d69f5b43d26383fdad98b6d5e27c`;
let articlesContainer = document.querySelector('.articles-container');

let displayArticles = (articleObj) => {
    let articleCard = document.createElement('div');
    articleCard.className = 'article';

    let articleImg = document.createElement('img');
    articleImg.src = articleObj.urlToImage; //image
    articleCard.appendChild(articleImg);

    let articleInfo = document.createElement('div');
    articleInfo.className = 'article-info';

    let articleHeader = document.createElement('h4');
    let articleLink = document.createElement('a');
    articleLink.href = articleObj.url;
    articleLink.rel = 'noopener noreferrer';
    articleLink.target = '_blank';
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
        })

        .catch(() => console.log("Can’t access " + articlesSrc + " response. Blocked by browser?"))
}

window.onload = () => getArticles();