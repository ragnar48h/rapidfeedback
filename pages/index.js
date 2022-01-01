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
      maxW='400px'
      margin='0 auto'
    >
        <Head>
          <title>Fabulous Feedback</title>
          <script dangerouslySetInnerHTML={{ __html: `
            if (document.cookie && document.cookie.includes('fabulous-feedback-auth')) {
              window.location.href = "/dashboard"
            }
          ` }} />
        </Head>

        <Icon name='logo' color='black' size='64px'/>
        <Text mb={4}>
          <Text as='span' fontWeight="bold" display="inline">Fabulous Feedback</Text>
          {' is the easiest way to add comments to your site without worrying about developing it from scratch.'}
        </Text>
        {auth.user ? (
          <Button mt={4} size='sm' as="a" href="/dashboard">View Dashboard</Button>
          ) : (
          <Button mt={4} size='sm' onClick={(e) => auth.signinWithGithub()}>Sign In</Button>
        )}
    </Flex>
  )
}
