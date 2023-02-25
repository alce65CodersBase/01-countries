import { Modal } from '../../modal/modal';

type GoToModalProps = {
  country: string;
  handleClick: () => void;
};
export function GoToModal({ country, handleClick }: GoToModalProps) {
  const title = `Go to ${country}`;
  const handleGo = () => {
    console.log(title);
  };

  return (
    <Modal>
      <div className="inside-modal">
        <h1>{title}</h1>
        <div className="buttons">
          <button onClick={handleGo}>Go</button>
          <button onClick={handleClick}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
