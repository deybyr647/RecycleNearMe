//News Articles
let articlesSrc = `https://gnews.io/api/v3/search?image=required&q=recycling|ecology&token=4865d69f5b43d26383fdad98b6d5e27c`;
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
        })
}

window.onload = () => getArticles();