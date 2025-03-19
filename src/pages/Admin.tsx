import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import {
  Box,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Heading,
  Text,
  useToast,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import PromptManager from '../components/admin/PromptManager';
import SettingsManager from '../components/admin/SettingsManager';
import AdminLogs from '../components/admin/AdminLogs';
import { useQuery } from '@tanstack/react-query';

const AdminPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const user = useUser();
  const toast = useToast();

  // Check if user is admin
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['adminProfile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Redirect non-admin users
  React.useEffect(() => {
    if (!isLoading && (!profile || profile.role !== 'admin')) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access the admin dashboard.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    }
  }, [profile, isLoading, navigate, toast]);

  if (isLoading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error || !profile || profile.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={6}>Admin Dashboard</Heading>
      <Text mb={8} color="gray.600">
        Manage your application settings, prompts, and view logs.
      </Text>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Tabs variant="enclosed" colorScheme="blue" index={tabIndex} onChange={setTabIndex}>
          <TabList>
            <Tab>Prompts</Tab>
            <Tab>Settings</Tab>
            <Tab>Logs</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PromptManager />
            </TabPanel>
            <TabPanel>
              <SettingsManager />
            </TabPanel>
            <TabPanel>
              <AdminLogs />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AdminPage;
