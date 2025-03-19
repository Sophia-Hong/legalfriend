import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Flex,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Select,
  Input,
  IconButton,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Code,
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeftIcon, ChevronRightIcon, InfoIcon } from '@chakra-ui/icons';

interface AdminLog {
  id: string;
  user_id: string;
  action: string;
  details: any;
  created_at: string;
  profiles?: {
    email: string;
    full_name: string;
  };
}

interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
}

const AdminLogs: React.FC = () => {
  const supabase = useSupabaseClient();
  const toast = useToast();
  
  // Pagination state
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [actionFilter, setActionFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');

  // Fetch logs
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['adminLogs', limit, offset, actionFilter, userFilter],
    queryFn: async () => {
      let query = supabase
        .from('admin_logs')
        .select('*, profiles:user_id(email, full_name)', { count: 'exact' })
        .order('created_at', { ascending: false });
      
      if (actionFilter) {
        query = query.ilike('action', `%${actionFilter}%`);
      }
      
      if (userFilter) {
        query = query.or(`profiles.email.ilike.%${userFilter}%,profiles.full_name.ilike.%${userFilter}%`);
      }
      
      const { data, error, count } = await query.range(offset, offset + limit - 1);
      
      if (error) throw error;
      
      return {
        logs: data as AdminLog[],
        pagination: {
          total: count || 0,
          limit,
          offset
        }
      };
    }
  });

  const handleNextPage = () => {
    if (data && data.pagination.offset + data.pagination.limit < data.pagination.total) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset(Math.max(0, offset - limit));
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setOffset(0); // Reset to first page when changing limit
  };

  const formatActionName = (action: string) => {
    return action
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getActionBadgeColor = (action: string) => {
    if (action.includes('create')) return 'green';
    if (action.includes('update')) return 'blue';
    if (action.includes('delete')) return 'red';
    return 'gray';
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h="300px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading logs: {(error as Error).message}
      </Alert>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">Admin Activity Logs</Heading>
        <Button size="sm" onClick={() => refetch()}>Refresh</Button>
      </Flex>

      <HStack spacing={4} mb={6}>
        <Input
          placeholder="Filter by action..."
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          size="sm"
          maxW="200px"
        />
        <Input
          placeholder="Filter by user..."
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          size="sm"
          maxW="200px"
        />
      </HStack>

      {data && data.logs.length > 0 ? (
        <>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Time</Th>
                  <Th>User</Th>
                  <Th>Action</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.logs.map((log) => (
                  <Tr key={log.id}>
                    <Td whiteSpace="nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </Td>
                    <Td>
                      {log.profiles?.email || 'Unknown'}
                    </Td>
                    <Td>
                      <Badge colorScheme={getActionBadgeColor(log.action)}>
                        {formatActionName(log.action)}
                      </Badge>
                    </Td>
                    <Td>
                      {log.details ? (
                        <Popover>
                          <PopoverTrigger>
                            <IconButton
                              aria-label="View details"
                              icon={<InfoIcon />}
                              size="xs"
                              variant="ghost"
                            />
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Action Details</PopoverHeader>
                            <PopoverBody>
                              <Code p={2} borderRadius="md" fontSize="sm" whiteSpace="pre-wrap" display="block">
                                {JSON.stringify(log.details, null, 2)}
                              </Code>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Text fontSize="sm" color="gray.500">No details</Text>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Flex justify="space-between" align="center" mt={4}>
            <HStack>
              <Text fontSize="sm">
                Showing {offset + 1}-{Math.min(offset + limit, data.pagination.total)} of {data.pagination.total}
              </Text>
              <Select size="sm" value={limit} onChange={handleLimitChange} w="80px">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Select>
            </HStack>
            <HStack>
              <Tooltip label="Previous page">
                <IconButton
                  aria-label="Previous page"
                  icon={<ChevronLeftIcon />}
                  onClick={handlePrevPage}
                  isDisabled={offset === 0}
                  size="sm"
                />
              </Tooltip>
              <Tooltip label="Next page">
                <IconButton
                  aria-label="Next page"
                  icon={<ChevronRightIcon />}
                  onClick={handleNextPage}
                  isDisabled={offset + limit >= data.pagination.total}
                  size="sm"
                />
              </Tooltip>
            </HStack>
          </Flex>
        </>
      ) : (
        <Box p={6} textAlign="center" borderWidth="1px" borderRadius="lg">
          <Text>No logs found.</Text>
        </Box>
      )}
    </Box>
  );
};

export default AdminLogs;
