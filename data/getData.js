const fs = require("fs");

exports.getData = function (continent) {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/countriesByContinent.geojson`, "utf-8")
  );
  const countries = data.filter(
    (el) => el[0].continent.name === `${continent}`
  )[0];
  countries.shift();
  return countries;
};

exports.countData = () => {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/country_and_continent.geojson`, "utf-8")
  );

  console.log(data.length);
};

exports.getContinentData = () => {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/countriesByContinent.geojson`, "utf-8")
  );

  const countries = data.map((el) => el[0].continent);
  return countries;
};
