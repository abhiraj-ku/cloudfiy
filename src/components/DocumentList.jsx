import  { useEffect, useState } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Typography } from "@mui/material";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get("/api/documents");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/documents/${id}`);
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Document List
      </Typography>
      <List>
        {documents.map((doc) => (
          <ListItem key={doc.id}>
            <ListItemText primary={doc.title} secondary={`Version: ${doc.version}`} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(doc.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DocumentList;
