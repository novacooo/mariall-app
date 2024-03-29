import { Flex, Heading, HStack, Text, StackDivider, useColorMode, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LogoLight } from 'assets/vectors/logo_light.svg';
import { ReactComponent as LogoDark } from 'assets/vectors/logo_dark.svg';
import LanguageButton from 'components/LanguageButton/LanguageButton';
import ColorButton from 'components/ColorButton/ColorButton';
import ColorModeButton from 'components/ColorModeButton/ColorModeButton';
import UserButton from 'components/UserButton/UserButton';
import { ReactNode } from 'react';
import { selectUserIsLogged } from 'features/user/userSlice';
import { useAppSelector } from 'hooks';

interface PageTemplateProps {
  name: string;
  children: ReactNode;
}

const PageTemplate = ({ name, children }: PageTemplateProps) => {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const isLogged = useAppSelector(selectUserIsLogged);

  const logoHeight = 42;

  return (
    <VStack flexGrow={1} px={[4, 10, 10, 16]} pt={[8, 12, 16, 20]} pb={8} spacing={[8, 10, 12, 14]}>
      <HStack spacing={5} divider={<StackDivider />}>
        {colorMode === 'light' ? <LogoLight height={logoHeight} /> : <LogoDark height={logoHeight} />}
        <Heading as="h2" size="md">
          {name}
        </Heading>
      </HStack>
      <Flex gap={3} wrap="wrap" justify="center">
        <LanguageButton />
        <ColorButton />
        <ColorModeButton />
        {isLogged && <UserButton />}
      </Flex>
      <Flex w="full" direction="column" flexGrow={1} align="center">
        {children}
      </Flex>
      <Text align="center" fontSize="xs">
        {t('copyright')}
      </Text>
    </VStack>
  );
};

export default PageTemplate;
