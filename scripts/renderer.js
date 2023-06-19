/* global hexo */

'use strict';

const nunjucks = require('nunjucks');
const path = require('path');

function njkCompile(data) {
  const templateDir = path.dirname(data.path);
  const env = nunjucks.configure(templateDir, {
    autoescape: false
  });
  env.addFilter('attr', (dictionary, key, value) => {
    dictionary[key] = value;
    return dictionary;
  });
  env.addFilter('json', dictionary => {
    return JSON.stringify(dictionary || '');
  });
  return nunjucks.compile(data.text, env, data.path);
}

function njkRenderer(data, locals) {
  return njkCompile(data).render(locals);
}

// Return a compiled renderer.
njkRenderer.compile = function(data) {
  const compiledTemplate = njkCompile(data);
  // Need a closure to keep the compiled template.
  return function(locals) {
    return compiledTemplate.render(locals);
  };
};

hexo.extend.renderer.register('njk', 'html', njkRenderer);
hexo.extend.renderer.register('swig', 'html', njkRenderer);


const pagination = require('hexo-pagination');
const { sort } = require('timsort');

hexo.locals.set('dataPosts', () => {
  return hexo.locals.get('posts').filter(post => post.categories.filter(category => category.name === '数据').length > 0);
});

hexo.locals.set('mlPosts', () => {
  return hexo.locals.get('posts').filter(post => post.categories.filter(category => category.name === 'machine-learning').length > 0);
});

hexo.locals.set('agilePosts', () => {
  return hexo.locals.get('posts').filter(post => post.categories.filter(category => category.name === '敏捷').length > 0);
});

hexo.locals.set('techPosts', () => {
  return hexo.locals.get('posts').filter(post => post.categories.filter(category => category.name === '技术').length > 0);
});

hexo.locals.set('archPosts', () => {
  return hexo.locals.get('posts').filter(post => post.categories.filter(category => category.name === '架构').length > 0);
});

hexo.locals.set('otherPosts', () => {
  return hexo.locals.get('posts').filter(post => post.categories.filter(category => ['数据', '敏捷', 'machine-learning', '技术', '架构'].indexOf(category.name) !== -1).length === 0);
});


const dataGenerator = function(categoryId) {
  return function(locals) {
    const config = this.config;
    const posts = locals[categoryId + 'Posts'].sort(config.index_generator.order_by);

    sort(posts.data, (a, b) => (b.sticky || 0) - (a.sticky || 0));

    const paginationDir = config.pagination_dir || 'page';
    const path = categoryId + '/';

    return pagination(path, posts, {
      perPage: config.index_generator.per_page,
      layout: ['index', 'archive'],
      format: paginationDir + '/%d/',
      data: {
        __index: true
      }
    });
  }
};

hexo.extend.generator.register('data', dataGenerator('data'));
hexo.extend.generator.register('agile', dataGenerator('agile'));
hexo.extend.generator.register('ml', dataGenerator('ml'));
hexo.extend.generator.register('tech', dataGenerator('tech'));
hexo.extend.generator.register('arch', dataGenerator('arch'));
hexo.extend.generator.register('other', dataGenerator('other'));

