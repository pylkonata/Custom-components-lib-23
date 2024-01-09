import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}
const Modal = ({ open, onClose, children }: ModalProps) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = 'visible';
			};
		}
	}, [open]);

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keyup', handleEsc);

		return () => {
			document.removeEventListener('keyup', handleEsc);
		};
	}, []);

	if (!open) return null;
	return createPortal(
		<div className={`${s['modalWrapper']} ${s['active']}`}>
			<div className={s['backdrop']} onClick={onClose}></div>
			<div className={s['modal']}>{children}</div>
		</div>,
		document.body
	);
};

export default Modal;
