import Box from '@mui/material/Box';
import { Button, Grid, Item, Card, CardHeader } from '@mui/material';
import Label from './Label';
import { sentenceCase } from 'change-case';
import { TableRow,TableBody,TableCell,Container,Typography,TableContainer, Table } from '@mui/material';
import Scrollbar from './Scrollbar';
const associateDocuments = () => {
    return (
    <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          p: 2,
          width: 1100,
          height: 500,
        },
      }}>
          <Card>
            <CardHeader title="Associate Documents" subheader="(+43%) than last year" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                <TableBody>
                  <TableRow hover onClick={()=>console.log('click')}>
                    <TableCell>
                      sdfdf
                    </TableCell>
                  </TableRow>
                </TableBody>
                </Table>
                </TableContainer>
              </Scrollbar>
            </Box>
          </Card>
    </Box>
        )
    }
export default associateDocuments