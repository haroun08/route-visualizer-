import React from 'react';
import { GitHub, LinkedIn } from '@mui/icons-material'; // Icons from Material-UI
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '16px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Developed by <strong>Haroun Barhoumi</strong>
      </Typography>
      <Box sx={{ marginTop: '8px' }}>
        <Link
          href="https://github.com/haroun08"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ marginRight: '16px' }}
        >
          <GitHub fontSize="small" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/haroun-barhoumi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn fontSize="small" />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;