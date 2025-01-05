const moment = require("moment-timezone");
const {
  fetchJson,
  smd,
  tlang,
  send,
  prefix,
  Config,
  groupdb,
} = require("../lib");
let gis = require("async-g-i-s");
const axios = require("axios");
const fetch = require("node-fetch");
const { shazam } = require("../lib");

smd(
  {
    pattern: "xeather",
    category: "search",
    desc: "Sends weather info about asked place.",
    use: "<location>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Give me city name, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://api.nexoracle.com/search/weather?apikey=free_key@maher_apis&city=${encodeURIComponent(text)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || data.cod === "404") {
        return await message.reply(`*_Please provide valid city name!_*`);
      }

      let textw = `*🌟Weather of ${text}*\n\n`;
      textw += `*Weather:-* ${data.result.weather[0].main}\n`;
      textw += `*Description:-* ${data.result.weather[0].description}\n`;
      textw += `*Avg Temp:-* ${data.result.main.temp}\n`;
      textw += `*Feels Like:-* ${data.result.main.feels_like}\n`;
      textw += `*Pressure:-* ${data.result.main.pressure}\n`;
      textw += `*Humidity:-* ${data.result.main.humidity}\n`;
      textw += `*Wind Speed:-* ${data.result.wind.speed}\n`;
      textw += `*Latitude:-* ${data.result.coord.lat}\n`;
      textw += `*Longitude:-* ${data.result.coord.lon}\n`;
      textw += `*Country:-* ${data.result.sys.country}\n\n`;
      textw += Config.caption;
      
      message.bot.sendUi(
        message.jid,
        { caption: textw },
        { quoted: message },
        "text",
        "true"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: weather`,
        e,
        `*_Please provide valid city name!_*`
      );
    }
  }
);