import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminConcepts = () => {
  const [concepts, setConcepts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingConcept, setEditingConcept] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    prompt: '',
    content: '',
    difficulty: 'intermediate',
    questionType: 'explain'
  });
  const [categories, setCategories] = useState([]);

  const fetchConcepts = async () => {
    try {
      const response = await api.get('/concepts?limit=50');
      setConcepts(response.data.data.concepts);
    } catch {
      toast.error('Failed to fetch concepts');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/taxonomy/categories');
      setCategories(response.data.data);
    } catch {
      console.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchConcepts();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this concept?')) {
      try {
        await api.delete(`/concepts/${id}`);
        toast.success('Concept deleted');
        fetchConcepts();
      } catch {
        toast.error('Failed to delete concept');
      }
    }
  };

  const handleOpenDialog = (concept = null) => {
    if (concept) {
      setEditingConcept(concept);
      setFormData({
        title: concept.title || '',
        category: concept.category || '',
        subcategory: concept.subcategory || '',
        prompt: concept.prompt || '',
        content: concept.content || '',
        difficulty: concept.difficulty || 'intermediate',
        questionType: concept.questionType || 'explain'
      });
    } else {
      setEditingConcept(null);
      setFormData({
        title: '',
        category: '',
        subcategory: '',
        prompt: '',
        content: '',
        difficulty: 'intermediate',
        questionType: 'explain'
      });
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingConcept(null);
    setFormData({
      title: '',
      category: '',
      subcategory: '',
      prompt: '',
      content: '',
      difficulty: 'intermediate',
      questionType: 'explain'
    });
  };

  const handleSave = async () => {
    try {
      if (editingConcept) {
        await api.put(`/concepts/${editingConcept._id}`, formData);
        toast.success('Concept updated successfully');
      } else {
        await api.post('/concepts', formData);
        toast.success('Concept created successfully');
      }
      handleCloseDialog();
      fetchConcepts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save concept');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">Concept Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add Concept
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Views</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {concepts.map((concept) => (
              <TableRow key={concept._id}>
                <TableCell>{concept.title}</TableCell>
                <TableCell>{concept.category}</TableCell>
                <TableCell>{concept.views}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(concept)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(concept._id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingConcept ? 'Edit Concept' : 'Add Concept'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Category"
              name="category"
              fullWidth
              select
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Subcategory"
              name="subcategory"
              fullWidth
              value={formData.subcategory}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Difficulty"
              name="difficulty"
              fullWidth
              select
              value={formData.difficulty}
              onChange={handleInputChange}
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </TextField>
            <TextField
              label="Prompt"
              name="prompt"
              fullWidth
              multiline
              rows={3}
              value={formData.prompt}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Content"
              name="content"
              fullWidth
              multiline
              rows={8}
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminConcepts;
