import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  // Switch,
  // Route
  Link
  // useParams,
  // useLocation,
  // Redirect,
  // useRouteMatch
} from 'react-router-dom';

import Articles from './ArticlePage';
import articleInfo from './articles/articleInfo.js';

export default function ArticlesDirectory() {
  let articles = articleInfo();

  // console.log(articleInfo());
  // const testFolder = '/articles/';
  // const fs = require('fs');
  // fs.readdir(testFolder, (err, files) => {
  //   files.forEach(file => {
  //     console.log(file);
  //   });
  // });

  return (
    <div>
      <Layout>
        <div className='py-4 text-3xl'>Articles</div>
        {articles.map(article => {
          let title = article.title;
          let name = article.name;

          return (
            <Fragment key={`${article.title}`}>
              <div className='py-2 text-blue-700'>
                <Link to={`/articles/${name}`}> {`${title}`}</Link>
              </div>
            </Fragment>
          );
        })}
      </Layout>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div>
      <div className='pt-24 lg:pt-0'>
        <div className='relative w-full max-w-screen-xl px-6 pt-16 pb-40 mx-auto md:pb-24'>
          <div className='-mx-6 xl:flex'>
            <div className='max-w-3xl px-6 mx-auto text-left '>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}