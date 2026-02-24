import { useState } from 'react';
import './VinForm.module.css';


const VinForm = ({ onSearch, isLoading }) => {

  const [vin, setVin] = useState('');
  const [error, setError] = useState('');

  const validate = (val) => {
    if (val.length > 17) return "Максимум 17 символів";
    return "";
  };

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase();
    const errorMessage = () => {
      if (error) setError(null)
    };
    setError(errorMessage);
    setVin(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vin.trim()) {
      setError("Поле не може бути порожнім");
      return;
    }

    if (vin.length < 17) {
      setError(`Занадто короткий VIN. Введено ${vin.length} з 17 символів`);
      return;
    }

    setError(null)
    onSearch(vin);
  };

  return (
    <form onSubmit={handleSubmit} className='vin-form'>
      <div className='input-group'>
        <input
        type="text"
        maxLength={17}
        value={vin}
        onChange={handleChange}
        placeholder='Введіть VIN (17 символів)...'
        className={error ? 'input-error' : ''}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Пошук...' : 'Пошук'}
        </button>
      </div>
      {error && <span className='error-text'>{error}</span>}
    </form>
  )
};


export default VinForm;