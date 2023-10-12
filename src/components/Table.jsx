/* eslint-disable no-unused-vars */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import BasicModal from "./EditModal";
import CreatModal from "./CreatModal";

export default function BasicTable() {
  const [open, setOpen] = useState(false);
  const [openCreat, setOpenCreat] = useState(false);
  const [selectId, setSelectId] = useState();
  const [newPosts, setNewPosts] = useState([]);
  console.log(newPosts);

  const handleOpen = (id) => {
    setOpen(true);
    setSelectId(id);
  };

  const handleOpenCreat = () => {
    setOpenCreat(true);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  useEffect(() => {}, [newPosts]);
  return (
    <div style={{ padding: "150px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "10px",
        }}
      >
        <Button variant="contained" color="success" onClick={handleOpenCreat}>
          Create New
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "500" }}>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newPosts.length > 0
              ? newPosts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.body}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleOpen(item.id);
                        }}
                        size="small"
                        variant="contained"
                        color="primary"
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
          <TableBody>
            {data ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.body}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleOpen(item.id);
                      }}
                      size="small"
                      variant="contained"
                      color="primary"
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="contained" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <BasicModal open={open} setOpen={setOpen} id={selectId} />
      <CreatModal
        openCreat={openCreat}
        setOpenCreat={setOpenCreat}
        setNewPosts={setNewPosts}
      />
    </div>
  );
}
