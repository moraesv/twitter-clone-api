import TweetModel from './TweetModel'

const tweetView = {
  render(tweet: TweetModel) {
    return {
      id: tweet.id,
      text: tweet.text,
      files: tweet.files.map((file) => ({ id: file.id, url: file.url })),
    }
  },
}

export default tweetView
