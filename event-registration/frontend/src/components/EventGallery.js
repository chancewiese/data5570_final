import { useState, useEffect } from 'react';
import {
  ImageList,
  ImageListItem,
  IconButton,
  Dialog,
  Button,
  Box,
  Alert,
  Paper,
  useTheme
} from '@mui/material';
import {
  X as CloseIcon,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Upload
} from 'lucide-react';
import axios from '../utils/axios';

const EventGallery = ({ event, isAdmin, onImagesChange }) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [images, setImages] = useState(event.images || []);
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    setImages(event.images || []);
  }, [event.images]);

  const handleImageClick = (image, index) => {
    setSelectedImage({ ...image, index });
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    const newIndex = (selectedImage.index - 1 + images.length) % images.length;
    setSelectedImage({ ...images[newIndex], index: newIndex });
  };

  const handleNext = () => {
    const newIndex = (selectedImage.index + 1) % images.length;
    setSelectedImage({ ...images[newIndex], index: newIndex });
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    setError(null);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post(
        `/api/events/${event.url_name}/upload_images/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setImages([...images, ...response.data]);
      onImagesChange();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload images');
    } finally {
      setUploadingImages(false);
      e.target.value = '';
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    setError(null);

    try {
      const formData = new FormData();
      formData.append('image_id', imageId);

      await axios.post(
        `/api/events/${event.url_name}/delete_image/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      setImages(images.filter(img => img.id !== imageId));
      
      if (selectedImage?.id === imageId) {
        setSelectedImage(null);
      }
      
      onImagesChange();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete image');
    }
  };

  return (
    <div className="w-full">
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {isAdmin && (
        <Box className="mb-4">
          <input
            type="file"
            id="image-upload"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              disabled={uploadingImages}
              startIcon={<Upload className="w-4 h-4" />}
            >
              {uploadingImages ? 'Uploading...' : 'Upload Images'}
            </Button>
          </label>
        </Box>
      )}

      <ImageList cols={3} gap={8} className="!grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3">
        {images.map((image, index) => (
          <ImageListItem 
            key={image.id} 
            className="relative"
          >
            <Paper 
              elevation={2} 
              className="h-full"
              sx={{
                '&:hover .image-controls': {
                  opacity: 1,
                },
              }}
            >
              <div className="relative">
                <img
                  src={image.image_url}
                  alt={image.caption || 'Event image'}
                  className="w-full h-full object-cover aspect-[4/3] cursor-pointer"
                  onClick={() => handleImageClick(image, index)}
                />
                {isAdmin && (
                  <div className="image-controls absolute bottom-0 left-0 right-0 bg-black/50 p-2 opacity-0 transition-opacity duration-200">
                    <div className="flex justify-end">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteImage(image.id)}
                        sx={{
                          backgroundColor: 'rgb(239, 68, 68)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgb(220, 38, 38)',
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>
            </Paper>
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog
        open={!!selectedImage}
        onClose={handleClose}
        maxWidth="md"
        fullWidth={false}
        PaperProps={{
          sx: {
            m: 0,
            maxWidth: '800px',
            width: '90%',
            bgcolor: 'background.paper',
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              zIndex: 1,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <img
            src={selectedImage?.image_url}
            alt={selectedImage?.caption || 'Event image'}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain'
            }}
          />

          {images.length > 1 && (
            <Box sx={{ 
              position: 'absolute', 
              bottom: 16, 
              left: 0, 
              right: 0, 
              display: 'flex', 
              justifyContent: 'space-between', 
              px: 2 
            }}>
              <IconButton
                onClick={handlePrevious}
                sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'action.hover' } }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'action.hover' } }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          )}
        </Box>
      </Dialog>
    </div>
  );
};

export default EventGallery;