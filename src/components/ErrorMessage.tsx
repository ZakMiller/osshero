import {
    IconButton,
    Snackbar,
    SnackbarContent
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

interface Props {
  open: boolean;
  setOpen: any;
  message: string;
}
export default function ErrorMessage({ open, setOpen, message }: Props) {
  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      color="red"
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    >
      <SnackbarContent
        message={<span id="client-snackbar">{message}</span>}
      />
    </Snackbar>
  );
}
