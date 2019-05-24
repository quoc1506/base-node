const request = require('request-promise');

async function search(req, fbToken) {
  const payload = {
    queryTerm: 'Fiat',
    searchType: 'user'
  }
  const userFieldSet = 'id,name,link,picture,birthday,address,email,gender,location,friends';
  const pageFieldSet = 'name, category, link, picture, is_verified';
  const options = {
    method: 'GET',
    uri: 'https://graph.facebook.com/me',
    qs: {
      access_token: fbToken,
      q: payload.queryTerm,
      type: payload.searchType,
      fields: payload.searchType === 'page' ? pageFieldSet : userFieldSet
    }
  };
  var parsedRes = null;
  await request(options)
    .then(fbRes => {
      parsedRes = JSON.parse(fbRes);
    }).catch(error => {
      console.log(error)
    })
  return parsedRes;
}

async function photos(req, fbToken, fbId) {
  const options = {
    method: 'GET',
    uri: 'https://graph.facebook.com/' + fbId + '/photos?type=uploaded',
    qs: {
      access_token: fbToken,
      limit: 5,
      fields: 'picture'
    }
  };
  var parsedRes = null;
  await request(options)
    .then(fbRes => {
      parsedRes = JSON.parse(fbRes);
    }).catch(error => {
      console.log(error)
    })
  return parsedRes;
}

module.exports = {
  search,
  photos,
}
