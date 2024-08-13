import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../App.module.css'

const PaginationComponent = () => {
  const { pageNumber } = useParams(); 
  const navigate = useNavigate(); 
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  const [limit] = useState(5); 
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(parseInt(pageNumber) || 1);
  }, [pageNumber]);

  useEffect(() => {
    fetchCars();
  }, [currentPage]);

  const fetchCars = async () => {
    setLoading(true);
    console.log(`Fetching data for page: ${currentPage}`);
    try {
      const response = await fetch(`http://localhost:3000/machines?_page=${currentPage}&_limit=${limit}`);
      const data = await response.json();
      console.log('Fetched data:', data);

      if (data.results) {
        setCars(data.results);
        setTotal(data.total); 
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(total / limit)) {
      navigate(`/page/${currentPage + 1}`);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      navigate(`/page/${currentPage - 1}`);
    }
  };

  return (
    <div>
      <div className={styles.cars}>
      <h1>PAGES {currentPage}</h1>
      
       <div className={styles.carsFlex}>
       {cars.map((car, index) => (
          <div key={index} className={styles.carCard}>
          
            <img className={styles.img} src={car.image} alt={car.title}/>
            <h2>{car.title}</h2>
            <p>Start Production: {car.start_production}</p>
            <p>Class: {car.class}</p>
          </div>
        ))}
       </div>
      </div>

      {loading && <p>Loading...</p>}

      <div className={styles.paginationButtons}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1 || loading}>
          ORTGA
        </button>
        <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(total / limit) || loading}>
          KEYINGI
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
