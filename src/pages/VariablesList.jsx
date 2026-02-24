import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './VariablesList.module.css';

const VariablesList = () => {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`)
    .then(result => result.json())
    .then(data => {
      setVariables(data.Results);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.loader}>Завантаження списку...</div>;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Доступні змінні автомобіля</h1>
      <div className={styles.list}>
        {variables.map(item => (
          <div key={item.ID} className={styles.item}>
            <Link to={`/variables/${item.ID}`} className={styles.link}>
              <h3>{item.Name}</h3>
              <p dangerouslySetInnerHTML={{ __html: item.Description.slice(0, 100) + '...'}} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default VariablesList;