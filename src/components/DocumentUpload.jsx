import  { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      const response = await axios.post("/api/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Upload Document
      </Typography>
      <form onSubmit={handleUpload}>
        <TextField
          label="Document Title"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <input type="file" onChange={handleFileChange} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default DocumentUpload;
