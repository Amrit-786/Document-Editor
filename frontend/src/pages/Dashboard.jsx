import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Box, Heading, List, ListItem, Spinner, Text } from '@chakra-ui/react';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging line
        const response = await axios.get('/documents', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setDocuments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setError('Failed to fetch documents.');
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={5}>
      <Heading mb={4}>Dashboard</Heading>
      <List spacing={3}>
        {documents.map(doc => (
          <ListItem key={doc._id}>{doc.title}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Dashboard;
