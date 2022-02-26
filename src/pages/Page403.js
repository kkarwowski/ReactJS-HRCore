import { motion } from "framer-motion";
// material
import { styled } from "@mui/material/styles";
import { Box, Typography, Container } from "@mui/material";
// components
import { MotionContainer, varBounceIn } from "../components/animate";
import Page from "../components/Page";
import { Icon } from "@iconify/react";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  // paddingTop: theme.spacing(0),
  // paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <RootStyle title="Access Forbidden">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 500, margin: "auto", textAlign: "center" }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h1" paragraph>
                Access forbidden!
              </Typography>
            </motion.div>
            <Typography sx={{ color: "text.secondary" }}>
              I'm sorry buddy...
            </Typography>
            <motion.div variants={varBounceIn}>
              <Box sx={{ pt: 8 }}>
                <Icon icon="bx:bxs-lock" color="#315B98" fontSize="12em" />
              </Box>
              {/* <Box
                component="img"
                src="/images/403.jpg"
                sx={{ height: "430px", mx: "auto", my: { xs: 2, sm: 5 } }}
              /> */}
            </motion.div>
            {/* <Button to="/" size="large" variant="text" component={RouterLink}>
              Go to Home
            </Button> */}
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
