import  { useState, useEffect } from "react";
import { Container, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const DocumentView = ({ documentId }) => {
  const [document, setDocument] = useState(null);
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    fetchDocument();
    fetchVersions();
  }, [documentId]);

  const fetchDocument = async () => {
    try {
      const response = await axios.get(`/api/documents/${documentId}`);
      setDocument(response.data);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const fetchVersions = async () => {
    try {
      const response = await axios.get(`/api/documents/${documentId}/versions`);
      setVersions(response.data);
    } catch (error) {
      console.error("Error fetching versions:", error);
    }
  };

  const handleVersionRestore = async (versionId) => {
    try {
      await axios.post(`/api/documents/${documentId}/restore`, { versionId });
      fetchDocument();
      fetchVersions();
    } catch (error) {
      console.error("Error restoring version:", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      {document && (
        <>
          <Typography variant="h5" gutterBottom>
            {document.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Current Version: {document.version}
          </Typography>
          <Button variant="outlined" color="primary" href={document.downloadUrl} target="_blank">
            Download
          </Button>
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Version History
          </Typography>
          <List>
            {versions.map((version) => (
              <ListItem key={version.id}>
                <ListItemText primary={`Version ${version.number}`} secondary={`Date: ${version.date}`} />
                <Button variant="contained" color="secondary" onClick={() => handleVersionRestore(version.id)}>
                  Restore
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default DocumentView;
