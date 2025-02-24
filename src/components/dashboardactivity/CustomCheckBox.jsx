import React from 'react';

const CustomCheckbox = ({ id, checked, onChange }) => (
    <div className="custom-checkbox-wrapper">
        <input 
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="custom-checkbox-input"
        />
        <label htmlFor={id} className="custom-checkbox-label">
        <svg className="checkmark" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" fill="none" strokeWidth="2" />
        </svg>
        </label>
    </div>
);

export default CustomCheckbox;
