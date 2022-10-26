import { HStack, useColorModeValue, Text, Show } from '@chakra-ui/react';

import { Enum_Log_Type } from 'graphql/generated/schema';
import { LogType } from 'types/LogType';

interface LogRowProps {
  date: Date;
  type: LogType;
  description: string;
  email: string;
}

const getBgColorFromType = (type: LogType) => {
  if (type === Enum_Log_Type.Info) return ['gray.100', 'gray.800'];
  if (type === Enum_Log_Type.Warning) return ['yellow.200', 'yellow.900'];
  return ['red.400', 'red.900'];
};

const getHoverBgColorFromType = (type: LogType) => {
  if (type === Enum_Log_Type.Info) return ['gray.200', 'gray.700'];
  if (type === Enum_Log_Type.Warning) return ['yellow.300', 'yellow.700'];
  return ['red.500', 'red.700'];
};

const getPrimaryTextColorFromType = (type: LogType) => {
  if (type === Enum_Log_Type.Error) return ['white', 'white'];
  return ['black', 'gray.100'];
};

const getSecondaryTextColorFromType = (type: LogType) => {
  if (type === Enum_Log_Type.Error) return ['white', 'gray.300'];
  return ['gray.600', 'gray.400'];
};

const LogRow = ({ date, type, description, email }: LogRowProps) => {
  const [lightBgColor, darkBgColor] = getBgColorFromType(type);
  const [lightHoverBgColor, darHoverBgColor] = getHoverBgColorFromType(type);
  const [lightPrimaryTextColor, darkPrimaryTextColor] = getPrimaryTextColorFromType(type);
  const [lightSecondaryTextColor, darkSecondaryTextColor] = getSecondaryTextColorFromType(type);

  const bgColor = useColorModeValue(lightBgColor, darkBgColor);
  const hoverBgColor = useColorModeValue(lightHoverBgColor, darHoverBgColor);
  const primaryTextColor = useColorModeValue(lightPrimaryTextColor, darkPrimaryTextColor);
  const secondaryTextColor = useColorModeValue(lightSecondaryTextColor, darkSecondaryTextColor);

  const formattedDate = date.toLocaleString();

  return (
    <HStack
      bgColor={bgColor}
      py={1}
      px={4}
      w="full"
      justify="space-between"
      rounded="md"
      _hover={{ bgColor: hoverBgColor }}
    >
      <HStack spacing={4}>
        <Show above="md">
          <Text display="none" noOfLines={1} fontSize="xs" flexShrink={0} color={secondaryTextColor}>
            {formattedDate}
          </Text>
        </Show>
        <Text noOfLines={2} fontSize="xs" color={primaryTextColor} fontWeight="semibold">
          {description}
        </Text>
      </HStack>
      <Text noOfLines={1} fontSize="xs" color={secondaryTextColor} flexShrink={0}>
        {email}
      </Text>
    </HStack>
  );
};

export default LogRow;
