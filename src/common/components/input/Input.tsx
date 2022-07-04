interface Props {
  type?: 'text' | 'number' | 'password';
  value?: string | number;
  placeHolder?: string;
  isDisabled?: boolean;
  change: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  type = 'text',
  value,
  placeHolder,
  isDisabled = false,
  change,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      value={value}
      onChange={change}
      disabled={isDisabled}
      className="p-2 border-2 border-sol-grey-2 outline-none rounded-md focus:border-sol-yellow-1 dark:focus:border-sol-blue-1 dark:bg-sol-black-2"
    />
  );
}
