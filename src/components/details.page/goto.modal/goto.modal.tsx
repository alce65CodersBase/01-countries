import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../modal/modal';
import { AppContext } from '../../../context/app.context';

type GoToModalProps = {
  country: string;
  region: string;
  continent: string;
  handleClose: () => void;
};
export function GoToModal({
  country,
  region,
  continent,
  handleClose,
}: GoToModalProps) {
  const [state, setState] = useContext(AppContext);
  const navigate = useNavigate();
  const title = `Go to ${country}`;
  const handleGo = () => {
    console.log(title);
    setState({ ...state, country, region, continent });
    handleClose();
    navigate('/visit');
  };

  return (
    <Modal>
      <div className="inside-modal">
        <h1>{title}</h1>
        <div className="buttons">
          <button onClick={handleGo}>Go</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
