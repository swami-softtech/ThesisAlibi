// components/OtpInput.jsx
import React, { useRef } from 'react';

const OtpInput = ({ value, onChange, numInputs = 6, isDisabled = false }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const newValue = e.target.value;
    if (newValue.length > 1) return;
    
    const newOtp = value.split('');
    newOtp[index] = newValue;
    onChange(newOtp.join(''));

    // Auto focus to next input
    if (newValue && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, numInputs);
    onChange(pastedData);
  };

  return (
    <div className="flex justify-center gap-3" onPaste={handlePaste}>
      {Array.from({ length: numInputs }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="1"
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={isDisabled}
          className="w-12 h-12 text-center text-2xl font-bold rounded-lg border-2 border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
        />
      ))}
    </div>
  );
};

export default OtpInput;