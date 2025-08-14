export default function InputField({ label, type, name, placeholder, value, onChange }) {
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-y-2">
      <label className="text-l font-medium text-black">{label}</label>
      <input
        className="w-full h-auto border border-[#474646] rounded-md px-2 py-2.5 text-l font-regular text-[#545454]"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
