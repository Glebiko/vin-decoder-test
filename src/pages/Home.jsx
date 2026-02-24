import { useState, useEffect } from 'react';
import VinForm from '../components/VinForm/VinForm';
import History from '../components/History/History';
import styles from './Home.module.css';

const Home = () => {
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('vin_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleSearch = async (vin) => {
    setLoading(true);
    setError(null);
    setApiMessage('');
    setResults([]);

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
      );
      const data = await response.json();

      if (data.Message) setApiMessage(data.Message);

      const filtered = data.Results.filter(
        (item) =>
          item.Value &&
          item.Value.trim() !== '' &&
          item.Value !== 'Not Applicable',
      );

      setResults(filtered);
      updateHistory(vin);
    } catch (err) {
      setError("Помилка з'єднання з сервером");
    } finally {
      setLoading(false);
    }
  };

  const updateHistory = (vin) => {
    setHistory((prev) => {
      const newHistory = [vin, ...prev.filter((v) => v !== vin)].slice(0, 3);
      localStorage.setItem('vin_history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <div className={styles.container}>
      <section className={styles.searchSection}>
        <h1 className={styles.title}>Розшифровка VIN-коду</h1>
        <VinForm onSearch={handleSearch} isLoading={loading} />
        {history.length > 0 && (
          <History
            list={history}
            onSelect={(selectedVin) => handleSearch(selectedVin)}
          />
        )}
      </section>
      {apiMessage && (
        <div className={styles.apiMessage}>Статус: {apiMessage}</div>
      )}
      {error && <div className={styles.error}>{error}</div>}
      {results.length > 0 && (
        <section className={styles.resultsSection}>
          <h2>Результати:</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Змінна</th>
                <th>Значення</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.Variable}</td>
                  <td>{item.Value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default Home;
