import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { TextareaAutosize } from "@material-ui/core";
import { useEffect } from "react";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function EditModal(props) {
  const { open, setOpen, category, onEdit } = props;
  const [cat, setCat] = useState({});
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setCat(category);
  }, [category]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Make changes
        </DialogTitle>
        <DialogContent>
          <TextareaAutosize
            style={{
              width: 200,
              padding: 10,
              fontFamily: "arial",
              fontSize: 20,
            }}
            aria-label="minimum height"
            rowsMin={3}
            value={cat.name}
            onChange={(e) => {
              setCat({ ...cat, name: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onEdit(cat.name)
                .then((res) => setOpen(false))
                .catch((err) => console.log(err));
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
