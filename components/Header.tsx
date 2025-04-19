import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ width: '100%', paddingX: 2, paddingY: 1.5, backgroundColor: 'white', display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
        CS391 URL Shortener
      </Typography>
    </Box>
  );
};

export default Header;
