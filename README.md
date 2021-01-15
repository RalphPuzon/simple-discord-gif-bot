# Simple Discord GIF Bot
*NOTE: This is NOT a production grade script, so please do not utilize for projects that contain sensitive information.*

This is a simple demonstration of a discord bot that will fetch a GIF
image using the tenor API, given a single word query (this is by design,
get creative.)

## How to use:
1. Set up a discord bot (there are plenty of youtube tutorials on this)

2. Obtain an api ky from tenor, sign up here:
    > https://tenor.com/developer/keyregistration

3. Create your config file that contains the following:

```
// Name it something like config.json
{
    "prefix": "<whatever command prefix you desire>",
    "token": "<discord bot token>",
    "gifkey": "<tenor API token>"
}
```

4. You can run this locally by calling:
    > node bot.js

   You can most likely deploy this on some cloud service, or a raspberry pi.