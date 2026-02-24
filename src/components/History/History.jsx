import styles from './History.module.css';

const History = ({ list, onSelect }) => {
  if (!list || list.length === 0) return null;

  return (
    <section className={styles.historySection}>
      <h3 className={styles.title}>Останні 3 запити:</h3>
      <div className={styles.chipsContainer}>
        {list.map((vin) => (
          <button 
            key={vin} 
            type="button"
            className={styles.chip}
            onClick={() => onSelect(vin)}
            title={`Повторити пошук для ${vin}`}
          >
            {vin}
          </button>
        ))}
      </div>
    </section>
  );
};

export default History;
