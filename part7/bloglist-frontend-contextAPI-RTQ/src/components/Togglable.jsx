import { Button } from "@mui/material";
import PropTypes from "prop-types";
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
        <Button
          color="primary"
          variant="contained"
          size="small"
          className="toggleVisibility"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={shown}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={toggleVisibility}
        >
          close
        </Button>
        {children}
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
