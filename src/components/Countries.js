import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Countries = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [playOne, setPlayOne] = useState(true);
  const [rangeValue, setRangeValue] = useState(50);
  const [selectRadio, setSelectRadio] = useState('');

  const continent = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  const api =
    'https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag';

  useEffect(() => {
    if (playOne) {
      axios.get(api).then((res) => {
        setData(res.data);
        setPlayOne(false);
      });
    }

    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj.sort((a, b) => {
        return b.population - a.population;
      });

      sortedArray.length = rangeValue;
      setSortedData(sortedArray);
    };
    sortedCountry();
  }, [data, rangeValue, playOne]);

  console.log(data);
  console.log(rangeValue);

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          min="1"
          max="250"
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <ul>
          {continent.map((continents) => (
            <li keys={continents}>
              <input
                type="radio"
                value={continents}
                id={continents}
                checked={continents === selectRadio}
                onChange={(e) => setSelectRadio(e.target.value)}
              />
              <label htmlFor={continents}>{continents}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="cancel">
        {selectRadio && (
          <h5 onClick={() => setSelectRadio('')}>Annuler Recherche</h5>
        )}
      </div>
      <ul className="countries-list">
        {sortedData
          .filter((country) => country.region.includes(selectRadio))
          .map((country, i) => (
            <Card country={country} key={i} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
