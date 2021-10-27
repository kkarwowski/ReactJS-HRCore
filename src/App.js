import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { Typography } from '@mui/material';
import PermanentDrawerLeft from './components/Nav/drawer';
function App() {

  return (
    <>
    <ThemeConfig>
      <GlobalStyles />
      <Typography variant="h2">Hello</Typography>
      <PermanentDrawerLeft/>
    </ThemeConfig>
    </>
  );
}

export default App;
