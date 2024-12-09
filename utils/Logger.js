import config from "../data/params.json" with { type: "json" };

export const Logger = {
  log: (...args) => {
    if (config.print) {
      console.log(...args);
    }
  },
  error: (...args) => {
    if (config.print) {
      console.error(...args);
    }
  },
  info: (...args) => {
    if (config.print) {
      console.info(...args);
    }
  },
};
