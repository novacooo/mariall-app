import {
  Flex,
  Heading,
  HStack,
  Text,
  StackDivider,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LogoLight } from 'assets/logo_light.svg';
import { ReactComponent as LogoDark } from 'assets/logo_dark.svg';
import MainTemplate from './MainTemplate';

interface PageTemplateProps {
  name: string;
  children: React.ReactNode;
}

const PageTemplate = ({ name, children }: PageTemplateProps) => {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  const logoHeight = 42;

  return (
    <MainTemplate>
      <VStack
        flexGrow={1}
        px={[5, 10, 10, 16]}
        pt={[8, 12, 16, 20]}
        pb={8}
        gap={[8, 12, 16, 20]}
      >
        <HStack spacing={5} divider={<StackDivider />}>
          {colorMode === 'light' ? (
            <LogoLight height={logoHeight} />
          ) : (
            <LogoDark height={logoHeight} />
          )}
          <Heading as="h3" size="md" fontWeight="normal">
            {name}
          </Heading>
        </HStack>
        <Flex w="full" direction="column" flexGrow={1} align="center">
          {children}
        </Flex>
        <Text align="center" fontSize="xs">
          {t('copyright')}
        </Text>
      </VStack>
    </MainTemplate>
  );
};

export default PageTemplate;
