import { useState } from 'react';
import LoaderIcon from '../icons/loading.svg';
import '../App.css';

const GenerateButton = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className={`generate-button ${isLoading ? 'loading' : ''}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <img 
          src={LoaderIcon} 
          alt="Loading..." 
          className="spinner-icon"
        />
      ) : (
        "Отправить"
      )}
    </button>
  );
};

export default GenerateButton;