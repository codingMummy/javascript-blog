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
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = ' ';


  /* for each article */
  let html = '';
  // console.log(optArticleSelector + customSelector)
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
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags .list';
  */

function calculateTagClass(count, params) {
  const normalizedMax = params.max - params.min;
  const normalizedCount = count - params.min;
  const percentage = normalizedCount / normalizedMax;

  // console.log(count, percentage, normalizedCount);

  const optCloudClassCount = Math.floor(percentage * 4 + 1);
  const className = optCloudClassPrefix + optCloudClassCount;
  return className;
}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles -*/
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);
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

      /* [NEW] check if this link is NOT already in allTags - sprawdź czy ten link nie jest dostepny w allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    // console.log(allTags);
    tagsList.innerHTML = html;

  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams);

  /* [new] Create variable for all links HTML code */
  let allTagsHTML = '';
  // console.log(allTags);
  /* [nwe] START LOOP: for each tag in allTags */
  /* !!! czemu jest in ? */
  for (let tag in allTags) {
    /* [new] generate code of a link and add it to allTagsHTML */

    const className = calculateTagClass(allTags[tag], tagsParams);
    // console.log('tagLinkHTML:', className);

    const link = '<li><a class="' + className + '" href="#tag-' + tag + '"><span>' + tag + ' (' + allTags[tag] + ')' + '</spam></a></li>';

    allTagsHTML += link;

  }
  /* [new] end loop: for each tag in alleTags */

  /* [new] add html form allTagsHTML to tagList */

  tagList.innerHTML = allTagsHTML;

}
generateTags();



function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags) {
    // console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}



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
  const links = document.querySelectorAll('a[href^="#tag-"]');
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

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);


  /* START LOOP: for every article: */
  for (let article of articles) {
    // console.log(article);


    /* find authors wrapper */
    const authorsList = article.querySelector('.post-author');
    // console.log(authorsList);


    /* get authors from data-author attribute */
    const articleAuthors = article.getAttribute('data-author');
    // console.log(articleAuthors);


    /* generate HTML of the link */
    const link = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';


    /* add generated code to html variable */
    authorsList.innerHTML = link;

    /*articleAuthors - hendler do autorów*/
    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors.hasOwnProperty(articleAuthors)) {
      /* [NEW] add generated code to allAuthors array */
      allAuthors[articleAuthors] = 1;
    } else {
      allAuthors[articleAuthors]++;
    }

    /*[new] add html from allAuthors to AuthorList */
    //authorsList.innerHTML = allAuthors.join(' ');
    // console.log(allAuthors);

    /* [new] add html from allAuthorsHTML to authorList */
    // authorsList.innerHTML = allAuthorsHTML;

  }
  /* [new] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [new] Start loop: for each articleAuthors in allAuthors: */

  const bob = document.querySelector('.authors');

  for (let articleAuthors in allAuthors) {
    /* [new] generate code of a link and add it to allAuthorsHTML */

    const wow = '<li><a href="#author-' + articleAuthors + '"><span class="author-name">' + articleAuthors + ' (' + allAuthors[articleAuthors] + ') ' + '</span></a></li>';

    allAuthorsHTML = allAuthorsHTML + wow;
  }

  bob.innerHTML = allAuthorsHTML;
}
generateAuthors();




function authorClickHandler(event) {

  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');
  // console.log(clickedElement);

  const href = clickedElement.getAttribute('href');
  // console.log(href);

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"');
  // console.log(activeAuthors);

  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }

  const links = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(links);
  for (let link of links) {
    link.classList.add('active');
  }
  const author = href.substring(8);
  generateTitleLinks('[data-author="' + author + '"]');

}


function addClickListenersToAuthors() {

  const links = document.querySelectorAll('a[href^="#author-"');
  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }


}
addClickListenersToAuthors();
