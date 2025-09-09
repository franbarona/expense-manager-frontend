
interface Props {
  label?: string,
  name: string,
  type: string,
  value: string,
  placeholder?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputComponent = ({ label, name, type, value, placeholder, onChange }: Props) => {
  return (
    <div>
      <label className="block mb-1 text-blue-900 dark:text-gray-200 capitalize">{label || name}* :</label>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border rounded p-2 dark:text-white capitalize"
        required
      />
    </div>
  )
}

export default InputComponent;