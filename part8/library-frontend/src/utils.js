export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (b) => {
    let seen = new Set();
    return b.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  const uniqueByName = (b) => {
    let seen = new Set();
    return b.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query[0], ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook)),
    };
  });

  cache.updateQuery(query[1], ({ allAuthors }) => {
    return {
      allAuthors: uniqueByName(allAuthors.concat(addedBook.author)),
    };
  });
};
