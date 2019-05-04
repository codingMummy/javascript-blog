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
  // console.log('clickedElement:', clickedElement);



  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  // console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  /*szukanie po id -> document.querySelector('#[wartość przypisana do id]') */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('targetArticle:', targetArticle);

}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = ' ';


  /* for each article */
  let html = '';
  console.log(optArticleSelector + customSelector)
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    // console.log(article);
    const articleId = article.getAttribute('id'); /* get the article id */
    // console.log(articleId);
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; /* find the title element */
    // console.log(articleTitle);
    const link = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // titleList.innerHTML = titleList.innerHTML + link;
    // titleList.insertAdjacentHTML('beforeend', link);
    html = html + link;
  }

  // console.log(html);
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  /* create HTML of the link */
  /* insert link into titleList */
}
generateTitleLinks();


/*
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
  */

function generateTags() {
  /* find all articles -*/
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    // console.log(article);

    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    // console.log(tagsList);

    /* make html variable with empty string - pusty string*/
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);

    /* split tags into array - podziel tags na tablice */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      // console.log(tag);

      const link = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html = html + link;
    }

    tagsList.innerHTML = html;

  }
  /* generate HTML of the link */
  /* add generated code to html variable */
  /* END LOOP: for each tag */
  /* insert HTML of all the links into the tags wrapper */
  /* END LOOP: for every article: */
}
generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  // console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  // console.log(href);
  const tag = href.replace('#tag-', '');
  // const tag = href.substring('5'); - drugi sposób
  // console.log(tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  // console.log(activeLinks);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeLinks) {
    activeTag.classList.remove('active');
  }
  /* remove class active */
  /* END LOOP: for each active tag link */


  /* find all tag links with "href" attribute equal=równe to the "href" constant */
  const links = document.querySelectorAll('a[href="' + href + '"]');
  for (let link of links) {
    link.classList.add('active');
  }
  /* START LOOP: for each found tag link */
  /* add class active */
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('.list-horizontal a');
  // console.log(links);
  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}
addClickListenersToTags();


function generateAuthors() {

  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);

  for (let article of articles) {
    // console.log(article);

    const authorsList = article.querySelector('.post-author');
    // console.log(authorsList);

    const articleAuthors = article.getAttribute('data-author');
    // console.log(articleAuthors);

    const link = '<a href="#' + articleAuthors + '">' + articleAuthors + '</a>';
    authorsList.innerHTML = link;

  }

}
generateAuthors();


function authorClickHandler(event) {

  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  // console.log(clickedElement);

  const href = clickedElement.getAttribute('href');
  console.log(href);

  const activeAuthors = document.querySelectorAll('.post-author a.active');
  // console.log(activeAuthors);

  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  const links = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(links);
  for (let link of links) {
    link.classList.add('active');
  }
  const author = href.substring(1);
  generateTitleLinks('[data-author="' + author + '"]');

}


function addClickListenersToAuthors() {

  const links = document.querySelectorAll('.post-author a');
  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();