import { useState } from "react";

export const useForm = (initialState) => {
  // ******* form state  ********

  const [state, setState] = useState(initialState);

  // ******** form field data set to state  *********

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return { state, onChange };
};
