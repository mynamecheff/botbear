const { got } = require('./../got');
  //usage: bb weather <city>
module.exports = {
  name: 'weather',
  description: 'Shows the current weather in a given city',
  ping: true,
  permission: 100,
  category: 'Info command',
  noBanphrase: true,
  execute: async (channel, user, input) => {
    try {
      const url = `https://www.timeanddate.com/weather/${input}`;

      const response = await got(url);
      const weatherRegex = /id="qlook".*?>(.*?)<\/p>/s;
      const matches = response.body.match(weatherRegex);

      if (matches) {
        const weather = matches[1].replace(/<\/?[^>]+(>|$)/g, '');
        return `The weather in ${input} is currently ${weather}`;
      } else {
        return 'I could not find the weather for that city.';
      }
    } catch (err) {
      console.log(err);
      return 'An error occurred while fetching the weather.';
    }
  }
};
