import TweetModel from './TweetModel'

const tweetView = {
  render(tweet: TweetModel) {
    return {
      id: tweet.id,
      text: tweet.text,
    }
  },
}

export default tweetView
