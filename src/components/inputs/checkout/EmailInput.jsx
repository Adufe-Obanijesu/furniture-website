import React from "react";

const EmailInput = ({ name, label, optional, input, setInput }) => {
	return (
		<div className="mb-4">
      <label className="font-bold px-3 text-gray-600 text-sm">
      		{label}
      		{
      			!optional ? " (*)" : "(optional)"
      		}
      	</label>
      <input
        type="email"
        className="p-3 text-gray-500 rounded text-lg w-full border border-gray-700 focus:outline-none"
        value={input}
        name={name}
        onChange={(e) => setInput(e.target.value)}
        required
      />
    </div>
	)
}

export default React.memo(EmailInput);