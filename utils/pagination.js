const paginatedResponse = (articles, p) => {
  const pageCount = Math.ceil(articles.length / 10);
  let page = parseInt(p);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }
  const response = {
    page: page,
    pageCount: pageCount,
    posts: articles.slice(page * 10 - 10, page * 10),
  };
  return response;
};

module.exports = paginatedResponse;
