import React from "react";

const PasswordInput = ({ input, setInput, name }) => {
  return (
    <div className="shadow rounded-full bg-white px-2 py-2 mb-4">
      <label className="font-bold px-3 text-gray-600 text-sm">{name}</label>
      <input
        type="password"
        className="px-3 rounded-full text-gray-500 w-full focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
    </div>
  );
};

export default React.memo(PasswordInput);
