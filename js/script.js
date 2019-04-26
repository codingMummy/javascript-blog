'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }


    /* [IN PROGRESS] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);



    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    /*szukanie po id -> document.querySelector('#[wartość przypisana do id]') */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
    console.log('targetArticle:', targetArticle);

}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}


const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector).innerHTML = " ";


    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        console.log(article);
        const articleId = article.getAttribute('id'); /* get the article id */
        console.log(articleId);
        const articleTitle = article.querySelector(optTitleSelector); /* find the title element */
        console.log(articleTitle);
        const titleText = articleTitle.textContent; /* get the title from the title element */
        console.log(titleText)


    }


    /* create HTML of the link */

    /* insert link into titleList */

}

generateTitleLinks();