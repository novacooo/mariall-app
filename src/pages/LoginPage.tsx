import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  StackDivider,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import MainTemplate from 'templates/MainTemplate';
import { ReactComponent as LogoLight } from 'assets/logo_light.svg';
import { ReactComponent as LogoDark } from 'assets/logo_dark.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const { accentColor } = useColorContext();
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const bgColor = useColorModeValue('white', 'gray.800');
  const { colorMode } = useColorMode();

  const logoHeight = 44;

  const handleButtonClick = () => {
    navigate(routes.menu);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <MainTemplate>
      <VStack flexGrow={1} p={16} gap={10}>
        <HStack spacing={5} divider={<StackDivider />}>
          {colorMode === 'light' ? (
            <LogoLight height={logoHeight} />
          ) : (
            <LogoDark height={logoHeight} />
          )}
          <Heading as="h3" size="md" fontWeight="normal">
            {t('headers.signIn')}
          </Heading>
        </HStack>
        {/* TODO: Use formik for submitting */}
        <Flex
          direction="column"
          gap={4}
          p={6}
          borderWidth={1}
          rounded="md"
          bgColor={bgColor}
          width="340px"
        >
          <Heading as="h3" size="md" textAlign="center">
            {t('headers.signIn')}
          </Heading>
          <FormControl isRequired>
            <FormLabel htmlFor="email">{t('inputs.email')}</FormLabel>
            <Input
              id="email"
              type="email"
              value={input}
              placeholder={t('inputs.email')}
              onChange={handleInputChange}
              variant="filled"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">{t('inputs.password')}</FormLabel>
            <Input
              id="password"
              type="password"
              value={input}
              placeholder={t('inputs.password')}
              onChange={handleInputChange}
              variant="filled"
            />
          </FormControl>
          <Button
            mt={3}
            mx={6}
            onClick={handleButtonClick}
            colorScheme={accentColor}
            type="submit"
          >
            {t('buttons.signIn')}
          </Button>
        </Flex>
      </VStack>
    </MainTemplate>
  );
};

export default LoginPage;
