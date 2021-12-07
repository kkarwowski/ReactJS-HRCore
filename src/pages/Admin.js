import React from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import ModifyDatabase from "../components/Associate/Admin/DatabaseModify";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DocCategoriesModify from "../components/Associate/Admin/DatabaseModify/DocCategoriessModify";
import OfficesModify from "../components/Associate/Admin/DatabaseModify/OfficesModify";

const Admin = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Container maxWidth="lg">
        {/* <Typography variant="h3" pt={8} pb={5}>
        Hi, Welcome back
      </Typography> */}
        <h1>Admin</h1>
        <Card>
          <Box p={2}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ backgroundColor: "#eef0f2" }}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Departments...
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Add, rename, delete
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ModifyDatabase />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ backgroundColor: "#eef0f2" }}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Document categories...
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Add, rename, delete
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DocCategoriesModify />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ backgroundColor: "#eef0f2" }}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Offices...
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Add, rename, delete
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <OfficesModify />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Admin;
