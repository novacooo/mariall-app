import { Flex, IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react';
import PlaceholderImage from 'assets/images/placeholder.jpg';
import { checkIsFileImage } from 'helpers';
import { FiTrash2 } from 'react-icons/fi';

interface FileUploadIndicatorProps {
  file: File;
  error?: string;
  onTrashButtonClick?: () => void;
}

const FileUploadIndicator = ({ file, error, onTrashButtonClick }: FileUploadIndicatorProps) => {
  const bgColor = useColorModeValue('green.50', 'green.800');
  const bgColorError = useColorModeValue('red.50', 'red.800');
  const borderColor = useColorModeValue('green.200', 'green.500');
  const borderColorError = useColorModeValue('red.200', 'red.500');
  const textColor = useColorModeValue('green.500', 'green.100');
  const textColorError = useColorModeValue('red.500', 'red.100');

  const getImage = () => {
    if (checkIsFileImage(file)) return URL.createObjectURL(file);
    return PlaceholderImage;
  };

  const image = getImage();

  return (
    <Flex
      justify="space-between"
      align="center"
      gap={3}
      p={3}
      w="full"
      bgColor={error ? bgColorError : bgColor}
      rounded="md"
      borderWidth={1}
      borderColor={error ? borderColorError : borderColor}
    >
      <Flex align="center" gap={3}>
        <Image w={16} h={16} rounded="md" alt={file.name} objectFit="cover" src={image} />
        <Flex direction="column">
          <Text noOfLines={2} fontSize="sm" fontWeight="semibold" color={error ? textColorError : textColor}>
            {file.name}
          </Text>
          {error && (
            <Text fontSize="sm" color={textColorError}>
              {error}
            </Text>
          )}
        </Flex>
      </Flex>
      {onTrashButtonClick && (
        <IconButton aria-label="Trash button" icon={<FiTrash2 />} size="sm" onClick={onTrashButtonClick} />
      )}
    </Flex>
  );
};

export default FileUploadIndicator;
