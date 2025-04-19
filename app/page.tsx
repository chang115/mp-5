'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Form from '@/components/Form';
import { Box, Container, Paper, Typography, Alert, Button } from '@mui/material';

export default function Home() {
  const [shortUrl, setShortUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false); 

  useEffect(() => {
    setIsHydrated(true); 
  }, []);

  const handleSubmit = async (url: string, alias: string) => {
    setError('');
    setShortUrl('');

    
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, alias }),
    });

    const data = await res.json();

    if (res.ok) {
      
      setShortUrl(data.shortUrl);
    } else {
      
      setError(data.message || 'Something went wrong');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!isHydrated) return null; 

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F0FFFF' }}>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            URL Shortener
          </Typography>

          <Form onSubmit={handleSubmit} />

          {shortUrl && (
            <Alert severity="success" sx={{ mt: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                <Box
                  component="a"
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    wordBreak: 'break-all',
                    color: 'inherit',
                    textDecoration: 'underline',
                    mr: 2,
                  }}
                >
                  {shortUrl}
                </Box>
                <Button variant="outlined" size="small" onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
