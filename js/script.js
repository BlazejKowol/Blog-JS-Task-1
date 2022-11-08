const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 6,
  optCloudClassPrefix ='tag-size-';

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

function generateTitleLinks(customSelector = ''){

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

const calculateTagsParams = function(tags) {

  const params = {
    max: 0,
    min: 999999,
  };

  for(let tag in tags) {

    /*if(tags[tag] > params.max){
      params.max = tags[tag]} 
      else {tags[tag] < params.min,
      params.min = tags[tag];*/ /*what's wrong here*/
      //}

      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);

      console.log(tag + ' is used ' + tags[tag] + ' times ');
  }
  
  return params; 
};

const calculateTagClass = function(count, params){ 

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
};

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

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
      console.log('linkTagHTML: ', linkTagHTML)

      /* [DONE] add generated code to html variable */

      html = html + linkTagHTML + ', ';

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
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

    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);
  
     allTagsHTML += tagLinkHTML; //'<li><a class="tag-size-3" href="#tag-cat">cat</a></li>';
     console.log('All Tags HTML', allTagsHTML);
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

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

function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object */

  const allAuthors = {};

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

    /* [DONE] generate HTML of the link */

    const linkAuthorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    console.log('Link Author HTML: ', linkAuthorHTML);

    /* [DONE] insert HTML of all the links into the authors wrapper */

    authorWrapper.innerHTML = linkAuthorHTML;

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors[articleAuthor]) {
      /* [NEW] add author to allAuthors object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

  /* [DONE] END LOOP: for every article: */
    }

  /* [NEW] find list of authors in right column */
    const authorsList = document.querySelector(optAuthorsListSelector);
    console.log('authors list: ',authorsList)

    //authorsList.innerHTML = allAuthors.join(' ');
    console.log('all authors', allAuthors);
  
    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';
  
    /* [NEW] START LOOP: for each author in allAuthors: */
    for(let articleAuthor in allAuthors){

      /* [NEW] generate code of a link and add it to allAuthorsHTML */
  
      const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + ' ' + '(' + allAuthors[articleAuthor] + ')' + '</a></li>';
      console.log('authorLinkHTML:', authorLinkHTML);
    
       allAuthorsHTML += authorLinkHTML; //'<li><a href="#author-Marion Berry">Marion Berry 4</a></li>';
       console.log('All Authors HTML', allAuthorsHTML);
      /* [NEW] END LOOP: for each author in allAuthors: */
    }
    /*[NEW] add HTML from allAuthorsHTML to authorsList */
      authorsList.innerHTML = allAuthorsHTML;
}

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
generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();