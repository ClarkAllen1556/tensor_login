import { ReactNode, useEffect, useRef } from 'react';
import '@components/button/button.css';

type Variant = 'primary' | 'secondary' | 'text';

interface Props {
  variant?: Variant;
  isDisabled?: boolean;
  click: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export default function Button({
  variant = 'primary',
  isDisabled = false,
  click,
  children,
}: Props) {
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    switch (variant) {
      case 'text':
        btn.current?.classList.add('txt-button');
        break;
      case 'primary':
        btn.current?.classList.add('primary-button');
        break;
      case 'secondary':
        btn.current?.classList.add('secondary-button');
        break;
    }
  }, []);

  return (
    <button
      ref={btn}
      onClick={click}
      disabled={isDisabled}
      className="select-none"
    >
      {children}
    </button>
  );
}
