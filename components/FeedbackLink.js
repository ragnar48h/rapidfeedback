import { Flex, Link } from '@chakra-ui/core';

export default function FeedbackLink({siteId}) {
  return (
    <Flex
      justifyContent="space-between"
      mb={8}
      width="full"
      mt={1}
    >
      <Link
        fontWeight="bold"
        fontSize="sm"
        href={`/p/${siteId}`}
        target="_blank"
      >
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="gray.500" href="/" target="_blank">
        Powered by Fast Feedback
      </Link>
    </Flex>
  );
}