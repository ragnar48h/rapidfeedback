import React from 'react'
import {
  Flex,
  Link,
  Stack,
  Icon,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
  Text,
  Button
} from '@chakra-ui/core'

import { useAuth } from '@/lib/auth'
import AddSiteModal from './AddSiteModal'

const DashboardShell = ({children}) => {
    const auth = useAuth()
    return (
        <Flex flexDirection="column">
          <Flex
            flexDirection="row"
            backgroundColor="white"
            justifyContent="space-between"
            py={4}
            px={8}
          >
            <Stack spacing={4} isInline alignItems="center">
              <Icon name='logo' color='black' size='24px'/>
              <Link>Feedback</Link>
              <Link>Sites</Link>
            </Stack>
            <Flex alignItems="center">
              <Link mr={4} onClick={(e) => auth.signout()}>Log Out</Link>
              <Avatar size="sm" src={auth.user?.photoUrl}/>
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            backgroundColor="gray.50"
            p={8}
            height="100vh"
          >
            <Flex
              flexDirection="column"
              maxWidth="1250px"
              w='100%'
              alignItems="flex-start"
              justifyContent="center"
              m="0 auto"
            >
              <Breadcrumb>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink color="gray.700" fontSize="sm">Sites</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Flex justifyContent="space-between" w='100%'>
                <Heading mb={4}>Sites</Heading>
                <AddSiteModal>
                  + Add Site
                </AddSiteModal>
              </Flex>
              {children}
            </Flex>
          </Flex>
        </Flex>
    )
}
export default DashboardShell