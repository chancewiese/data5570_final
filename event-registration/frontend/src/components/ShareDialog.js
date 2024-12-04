// src/components/ShareDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Typography,
  Tooltip,
  Snackbar,
  Alert,
  Box,
  Button,
  Stack
} from '@mui/material';
import {
  Mail,
  MessageSquare,
  Copy,
  QrCode,
  Instagram,
  Facebook,
  X,
  Download,
} from 'lucide-react';

/* global navigator, document, window, ClipboardItem, fetch */

const ShareDialog = ({ event, open, onClose }) => {
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const eventUrl = window?.location?.href || '';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(eventUrl)}`;
  
  const showAlert = (message) => {
    setAlertMessage(message);
    setShowCopyAlert(true);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(event.title);
    const body = encodeURIComponent(`Check out this event: ${event.title}\n\n${event.description}\n\nDate: ${event.date}\nTime: ${event.time}\n\nRegister here: ${eventUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleSMSShare = () => {
    const message = encodeURIComponent(`Check out ${event.title}! ${eventUrl}`);
    window.open(`sms:?body=${message}`);
  };

  const handleCopyLink = async () => {
    try {
      if (window?.navigator?.clipboard) {
        await window.navigator.clipboard.writeText(eventUrl);
        showAlert('Link copied to clipboard!');
        return;
      }
      
      const textArea = document.createElement('textarea');
      textArea.value = eventUrl;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        showAlert('Link copied to clipboard!');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showAlert('Failed to copy link');
      }
      
      document.body.removeChild(textArea);
    } catch (err) {
      console.error('Failed to copy:', err);
      showAlert('Failed to copy link');
    }
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`);
  };

  const handleInstagramShare = () => {
    handleCopyLink();
    window.open('https://www.instagram.com');
  };

  const handleQRCode = () => {
    setQrVisible(!qrVisible);
  };

  const handleCopyQR = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      
      if (window?.navigator?.clipboard?.write && typeof ClipboardItem !== 'undefined') {
        const item = new ClipboardItem({ 'image/png': blob });
        await window.navigator.clipboard.write([item]);
        showAlert('QR code copied to clipboard!');
      } else {
        showAlert('Your browser doesn\'t support copying images to clipboard');
      }
    } catch (err) {
      console.error('Failed to copy QR code:', err);
      showAlert('Failed to copy QR code');
    }
  };

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${event.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-qr-code.png`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
      showAlert('QR code downloaded!');
    } catch (err) {
      console.error('Failed to download QR code:', err);
      showAlert('Failed to download QR code');
    }
  };

  const shareOptions = [
    { icon: <Mail className="w-6 h-6" />, label: 'Email', onClick: handleEmailShare },
    { icon: <MessageSquare className="w-6 h-6" />, label: 'SMS', onClick: handleSMSShare },
    { icon: <Copy className="w-6 h-6" />, label: 'Copy Link', onClick: handleCopyLink },
    { icon: <QrCode className="w-6 h-6" />, label: 'QR Code', onClick: handleQRCode },
    { icon: <Facebook className="w-6 h-6" />, label: 'Facebook', onClick: handleFacebookShare },
    { icon: <Instagram className="w-6 h-6" />, label: 'Instagram', onClick: handleInstagramShare }
  ];

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Share Event</Typography>
          <IconButton onClick={onClose} size="small">
            <X className="w-5 h-5" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ p: 2 }}>
            {shareOptions.map((option) => (
              <Grid item xs={4} key={option.label}>
                <Tooltip title={option.label}>
                  <IconButton
                    onClick={option.onClick}
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      p: 2
                    }}
                  >
                    {option.icon}
                    <Typography variant="caption">{option.label}</Typography>
                  </IconButton>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
          
          {qrVisible && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 2,
              mt: 2 
            }}>
              <img 
                src={qrCodeUrl}
                alt="Event QR Code"
                style={{ 
                  border: '1px solid rgba(0,0,0,0.12)', 
                  borderRadius: '8px',
                  width: '200px',
                  height: '200px'
                }}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<Copy />}
                  onClick={handleCopyQR}
                >
                  Copy QR
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={handleDownloadQR}
                >
                  Download
                </Button>
              </Stack>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showCopyAlert}
        autoHideDuration={3000}
        onClose={() => setShowCopyAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareDialog;