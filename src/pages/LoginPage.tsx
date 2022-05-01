import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  StackDivider,
  Tooltip,
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
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { useDebouncedCallback } from 'use-debounce';
import validator from 'validator';

const LoginPage = () => {
  const navigate = useNavigate();
  const { accentColor } = useColorContext();
  const { t } = useTranslation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const { colorMode } = useColorMode();

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const logoHeight = 42;

  const handleButtonClick = () => {
    navigate(routes.menu);
  };

  const debouncedCheck = useDebouncedCallback((value) => {
    setIsEmailValid(validator.isEmail(value));
  }, 500);

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmailValue(value);
    setIsEmailValid(true);
    debouncedCheck(value);
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordValue(e.target.value);
  };

  const handleShowButtonClick = () => {
    setShowPassword((prevState) => !prevState);
  };

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
            {t('headers.signIn')}
          </Heading>
        </HStack>
        {/* TODO: Use formik for submitting */}
        <Flex w="full" direction="column" flexGrow={1} align="center">
          <Flex
            direction="column"
            gap={4}
            p={6}
            borderWidth={1}
            rounded="md"
            bgColor={bgColor}
            w={['100%', '80%', '60%', '48%', '36%', '20%']}
          >
            <Heading
              as="h3"
              size="md"
              textAlign="center"
              color={accentColor}
              fontWeight="medium"
            >
              {t('headers.signIn')}
            </Heading>
            <FormControl isRequired isInvalid={!isEmailValid}>
              <FormLabel htmlFor="email" fontWeight="normal">
                {t('inputs.email')}
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.500"
                  children={<FiMail />}
                />
                <Input
                  id="email"
                  type="email"
                  value={emailValue}
                  placeholder={t('inputs.email')}
                  onChange={handleEmailInputChange}
                  variant="filled"
                />
              </InputGroup>
              {!isEmailValid && (
                <FormErrorMessage>{t('errors.invalidEmail')}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password" fontWeight="normal">
                {t('inputs.password')}
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.500"
                  children={<FiLock />}
                />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordValue}
                  placeholder={t('inputs.password')}
                  onChange={handlePasswordInputChange}
                  variant="filled"
                />
                <InputRightElement>
                  <Tooltip
                    label={
                      showPassword
                        ? t('tooltips.hidePassword')
                        : t('tooltips.showPassword')
                    }
                  >
                    <IconButton
                      size="sm"
                      variant="ghost"
                      isRound
                      aria-label={t('tooltips.changeApp')}
                      color="gray.500"
                      icon={
                        showPassword ? (
                          <FiEyeOff size={16} />
                        ) : (
                          <FiEye size={16} />
                        )
                      }
                      onClick={handleShowButtonClick}
                    />
                  </Tooltip>
                </InputRightElement>
              </InputGroup>
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
        </Flex>
        <Text align="center" fontSize="xs">
          {t('copyright')}
        </Text>
      </VStack>
    </MainTemplate>
  );
};

export default LoginPage;
