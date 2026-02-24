import { useState } from 'react';
import styles from './VinForm.module.css';

const VinForm = ({ onSearch, isLoading }) => {
  const [vin, setVin] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase();
    const errorMessage = () => {
      if (error) setError(null);
    };
    setError(errorMessage);
    setVin(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vin.trim()) {
      setError('Поле не може бути порожнім');
      return;
    }

    if (vin.length < 17) {
      setError(`Занадто короткий VIN. Введено ${vin.length} з 17 символів`);
      return;
    }

    setError(null);
    onSearch(vin);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.vinForm}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          maxLength={17}
          value={vin}
          onChange={handleChange}
          placeholder="Введіть VIN (17 символів)..."
          className={error ? styles.inputError : styles.input}
        />
        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? 'Пошук...' : 'Пошук'}
        </button>
      </div>
      {error && <span className="error-text">{error}</span>}
    </form>
  );
};

export default VinForm;
