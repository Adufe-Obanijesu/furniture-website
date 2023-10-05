const TextInput = ({ name, label, optional }) => {
	return (
		<div className="mb-4">
      <label className="font-bold px-3 text-gray-600 text-sm">
      		{label}
      		{
      			!optional ? " (*)" : "(optional)"
      		}
      	</label>
      <input
        type="text"
        className="p-3 text-gray-500 rounded w-full border border-gray-700 text-lg focus:outline-none"
        // value={input}
        name={name}
        // onChange={(e) => setInput(e.target.value)}
        required
      />
    </div>
	)
}

export default TextInput;