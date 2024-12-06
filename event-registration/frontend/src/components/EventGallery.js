import { useState } from 'react';
import {
  ImageList,
  ImageListItem,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  Alert,
  Paper
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [images, setImages] = useState(event.images || []);

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
      
      onImagesChange(); // Refresh the event data
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to reorder images');
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
      onImagesChange();
      setImages([...images, ...response.data]);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    setLoading(true);
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
    } finally {
      setLoading(false);
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
        {event.images?.map((image, index) => (
          <ImageListItem key={image.id} className="relative">
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
                          className="!bg-white hover:!bg-gray-200"
                        >
                          <MoveLeft className="w-4 h-4" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleMoveImage(image.id, 'right')}
                          disabled={index === event.images.length - 1}
                          className="!bg-white hover:!bg-gray-200"
                        >
                          <MoveRight className="w-4 h-4" />
                        </IconButton>
                      </div>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteImage(image.id)}
                        className="!bg-red-500 hover:!bg-red-600 !text-white"
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

          {event.images?.length > 1 && (
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