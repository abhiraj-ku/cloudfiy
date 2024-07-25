import { Container, Typography, Grid } from "@mui/material";
import DocumentUpload from "../components/DocumentUpload";
import DocumentList from "../components/DocumentList";

const Dashboard = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <DocumentUpload />
        </Grid>
        <Grid item xs={12} md={6}>
          <DocumentList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
