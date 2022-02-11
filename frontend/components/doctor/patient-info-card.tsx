import { StarIcon } from '@chakra-ui/icons';
import { Box, Badge, Image, Divider } from '@chakra-ui/react';

export default function PatientInfoCard() {
  const property = {
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {property.title}
        </Box>
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>
        <Divider />

        {/* <Box>
          {property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box> */}

        {/* <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon key={i} color={i < property.rating ? 'teal.500' : 'gray.300'} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}
