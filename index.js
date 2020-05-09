require('dotenv').config();
const axios = require('axios')
const cron = require('node-cron');
const { postReply, postTweet } = require('./twitterLib');
const TwitterListener = require('./TwitterListener');
const mentionListener = new TwitterListener(require('./credentials'))


async function getText(){
  const resp = await axios.get(`${process.env.AUTOMOTRON_BASE_URL}/api/generators/h2VfKhAF0/run`)
  return resp.data.text
}

async function scheduled () {
  try{
    const text = await getText()
    postTweet(text)
    console.log('Tweeted: ' + text)
    
  }catch(err){
    console.log('Error!', err)
  }
}
//scheduled(false)
cron.schedule('0,10,20,30,40,50 18 * * *', scheduled);


mentionListener.listenTo(['@dessinemoiceci', '#dessinemoiceci', 'dessinemoiceci'])
mentionListener.on('tweet', async (tweet) => {
  console.log('Mention!', tweet.text)
  const text = await getText();
  console.log('reply =>', text)
  postReply(text, tweet);
})
mentionListener.startListening();
