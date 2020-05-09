require('dotenv').config();
const { postTweet } = require('./twitterLib');
const axios = require('axios')

async function getText(){
  const resp = await axios.get(`${process.env.AUTOMOTRON_BASE_URL}/api/generators/h2VfKhAF0/run`)
  return resp.data.text
}

getText().then(text => {
  console.log(text)
  console.log('Posting...')
  postTweet(text)
})