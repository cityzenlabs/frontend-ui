import React, { useState } from "react";
import "./ICheckbox.css"; // Import your custom CSS styles

interface ICheckboxProps {
  label?: string;
}

function ICheckbox({ label }: ICheckboxProps) {
  return (
    <div className="flex items-center">
      <input type="checkbox" id="rememberMe" className="mr-2" />
      <div className="text-sm font-light">{label}</div>
    </div>
  );
}

export default ICheckbox;
