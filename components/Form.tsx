'use client';

import { useState } from 'react';
import {
  TextField,
  Typography,
  Box,
  Stack,
  Button,
  Alert,
} from '@mui/material';

interface FormProps {
  onSubmit: (url: string, alias: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !alias) {
      setError('Both URL and Alias are required!');
      return;
    }
    onSubmit(url, alias);
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            URL
          </Typography>
          <TextField
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Custom Alias
          </Typography>
          <Box display="flex" alignItems="center">
            <TextField
              fullWidth
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="your-alias"
              required
            />
          </Box>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Shorten
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </form>
  );
};

export default Form;
