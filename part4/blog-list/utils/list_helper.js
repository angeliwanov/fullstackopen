const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, val) => acc + val.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  let result = blogs[0];
  for (let blog of blogs) {
    if (blog.likes > result.likes) {
      result = blog;
    }
  }
  return result;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authors = {};
  let auth = "";
  let max = 0;
  for (const blog of blogs) {
    const author = blog.author;
    if (!authors[author]) {
      authors[author] = 1;
    } else {
      authors[author] += 1;
    }
    if (authors[author] > max) {
      auth = author;
      max = authors[author];
    }
  }

  return { author: auth, blogs: max };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const authors = {};
  let auth = "";
  let max = 0;
  for (const blog of blogs) {
    const author = blog.author;
    const likes = blog.likes;
    if (!authors[author]) {
      authors[author] = likes;
    } else {
      authors[author] += likes;
    }
    if (authors[author] > max) {
      auth = author;
      max = authors[author];
    }
  }

  return { author: auth, likes: max };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
