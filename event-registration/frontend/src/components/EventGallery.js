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
  Upload,
  MoveLeft,
  MoveRight
} from 'lucide-react';
import axios from '../utils/axios';

const EventGallery = ({ event, isAdmin, onImagesChange }) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [images, setImages] = useState(event.images || []);
  const isDarkMode = theme.palette.mode === 'dark';

  // Only update images from props if the length or order has changed
  useEffect(() => {
    if (!event.images) return;
    
    const hasOrderChanged = event.images.some((img, idx) => {
      return !images[idx] || images[idx].id !== img.id;
    });
    
    if (hasOrderChanged || event.images.length !== images.length) {
      setImages(event.images);
    }
  }, [event.images]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleMoveImage = async (imageId, direction) => {
    try {
      setError(null);
      const currentIndex = images.findIndex(img => img.id === imageId);
      if (currentIndex === -1) return;

      let newIndex;
      if (direction === 'left' && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (direction === 'right' && currentIndex < images.length - 1) {
        newIndex = currentIndex + 1;
      } else {
        return; // Invalid move
      }

      // Update local state immediately for smooth UI
      const newImages = [...images];
      const [movedImage] = newImages.splice(currentIndex, 1);
      newImages.splice(newIndex, 0, movedImage);
      setImages(newImages);

      // Send request to backend
      const formData = new FormData();
      formData.append('image_id', imageId);
      formData.append('direction', direction);

      await axios.post(
        `/api/events/${event.url_name}/reorder_images/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      // Only refresh parent if the request was successful
      onImagesChange();
    } catch (err) {
      console.error('Failed to reorder images:', err);
      setError(err.response?.data?.detail || 'Failed to reorder images');
      
      // Revert local state on error
      setImages(event.images || []);
    }
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
            sx={{
              transition: 'all 0.3s ease-in-out',
            }}
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
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        <IconButton
                          size="small"
                          onClick={() => handleMoveImage(image.id, 'left')}
                          disabled={index === 0}
                          sx={{
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'white',
                            '&:hover': {
                              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#f5f5f5',
                            },
                            '&.Mui-disabled': {
                              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#e0e0e0',
                            }
                          }}
                        >
                          <MoveLeft className="w-4 h-4" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleMoveImage(image.id, 'right')}
                          disabled={index === images.length - 1}
                          sx={{
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'white',
                            '&:hover': {
                              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#f5f5f5',
                            },
                            '&.Mui-disabled': {
                              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#e0e0e0',
                            }
                          }}
                        >
                          <MoveRight className="w-4 h-4" />
                        </IconButton>
                      </div>
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