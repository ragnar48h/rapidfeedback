import { useRef } from 'react'
import {
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
    useDisclosure,
    Button,
    useToast
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'

import { createSite } from '@/lib/db'
import { useAuth } from '@/lib/auth'
import { mutate } from 'swr'

export default function AddSiteModal({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef()
    const {handleSubmit, register} = useForm()
    const toast = useToast()
    const auth = useAuth()

    const onCreateSite = ({name, url}) => {
      const newSite = {
        authorId: auth.user.uid,
        createdAt: new Date().toISOString(),
        name,
        url
      }

      createSite(newSite)
      toast({
        title: 'Success!',
        description: "We've added your site.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      mutate('/api/sites', async (data) => {
        return {sites: [...data.sites, newSite]}
      }, false)
      onClose()
    }

    return (
      <>
        <Button
          backgroundColor='gray.900'
          color='white'
          fontWeight='medium'
          _hover={{bg: 'gray.700'}}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
          onClick={onOpen}
        >
          {children}
        </Button>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
            <ModalHeader fontWeight="bold">Add Site</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input 
                    ref={initialRef} 
                    placeholder='My Site' 
                    {...register("name", {required: true})}
                />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Link</FormLabel>
                <Input 
                    placeholder='https://website.com' 
                    {...register("url", {required: true})}
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={onClose} mr={3} fontWeight="medium">Cancel</Button>
              <Button type="submit" backgroundColor='#99FFFE' color="#194D4C" fontWeight="medium">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }