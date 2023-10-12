/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios"; // Import the axios library

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

export default function CreatModal({ openCreat, setOpenCreat, setNewPosts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleClose = () => setOpenCreat(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  const handleCreatePost = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: title,
          body: body,
          userId: 1,
        }
      );

      const newPost = response.data;
      setNewPosts((prevPosts) => [newPost, ...prevPosts]);

      setOpenCreat(false);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <Modal
        open={openCreat}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Create New Post
          </Typography>
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
            onClick={handleCreatePost}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
