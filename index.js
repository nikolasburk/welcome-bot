const { App } = require('@slack/bolt')
const store = require('./store')

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
})


app.event('app_home_opened', ({ event, say }) => {
  // Look up the user from DB
  let user = store.getUser(event.user)
  console.log(JSON.stringify(event))

  if (!user) {
    user = {
      user: event.user,
      channel: event.channel
    }
    store.addUser(user)

    say(`Hello world, and welcome <@${event.user}>!`)
  } else {
    say('Hi again!')
  }
})

app.event('team_join', (input) => {
  console.log('--------- NEW USER JOINED -----------')
  console.log(JSON.stringify(input))
  try {
    // Post now
    // const result = app.client.chat.postMessage({
    //   token: context.botToken,
    //   channel: ``,
    //   text: `hello `
    // })
  }
  catch (error) {
    console.error(error)
  }
})


// Start your app
(async () => {
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running!')
})()


const message = `
Hey there @nikolasburk, welcome to the Prisma Slack 👋:prisma-rainbow: 

We're excited to have you on board! Always feel free to reach out to us when you have any questions or run into trouble with our tools  🙌

*The best way to get help with a technical problem is by creating an issue on GitHub*:

Create a GitHub issue for *Prisma 1*: https://github.com/prisma/prisma
Or *Prisma 2* (aka *_Prisma Framework_*): https://github.com/prisma/prisma2

Slack is mostly used for discussions, conversation and meta-questions about the Prisma ecosystem. Feel free to post any links to GitHub issue you created to get faster help from our support team 🚀

Please be aware that we're currently focusing the majority of our engineering efforts on the Prisma Framework (i.e. Prisma 2), with Prisma 1 being in maintenance mode. You can learn more bout the current state of the Prisma Framework here: https://isprisma2ready.com 👀

We also want to encourage you to join the #prisma2-preview channel to take part in the discussions all around the Prisma Framework :D

Happy coding! ✌️
`
