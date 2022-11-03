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
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){
  console.log('custom selector', customSelector);

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('Articles Custom Selector', articles)

  for(let article of articles){
    article.classList.remove('active');
  }

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

      const linkTagHTML = '<li><a href="#tag-' + tag + '"></a>' + tag + '</li>';

      /* [DONE] add generated code to html variable */

      html = html + linkTagHTML + ' ';

    /* [DONE] END LOOP: for each tag */

      }

    /* [DONE] insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
    }}

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

  const allLinksToTags = document.querySelectorAll('a[href^="tag-"]');
  console.log('Tag Links', allLinksToTags);

  /* START LOOP: for each link */

  for(let link of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click',tagClickHandler);  

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();