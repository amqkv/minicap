import { Box, Stack, Text, ButtonGroup, IconButton } from '@chakra-ui/react';
import { PhoneIcon, EmailIcon, QuestionIcon } from '@chakra-ui/icons';
import * as React from 'react';
import Logo from '@frontend/components/navigation/logo';
import { WEBSITE_NAME } from '@frontend/utils/constants';

export default function Footer() {
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
      <Stack>
        <Stack direction="row" spacing="4" align="center" justify="space-between">
          <Logo />
          <ButtonGroup variant="ghost" color="gray.600">
            <IconButton
              as="a"
              href="#"
              aria-label="Phone Number"
              icon={<PhoneIcon fontSize="20px" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Email Us"
              icon={<EmailIcon fontSize="20px" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Contact us"
              icon={<QuestionIcon fontSize="20px" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" alignSelf={{ base: 'center', sm: 'start' }}>
          &copy; {new Date().getFullYear()} {WEBSITE_NAME}. All rights reserved.
        </Text>
      </Stack>
    </Box>
  );
}
