import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Flex,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  InputGroup,
  InputRightElement,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface AdminSetting {
  id: string;
  key: string;
  value: any;
  description: string;
  created_at: string;
  updated_at: string;
}

const SettingsManager: React.FC = () => {
  const supabase = useSupabaseClient();
  const toast = useToast();
  const queryClient = useQueryClient();
  
  // Form states
  const [newExtension, setNewExtension] = useState('');

  // Fetch settings
  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['adminSettings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*');
      
      if (error) throw error;
      return data as AdminSetting[];
    }
  });

  // Get specific settings
  const fileUploadLimits = settings?.find(s => s.key === 'file_upload_limits')?.value || {
    max_file_size_mb: 10,
    allowed_extensions: ['pdf', 'docx', 'doc', 'jpg', 'jpeg', 'png']
  };
  
  const paymentSettings = settings?.find(s => s.key === 'payment_settings')?.value || {
    price_usd: 19.99,
    currency: 'usd'
  };
  
  const aiSettings = settings?.find(s => s.key === 'ai_settings')?.value || {
    model: 'mistral-large-latest',
    temperature: 0.2,
    max_tokens: 4000
  };

  // Update settings mutation
  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string, value: any }) => {
      const { data, error } = await supabase
        .from('admin_settings')
        .update({ value })
        .eq('key', key)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSettings'] });
      toast({
        title: 'Settings updated',
        status: 'success',
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error updating settings',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
      });
    }
  });

  // Handlers
  const handleUpdateFileSettings = () => {
    updateSettingMutation.mutate({
      key: 'file_upload_limits',
      value: fileUploadLimits
    });
  };

  const handleUpdatePaymentSettings = () => {
    updateSettingMutation.mutate({
      key: 'payment_settings',
      value: paymentSettings
    });
  };

  const handleUpdateAISettings = () => {
    updateSettingMutation.mutate({
      key: 'ai_settings',
      value: aiSettings
    });
  };

  const handleAddExtension = () => {
    if (newExtension && !fileUploadLimits.allowed_extensions.includes(newExtension)) {
      const updatedExtensions = [...fileUploadLimits.allowed_extensions, newExtension.toLowerCase()];
      updateSettingMutation.mutate({
        key: 'file_upload_limits',
        value: { ...fileUploadLimits, allowed_extensions: updatedExtensions }
      });
      setNewExtension('');
    }
  };

  const handleRemoveExtension = (extension: string) => {
    const updatedExtensions = fileUploadLimits.allowed_extensions.filter(ext => ext !== extension);
    updateSettingMutation.mutate({
      key: 'file_upload_limits',
      value: { ...fileUploadLimits, allowed_extensions: updatedExtensions }
    });
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
        Error loading settings: {(error as Error).message}
      </Alert>
    );
  }

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        {/* File Upload Settings */}
        <Card>
          <CardHeader>
            <Heading size="md">File Upload Settings</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Maximum File Size (MB)</FormLabel>
                <NumberInput 
                  value={fileUploadLimits.max_file_size_mb} 
                  min={1} 
                  max={50}
                  onChange={(_, value) => {
                    const updatedLimits = { ...fileUploadLimits, max_file_size_mb: value };
                    updateSettingMutation.mutate({
                      key: 'file_upload_limits',
                      value: updatedLimits
                    });
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>Maximum file size for uploaded documents (1-50 MB)</FormHelperText>
              </FormControl>
              
              <FormControl>
                <FormLabel>Allowed File Extensions</FormLabel>
                <HStack spacing={2} mb={3} flexWrap="wrap">
                  {fileUploadLimits.allowed_extensions.map((ext) => (
                    <Tag 
                      key={ext} 
                      size="md" 
                      borderRadius="full" 
                      variant="solid" 
                      colorScheme="blue"
                      m={1}
                    >
                      <TagLabel>.{ext}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveExtension(ext)} />
                    </Tag>
                  ))}
                </HStack>
                
                <InputGroup size="md">
                  <Input
                    value={newExtension}
                    onChange={(e) => setNewExtension(e.target.value)}
                    placeholder="Add extension (e.g., pdf)"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleAddExtension}>
                      Add
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>File types that can be uploaded and processed</FormHelperText>
              </FormControl>
            </VStack>
          </CardBody>
          <CardFooter>
            <Button colorScheme="blue" onClick={handleUpdateFileSettings}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <Heading size="md">Payment Settings</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Price (USD)</FormLabel>
                <NumberInput 
                  value={paymentSettings.price_usd} 
                  min={0.99} 
                  max={999.99}
                  precision={2}
                  step={0.01}
                  onChange={(_, value) => {
                    const updatedSettings = { ...paymentSettings, price_usd: value };
                    updateSettingMutation.mutate({
                      key: 'payment_settings',
                      value: updatedSettings
                    });
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>Price for full lease analysis</FormHelperText>
              </FormControl>
              
              <FormControl>
                <FormLabel>Currency</FormLabel>
                <Select 
                  value={paymentSettings.currency}
                  onChange={(e) => {
                    const updatedSettings = { ...paymentSettings, currency: e.target.value };
                    updateSettingMutation.mutate({
                      key: 'payment_settings',
                      value: updatedSettings
                    });
                  }}
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                  <option value="cad">CAD</option>
                  <option value="aud">AUD</option>
                </Select>
                <FormHelperText>Currency for payments</FormHelperText>
              </FormControl>
            </VStack>
          </CardBody>
          <CardFooter>
            <Button colorScheme="blue" onClick={handleUpdatePaymentSettings}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        {/* AI Settings */}
        <Card>
          <CardHeader>
            <Heading size="md">AI Settings</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>AI Model</FormLabel>
                <Select 
                  value={aiSettings.model}
                  onChange={(e) => {
                    const updatedSettings = { ...aiSettings, model: e.target.value };
                    updateSettingMutation.mutate({
                      key: 'ai_settings',
                      value: updatedSettings
                    });
                  }}
                >
                  <option value="mistral-large-latest">Mistral Large (Latest)</option>
                  <option value="mistral-medium-latest">Mistral Medium (Latest)</option>
                  <option value="mistral-small-latest">Mistral Small (Latest)</option>
                </Select>
                <FormHelperText>AI model used for analysis</FormHelperText>
              </FormControl>
              
              <FormControl>
                <FormLabel>Temperature: {aiSettings.temperature}</FormLabel>
                <Slider 
                  min={0} 
                  max={1} 
                  step={0.05}
                  value={aiSettings.temperature}
                  onChange={(value) => {
                    const updatedSettings = { ...aiSettings, temperature: value };
                    updateSettingMutation.mutate({
                      key: 'ai_settings',
                      value: updatedSettings
                    });
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                  <SliderMark value={0} mt={2} ml={-2.5} fontSize="sm">
                    0
                  </SliderMark>
                  <SliderMark value={0.5} mt={2} ml={-2.5} fontSize="sm">
                    0.5
                  </SliderMark>
                  <SliderMark value={1} mt={2} ml={-2.5} fontSize="sm">
                    1
                  </SliderMark>
                </Slider>
                <FormHelperText>
                  Controls randomness: 0 = deterministic, 1 = creative
                </FormHelperText>
              </FormControl>
              
              <FormControl>
                <FormLabel>Max Tokens</FormLabel>
                <NumberInput 
                  value={aiSettings.max_tokens} 
                  min={1000} 
                  max={8000}
                  step={100}
                  onChange={(_, value) => {
                    const updatedSettings = { ...aiSettings, max_tokens: value };
                    updateSettingMutation.mutate({
                      key: 'ai_settings',
                      value: updatedSettings
                    });
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>Maximum length of AI response</FormHelperText>
              </FormControl>
            </VStack>
          </CardBody>
          <CardFooter>
            <Button colorScheme="blue" onClick={handleUpdateAISettings}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </VStack>
    </Box>
  );
};

export default SettingsManager;
