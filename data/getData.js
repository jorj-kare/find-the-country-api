const fs = require("fs");

exports.getData = function (continent) {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/${continent}Polygons.json`, "utf-8")
  );
  // const countries = data.filter(
  //   (el) => el[0].continent.name === `${continent}`
  // )[0];
  // countries.shift();
  // return countries;
  return data;
};

exports.getContinentData = () => {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/countriesByContinent.geojson`, "utf-8")
  );

  const countries = data.map((el) => el[0].continent);
  return countries;
};
