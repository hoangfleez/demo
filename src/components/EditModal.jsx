/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, id }) {
  const [post, setPost] = useState({ title: "", body: "" });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setTitle(post.title);
    setBody(post.body);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  useEffect(() => {
    async function getPost() {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setPost(res.data);
        setTitle(res.data.title);
        setBody(res.data.body);
      } catch (error) {
        console.error(error);
      }
    }
    getPost();
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleUpdatePost = async () => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title: title,
        body: body,
      });

      setSuccessMessage("Post updated successfully");
      setErrorMessage(null);

      // Automatically clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating post:", error);
      setErrorMessage("Error updating post");
      setSuccessMessage(null);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <TextField
              value={title}
              onChange={handleTitleChange}
              variant="standard"
              fullWidth
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              value={body}
              onChange={handleBodyChange}
              variant="standard"
              multiline
              fullWidth
              rows={4}
            />
          </Typography>
          <Button
            sx={{ marginTop: "10px" }}
            variant="outlined"
            size="small"
            onClick={handleUpdatePost}
          >
            Edit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
