const Card = ({ country }) => {
  const numberFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <li className="card">
      <img src={country.flag} alt="flag" />
      <div className="data-container">
        <ul>
          <li>Pays: {country.name}</li>
          <li>Cap: {country.capital}</li>
          <li>Pop: {numberFormat(country.population)}</li>
        </ul>
      </div>
    </li>
  );
};

export default Card;
