import { ModalProps } from '../../interfaces/Modal.interface';
import './modal.scss';

export const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
