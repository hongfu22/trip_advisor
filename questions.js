import inquirer from "inquirer";
import confirm from '@inquirer/confirm';
import DatePrompt from "inquirer-date-prompt";

inquirer.registerPrompt("date", DatePrompt);

export default class Questions{
  async selectContinent(continent,fromTo) {
    try {
      const message = {
        from: "Which continent are you leaving from?",
        to: "Which continent would you like to visit?",
      };
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "continent",
          message: message[fromTo],
          choices: continent,
        },
      ]);
      return answers.continent;
    } catch (error) {
      console.log("エラー:", error);
      throw error;
    }
  }

  async selectCountry(countryNames, fromTo) {
    try {
      if (countryNames.length === 0) {
        throw new Error("Invalid country name");
      }
      const message = {
        from: "Which country are you leaving from?",
        to: "Which country are you thinking of visiting?",
      };
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "country",
          message: message[fromTo],
          choices: countryNames,
        },
      ]);
      return answers.country;
    } catch (error) {
      console.log("エラー:", error);
      throw error;
    }
  }

  async selectCity(cityNames, fromTo) {
    try {
      if (cityNames.length === 0) {
        throw new Error("Invalid country name");
      }
      const message = {
        from: "In which city are you planning to fly from?",
        to: "Which city are you planning to fly to?",
      };
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "city",
          message: message[fromTo],
          choices: cityNames,
        },
      ]);
      return answers.city;
    } catch (error) {
      console.log("エラー:", error);
      throw error;
    }
  }

  async selectAirport(airportNames) {
    try {
      if (airportNames.length === 0) {
        throw new Error("Invalid country name");
      }
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "airport",
          message: "Which airport will you use?",
          choices: airportNames,
        },
      ]);
      return answers.airport;
    } catch (error) {
      console.log("エラー:", error);
      throw error;
    }
  }

  async askDateFixed() {
    const answer = await confirm({ message: "Do you have a fixed flight itinerary?" });
    return answer;
  }

  async selectDate(fromTo, dateFormat) {
    const message = {
      fixed: "When?",
      from: "From?",
      to: "To?",
    };
    const { timestamp } = await inquirer.prompt({
      type: "date",
      name: "timestamp",
      message: message[fromTo],
      prefix: " 🌎 ",
      filter: (d) => Math.floor(d.getTime() / 1000),
      validate: (t) => t * 1000 > Date.now() + 86400000 || "God I hope not!",
      format: dateFormat,
    });
    return timestamp;
  }
}