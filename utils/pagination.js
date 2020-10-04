/**
 * ? UTILITY
 * * Gets articles(Array) and page(Number)
 * ? Sends [page(Number), pageCount(Number) and posts(Array)]
 */

const paginatedResponse = (articles, p) => {
  //count no pages from articles length
  const pageCount = Math.ceil(articles.length / 10);
  let page = parseInt(p);
  if (!page) {
    //if user donot provide a page - send page1
    page = 1;
  }
  if (page > pageCount) {
    //if user provide a page that is greater than no of pages.
    //OR the given page donot exist
    //set page to the last page value
    page = pageCount;
  }
  const response = {
    page,
    pageCount,
    posts: articles.slice(page * 10 - 10, page * 10),
  };
  return response;
};

module.exports = paginatedResponse;
