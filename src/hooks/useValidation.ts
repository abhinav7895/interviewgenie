import { useState } from "react";

export const useValidation = () => {
  const [name, setName] = useState({
    value: "",
    isValid: false,
    errorMessage: "",
  });
  const [email, setEmail] = useState({
    value: "",
    isValid: false,
    errorMessage: "",
  });
  const [password, setPassword] = useState({
    value: "",
    isValid: false,
    errorMessage: "",
  });

  const validateName = (value: string) => {
    if (!value.trim()) {
      setName({
        value: "",
        isValid: false,
        errorMessage: "Name is required",
      });
    } else {
      setName({
        value: value,
        isValid: true,
        errorMessage: "",
      });
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setEmail({
        value: "",
        isValid: false,
        errorMessage: "Email is required",
      });
    } else if (!emailRegex.test(value)) {
      setEmail({
        value: "",
        isValid: false,
        errorMessage: "Invalid email format",
      });
    } else {
        setEmail({
        value: value,
        isValid: true,
        errorMessage: "",
      });
    }
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) {
      setPassword({
        value: "",
        isValid: false,
        errorMessage: "Password is required",
      });
    } else if (value.length < 6) {
      setPassword({
        value: "",
        isValid: false,
        errorMessage: "Password must be at least 6 characters.",
      });
    } else {
      setPassword({
        value,
        isValid: true,
        errorMessage: "",
      });
    }
  };

  return {
    name,
    email,
    password,
    validateName,
    validateEmail,
    validatePassword,
  };
};
