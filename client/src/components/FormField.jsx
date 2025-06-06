import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div className="mb-4 rounded-2xl p-2">
    <div className="flex items-center justify-between mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-100"
      >
        {labelName}
      </label>

      {isSurpriseMe && (
        <div className="flex items-center">
          <span className="mr-2">Surprise me {'==> '} </span>
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="text-sm bg-gradient-to-r from-[#6469ff] to-[#4b4fad] text-white px-3 py-1 rounded-md transition-all duration-300 focus:outline-none hover:opacity-90"
          >
            Go!
          </button>
        </div>
      )}
    </div>

    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-2xl focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-4 transition-all duration-300"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;