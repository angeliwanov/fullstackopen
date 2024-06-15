import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);

  const hidden = { display: visible ? "none" : "" };
  const shown = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hidden}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={shown}>
        <button onClick={toggleVisibility}>close</button>
        {children}
      </div>
    </div>
  );
});

export default Togglable;
