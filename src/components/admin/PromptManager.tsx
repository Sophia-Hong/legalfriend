import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  Code,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Editor } from '@monaco-editor/react';

interface Prompt {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  prompt_versions?: PromptVersion[];
}

interface PromptVersion {
  id: string;
  prompt_id: string;
  version: number;
  content: string;
  output_schema: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const PromptManager: React.FC = () => {
  const supabase = useSupabaseClient();
  const toast = useToast();
  const queryClient = useQueryClient();
  
  // Modal states
  const { isOpen: isPromptModalOpen, onOpen: onPromptModalOpen, onClose: onPromptModalClose } = useDisclosure();
  const { isOpen: isVersionModalOpen, onOpen: onVersionModalOpen, onClose: onVersionModalClose } = useDisclosure();
  
  // Form states
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<PromptVersion | null>(null);
  const [newPrompt, setNewPrompt] = useState<Partial<Prompt>>({ name: '', description: '', is_active: false });
  const [newVersion, setNewVersion] = useState<Partial<PromptVersion>>({ content: '', output_schema: {}, is_active: false });
  const [editorTab, setEditorTab] = useState(0);

  // Fetch prompts
  const { data: prompts, isLoading, error } = useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prompts')
        .select('*, prompt_versions(*)');
      
      if (error) throw error;
      return data as Prompt[];
    }
  });

  // Mutations
  const createPromptMutation = useMutation({
    mutationFn: async (prompt: Partial<Prompt>) => {
      const { data, error } = await supabase
        .from('prompts')
        .insert(prompt)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast({
        title: 'Prompt created',
        status: 'success',
        duration: 3000,
      });
      onPromptModalClose();
      setNewPrompt({ name: '', description: '', is_active: false });
    },
    onError: (error) => {
      toast({
        title: 'Error creating prompt',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  });

  const updatePromptMutation = useMutation({
    mutationFn: async (prompt: Partial<Prompt>) => {
      const { data, error } = await supabase
        .from('prompts')
        .update(prompt)
        .eq('id', prompt.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast({
        title: 'Prompt updated',
        status: 'success',
        duration: 3000,
      });
      onPromptModalClose();
    },
    onError: (error) => {
      toast({
        title: 'Error updating prompt',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  });

  const deletePromptMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast({
        title: 'Prompt deleted',
        status: 'success',
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error deleting prompt',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  });

  const createVersionMutation = useMutation({
    mutationFn: async (version: Partial<PromptVersion>) => {
      const { data, error } = await supabase
        .from('prompt_versions')
        .insert(version)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast({
        title: 'Version created',
        status: 'success',
        duration: 3000,
      });
      onVersionModalClose();
      setNewVersion({ content: '', output_schema: {}, is_active: false });
    },
    onError: (error) => {
      toast({
        title: 'Error creating version',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  });

  const updateVersionMutation = useMutation({
    mutationFn: async (version: Partial<PromptVersion>) => {
      const { data, error } = await supabase
        .from('prompt_versions')
        .update(version)
        .eq('id', version.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast({
        title: 'Version updated',
        status: 'success',
        duration: 3000,
      });
      onVersionModalClose();
    },
    onError: (error) => {
      toast({
        title: 'Error updating version',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  });

  const deleteVersionMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('prompt_versions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast({
        title: 'Version deleted',
        status: 'success',
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error deleting version',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  });

  // Handlers
  const handleCreatePrompt = () => {
    createPromptMutation.mutate(newPrompt);
  };

  const handleUpdatePrompt = () => {
    if (selectedPrompt) {
      updatePromptMutation.mutate(selectedPrompt);
    }
  };

  const handleDeletePrompt = (id: string) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      deletePromptMutation.mutate(id);
    }
  };

  const handleCreateVersion = () => {
    if (selectedPrompt) {
      createVersionMutation.mutate({
        ...newVersion,
        prompt_id: selectedPrompt.id
      });
    }
  };

  const handleUpdateVersion = () => {
    if (selectedVersion) {
      updateVersionMutation.mutate(selectedVersion);
    }
  };

  const handleDeleteVersion = (id: string) => {
    if (window.confirm('Are you sure you want to delete this version?')) {
      deleteVersionMutation.mutate(id);
    }
  };

  const openPromptModal = (prompt?: Prompt) => {
    if (prompt) {
      setSelectedPrompt(prompt);
    } else {
      setSelectedPrompt(null);
      setNewPrompt({ name: '', description: '', is_active: false });
    }
    onPromptModalOpen();
  };

  const openVersionModal = (prompt: Prompt, version?: PromptVersion) => {
    setSelectedPrompt(prompt);
    if (version) {
      setSelectedVersion(version);
    } else {
      setSelectedVersion(null);
      setNewVersion({ content: '', output_schema: {}, is_active: false });
    }
    onVersionModalOpen();
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
        Error loading prompts: {(error as Error).message}
      </Alert>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">Prompt Templates</Heading>
        <Button colorScheme="blue" onClick={() => openPromptModal()}>
          Create New Prompt
        </Button>
      </Flex>

      {prompts && prompts.length > 0 ? (
        <Accordion allowMultiple>
          {prompts.map((prompt) => (
            <AccordionItem key={prompt.id}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Flex align="center">
                      <Text fontWeight="bold">{prompt.name}</Text>
                      {prompt.is_active && (
                        <Badge ml={2} colorScheme="green">Active</Badge>
                      )}
                    </Flex>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text mb={4}>{prompt.description}</Text>
                
                <HStack spacing={4} mb={4}>
                  <Button size="sm" colorScheme="blue" onClick={() => openPromptModal(prompt)}>
                    Edit Prompt
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDeletePrompt(prompt.id)}>
                    Delete Prompt
                  </Button>
                  <Button size="sm" colorScheme="green" onClick={() => openVersionModal(prompt)}>
                    Add Version
                  </Button>
                </HStack>
                
                <Divider my={4} />
                
                <Heading size="sm" mb={3}>Versions</Heading>
                
                {prompt.prompt_versions && prompt.prompt_versions.length > 0 ? (
                  <VStack align="stretch" spacing={4}>
                    {prompt.prompt_versions.map((version) => (
                      <Box 
                        key={version.id} 
                        p={4} 
                        borderWidth="1px" 
                        borderRadius="md"
                        borderColor={version.is_active ? "green.200" : "gray.200"}
                        bg={version.is_active ? "green.50" : "white"}
                      >
                        <Flex justify="space-between" align="center" mb={2}>
                          <Heading size="xs">Version {version.version}</Heading>
                          {version.is_active && (
                            <Badge colorScheme="green">Active</Badge>
                          )}
                        </Flex>
                        
                        <Text fontSize="sm" mb={3}>
                          Created: {new Date(version.created_at).toLocaleString()}
                        </Text>
                        
                        <Box mb={3}>
                          <Text fontWeight="bold" mb={1}>Prompt:</Text>
                          <Code p={2} borderRadius="md" fontSize="sm" whiteSpace="pre-wrap" display="block" bg="gray.50">
                            {version.content.length > 100 
                              ? `${version.content.substring(0, 100)}...` 
                              : version.content}
                          </Code>
                        </Box>
                        
                        <HStack spacing={2}>
                          <Button size="xs" onClick={() => openVersionModal(prompt, version)}>
                            Edit
                          </Button>
                          <Button size="xs" colorScheme="red" onClick={() => handleDeleteVersion(version.id)}>
                            Delete
                          </Button>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                ) : (
                  <Text color="gray.500">No versions created yet.</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Box p={6} textAlign="center" borderWidth="1px" borderRadius="lg">
          <Text mb={4}>No prompts have been created yet.</Text>
          <Button colorScheme="blue" onClick={() => openPromptModal()}>
            Create Your First Prompt
          </Button>
        </Box>
      )}

      {/* Prompt Modal */}
      <Modal isOpen={isPromptModalOpen} onClose={onPromptModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedPrompt ? 'Edit Prompt' : 'Create New Prompt'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                  value={selectedPrompt ? selectedPrompt.name : newPrompt.name}
                  onChange={(e) => {
                    if (selectedPrompt) {
                      setSelectedPrompt({...selectedPrompt, name: e.target.value});
                    } else {
                      setNewPrompt({...newPrompt, name: e.target.value});
                    }
                  }}
                  placeholder="Lease Analysis Prompt"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea 
                  value={selectedPrompt ? selectedPrompt.description : newPrompt.description || ''}
                  onChange={(e) => {
                    if (selectedPrompt) {
                      setSelectedPrompt({...selectedPrompt, description: e.target.value});
                    } else {
                      setNewPrompt({...newPrompt, description: e.target.value});
                    }
                  }}
                  placeholder="Analyzes lease agreements to extract key terms and provide insights"
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="is-active" mb="0">
                  Active
                </FormLabel>
                <Switch 
                  id="is-active"
                  isChecked={selectedPrompt ? selectedPrompt.is_active : newPrompt.is_active}
                  onChange={(e) => {
                    if (selectedPrompt) {
                      setSelectedPrompt({...selectedPrompt, is_active: e.target.checked});
                    } else {
                      setNewPrompt({...newPrompt, is_active: e.target.checked});
                    }
                  }}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onPromptModalClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={selectedPrompt ? handleUpdatePrompt : handleCreatePrompt}
              isLoading={createPromptMutation.isPending || updatePromptMutation.isPending}
            >
              {selectedPrompt ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Version Modal */}
      <Modal isOpen={isVersionModalOpen} onClose={onVersionModalClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="900px">
          <ModalHeader>
            {selectedVersion ? `Edit Version ${selectedVersion.version}` : 'Create New Version'}
            {selectedPrompt && ` for ${selectedPrompt.name}`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs index={editorTab} onChange={setEditorTab}>
              <TabList>
                <Tab>Prompt Template</Tab>
                <Tab>Output Schema</Tab>
                <Tab>Settings</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box height="400px" border="1px solid" borderColor="gray.200" borderRadius="md">
                    <Editor
                      height="100%"
                      defaultLanguage="markdown"
                      value={selectedVersion ? selectedVersion.content : newVersion.content as string}
                      onChange={(value) => {
                        if (selectedVersion) {
                          setSelectedVersion({...selectedVersion, content: value || ''});
                        } else {
                          setNewVersion({...newVersion, content: value || ''});
                        }
                      }}
                      options={{
                        minimap: { enabled: false },
                        wordWrap: 'on'
                      }}
                    />
                  </Box>
                  <Text mt={2} fontSize="sm" color="gray.600">
                    Use ${'{text}'} as a placeholder for the document text.
                  </Text>
                </TabPanel>
                <TabPanel>
                  <Box height="400px" border="1px solid" borderColor="gray.200" borderRadius="md">
                    <Editor
                      height="100%"
                      defaultLanguage="json"
                      value={
                        selectedVersion 
                          ? typeof selectedVersion.output_schema === 'string' 
                            ? selectedVersion.output_schema 
                            : JSON.stringify(selectedVersion.output_schema, null, 2)
                          : typeof newVersion.output_schema === 'string'
                            ? newVersion.output_schema
                            : JSON.stringify(newVersion.output_schema, null, 2)
                      }
                      onChange={(value) => {
                        try {
                          const parsedSchema = value ? JSON.parse(value) : {};
                          if (selectedVersion) {
                            setSelectedVersion({...selectedVersion, output_schema: parsedSchema});
                          } else {
                            setNewVersion({...newVersion, output_schema: parsedSchema});
                          }
                        } catch (e) {
                          // Allow invalid JSON during editing
                          if (selectedVersion) {
                            setSelectedVersion({...selectedVersion, output_schema: value || ''});
                          } else {
                            setNewVersion({...newVersion, output_schema: value || ''});
                          }
                        }
                      }}
                      options={{
                        minimap: { enabled: false }
                      }}
                    />
                  </Box>
                  <Text mt={2} fontSize="sm" color="gray.600">
                    Define the JSON schema for the expected output format.
                  </Text>
                </TabPanel>
                <TabPanel>
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel htmlFor="version-is-active" mb="0">
                      Active
                    </FormLabel>
                    <Switch 
                      id="version-is-active"
                      isChecked={selectedVersion ? selectedVersion.is_active : newVersion.is_active}
                      onChange={(e) => {
                        if (selectedVersion) {
                          setSelectedVersion({...selectedVersion, is_active: e.target.checked});
                        } else {
                          setNewVersion({...newVersion, is_active: e.target.checked});
                        }
                      }}
                    />
                  </FormControl>
                  <Text fontSize="sm" color="gray.600">
                    When a version is set as active, it will be used for processing documents.
                    Only one version per prompt can be active at a time.
                  </Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onVersionModalClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={selectedVersion ? handleUpdateVersion : handleCreateVersion}
              isLoading={createVersionMutation.isPending || updateVersionMutation.isPending}
              isDisabled={
                !selectedPrompt || 
                (selectedVersion ? !selectedVersion.content : !newVersion.content)
              }
            >
              {selectedVersion ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PromptManager;
