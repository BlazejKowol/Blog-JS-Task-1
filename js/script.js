const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  
  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  
  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  console.log('Active Article:',activeArticles);
  
  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  
  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

/* Generate title list */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optTagsListSelector = '.tags.list', /*why this*/
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  console.log('custom selector', customSelector);

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('Articles Custom Selector', articles);

  /* find all the articles and save them to variable: articles */

  let html = '';

  for(let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('link HTML: ', linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */

  let allTags = [];

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){

    /* [DONE] find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* [DONE] generate HTML of the link */

      const linkTagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* [DONE] add generated code to html variable */

      html = html + linkTagHTML + ' ';

      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkTagHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkTagHTML);
      }

      /* [DONE] END LOOP: for each tag */

    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log('tag list', tagList);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  console.log(allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
let allTagsHTML = '';

/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  allTagsHTML += tag + ' (' + allTags[tag] + ') ';
  console.log("All Tags HTML", allTagsHTML);
/* [NEW] END LOOP: for each tag in allTags: */
  }
/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;
}
const calculateTagsParams = function(tags) { /* why this and not function calculateTagsParams() {...}??*/

  const params = {
    max: 0,
    min: 999999,
  };

  for(let tag in tags) {

    if(tags[tag] > params.max){
      params.max = tags[tag],
      tags[tag] < params.min,
      params.min = tags[tag];

      console.log(tag + ' is used ' + tags[tag] + ' times ');
    }
  }
  
  return params; 
}

generateTags();

function tagClickHandler(event){
  console.log('Tag Click Handler: ', tagClickHandler);
  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('href: ', href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* [DONE] find all tag links with class active */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('Tag Links: ', tagLinks);

  /* [DONE] START LOOP: for each active tag link */

  for(let tag of tagLinks) {

    /* [DONE] remove class active */

    tag.classList.remove('.active');

  /* END LOOP: for each active tag link */
    }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log('Tag Links Href: ', tagLinksHref);

  /* [DONE] START LOOP: for each found tag link */

  for(let tag of tagLinksHref){  

    /* [DONE] add class active */

    tag.classList.add('.active');

  /* END LOOP: for each found tag link */

    }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */

  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log('Tag Links', allLinksToTags);

  /* START LOOP: for each link */

  for(let link of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click',tagClickHandler);  

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){

    /* [DONE] find authors wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log('Author Wrapper: ', authorWrapper);

    /* [DONE] get authors from data-authors attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log('article Author: ', articleAuthor);

    /* [Can we use <p> here? Is it fine?] generate HTML of the link */

    const linkAuthorHTML = '<p><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></p>';
    console.log('Author Link: ', linkAuthorHTML);

    /* [Plz explain what exactly it does and why do we have to match it not with "html" but "linkAuthorHTML"] insert HTML of all the links into the authors wrapper */

    authorWrapper.innerHTML = linkAuthorHTML;

  /* [DONE] END LOOP: for every article: */
    }
}

generateAuthors();

function authorClickHandler(event){
  console.log('Author Click Handler: ', authorClickHandler);
  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('href: ', href);

  /* [DONE] make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author-', '');
  console.log(author);

  /* [DONE] find all author links with class active */

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('author Links: ', authorLinks);

  /* [DONE] START LOOP: for each active author link */

  for(let link of authorLinks) {

    /* [DONE] remove class active */

    link.classList.remove('.active');

  /* END LOOP: for each active author link */
    }

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */

  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log('Author Links Href: ', authorLinksHref);

  /* [DONE] START LOOP: for each found author link */

  for(let link of authorLinksHref){  

    /* [DONE] add class active */

    link.classList.add('.active');

  /* END LOOP: for each found author link */

    }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */

  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  console.log('Author Links', allLinksToAuthors);

  /* START LOOP: for each link */

  for(let link of allLinksToAuthors) {

    /* add AuthorsClickHandler as event listener for that link */

    link.addEventListener('click',authorClickHandler);  

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();