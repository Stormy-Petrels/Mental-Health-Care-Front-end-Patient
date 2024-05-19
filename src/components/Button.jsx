import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  button: {
    "&.outlined": {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
    "&.contained": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

const CustomButton = ({ text, variant, onClick }) => {
  const classes = useStyles();

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={clsx(classes.button, variant)}
    >
      {text}
    </Button>
  );
};

export default CustomButton;