import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './VariablesDetail.module.css';

const VariableDetail = () => {
  const { variableId } = useParams();
  const [variable, setVariable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`,
    )
      .then((result) => result.json())
      .then((data) => {
        const findData = data.Results.find(
          (v) => v.ID.toString() === variableId,
        );
        setVariable(findData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [variableId]);

  if (loading)
    return <div className={styles.loader}>Завантаження опису...</div>;
  if (!variable)
    return (
      <div className={styles.notFinded}>
        <Link to="/variables" className={styles.notFindedLink}>
          Назад до списку
        </Link>
        <div className={styles.error}>Змінну не знайдено</div>
      </div>
    );

  return (
    <div className={styles.detailContainer}>
      <Link to="/variables" className={styles.backLink}>
        Назад до списку
      </Link>
      <h1 className={styles.title}>{variable.Name}</h1>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: variable.Description }}
      />
    </div>
  );
};

export default VariableDetail;
