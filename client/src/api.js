// export function fetchUserDataV2(userName, userRegion) {
//   let comradesPromise = fetchComrades(userName, userRegion);
//   return {
//     // userName,
//     // userRegion,
//     name: userName,
//     region: userRegion,
//     results: wrapPromise(comradesPromise)
//   };
// }

export function fetchArticles() {
  return { articles: wrapPromise(fetchArticlesPromise()) };
}

function fetchArticlesPromise() {
  return new Promise(function(resolve, reject) {
    let url = 'https://grobel-dev-server-zxc6fpw5uq-uc.a.run.app';
    let testUrl = 'http://localhost:8080/';

    let env = process.env.NODE_ENV || 'development';

    let currentUrl;

    env === 'development' ? (currentUrl = testUrl) : (currentUrl = url);

    let fetchUrl = new URL(currentUrl);

    fetch(fetchUrl)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(myJson => {
        resolve(myJson);
      })
      .catch(error => {
        reject('Error:', error);
      });
  });
}

function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}
