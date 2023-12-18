import React from 'react';
import s from './Button.module.scss';

type variantBtn = 'text' | 'contained' | 'outlined';
type sizeBtn = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant: variantBtn,
  size: sizeBtn,
  onClick?: () => void,
  disabled?: boolean,
  children: React.ReactNode,
}
const Button = ({ variant = 'contained', size, onClick, disabled = false, children, ...props }: ButtonProps) => {
  const classStyles = [s.btn, s[variant], s[size]];
  return (
    <button className={classStyles.join(' ')} disabled onClick={onClick} {...props} >
      {children}
    </button>
  )
}

export default Button;
