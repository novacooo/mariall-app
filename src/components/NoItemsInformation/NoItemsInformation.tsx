import { Center, Heading, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiDatabase } from 'react-icons/fi';

interface NoItemsInformationProps {
  text: string;
}

const NoItemsInformation = ({ text }: NoItemsInformationProps) => {
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const bgColorIcon = useColorModeValue('gray.200', 'gray.700');
  const color = useColorModeValue('gray.500', 'gray.400');

  return (
    <Center flexDirection="column" gap={6} py={12} px={4} bgColor={bgColor} rounded="md">
      <Center w={28} h={28} bgColor={bgColorIcon} rounded="full">
        <Icon boxSize={10} as={FiDatabase} color={color} />
      </Center>
      <Heading as="h4" size="md" textAlign="center" color={color}>
        {text}
      </Heading>
    </Center>
  );
};

export default NoItemsInformation;
