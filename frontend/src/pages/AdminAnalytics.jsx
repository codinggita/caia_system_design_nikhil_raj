import { useEffect, useState } from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import api from '../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminAnalytics = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [difficultyData, setDifficultyData] = useState([]);
  const [growthData, setGrowthData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [catRes, diffRes, growthRes] = await Promise.all([
          api.get('/analytics/category-distribution'),
          api.get('/analytics/difficulty-stats'),
          api.get('/analytics/growth')
        ]);
        setCategoryData(catRes.data.data.map(item => ({ name: item._id, value: item.count })));
        setDifficultyData(diffRes.data.data.map(item => ({ name: item._id, value: item.count })));
        setGrowthData(growthRes.data.data.map(item => ({ 
          name: `${item._id.month}/${item._id.year}`, 
          count: item.count 
        })));
      } catch {
        console.error('Failed to fetch analytics');
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Detailed Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>Category Distribution</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>Difficulty Breakdown</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={difficultyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>Content Growth</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminAnalytics;
