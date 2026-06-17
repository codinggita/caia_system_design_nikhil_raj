import { useEffect, useState } from 'react';
import { Grid, Typography, Box, Card, CardContent } from '@mui/material';
import { People, LibraryBooks, Visibility, Bookmark } from '@mui/icons-material';
import api from '../services/api';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalConcepts: 0,
    totalUsers: 0,
    totalViews: 0,
    totalBookmarks: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [conceptsRes, usersRes, viewsRes, bookmarksRes] = await Promise.all([
          api.get('/analytics/total-concepts'),
          api.get('/admin/users'),
          api.get('/analytics/views/total'),
          api.get('/analytics/bookmarks/total')
        ]);
        setStats({
          totalConcepts: conceptsRes.data.data.total,
          totalUsers: usersRes.data.data.length,
          totalViews: viewsRes.data.data.totalViews,
          totalBookmarks: bookmarksRes.data.data.totalBookmarks
        });
      } catch {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Concepts', value: stats.totalConcepts, icon: <LibraryBooks color="primary" />, color: '#e3f2fd' },
    { title: 'Total Users', value: stats.totalUsers, icon: <People color="secondary" />, color: '#f3e5f5' },
    { title: 'Total Views', value: stats.totalViews, icon: <Visibility color="success" />, color: '#e8f5e9' },
    { title: 'Total Bookmarks', value: stats.totalBookmarks, icon: <Bookmark color="warning" />, color: '#fff3e0' },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        System Overview
      </Typography>
      <Grid container spacing={3}>
        {statCards.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card sx={{ bgcolor: stat.color }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 2, display: 'flex' }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminOverview;
