import { Button, Code, Flex, Heading, Icon, Text } from '@chakra-ui/core';
import Head from 'next/head'

import { useAuth } from '@/lib/auth'

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as='main'
      direction='column'
      align='center'
      justify='center'
      h='100vh'
    >
        <Head>
          <title>Fabulous Feedback</title>
        </Head>

        <Icon name='logo' color='black' size='64px'/>
        {auth.user ? (
          <Button mt={4} size='sm' as="a" href="/dashboard">View Dashboard</Button>
          ) : (
          <Button mt={4} size='sm' onClick={(e) => auth.signinWithGithub()}>Sign In</Button>
        )}
    </Flex>
  )
}
