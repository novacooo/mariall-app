import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { useDebouncedCallback } from 'use-debounce';
import validator from 'validator';
import PageTemplate from 'templates/PageTemplate';

const LoginPage = () => {
  const navigate = useNavigate();
  const { accentColor } = useColorContext();
  const { t } = useTranslation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const adaptiveAccentColor = useColorModeValue(
    `${accentColor}.600`,
    `${accentColor}.200`,
  );

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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
    <PageTemplate name={t('pagesHeaders.signIn')}>
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
          color={adaptiveAccentColor}
        >
          {t('headers.signIn')}
        </Heading>
        <FormControl isRequired isInvalid={!isEmailValid}>
          <FormLabel htmlFor="email">{t('inputs.email')}</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.500"
              children={<FiMail />}
            />
            <Input
              id="email"
              type="email"
              focusBorderColor={adaptiveAccentColor}
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
          <FormLabel htmlFor="password">{t('inputs.password')}</FormLabel>
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
              focusBorderColor={adaptiveAccentColor}
              variant="filled"
            />
            <InputRightElement zIndex={0}>
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
                    showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />
                  }
                  onClick={handleShowButtonClick}
                />
              </Tooltip>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Checkbox colorScheme={accentColor} mx={2} my={2}>
          {t('checkboxes.rememberPassword')}
        </Checkbox>
        <Button
          mx={2}
          onClick={handleButtonClick}
          colorScheme={accentColor}
          type="submit"
        >
          {t('buttons.signIn')}
        </Button>
      </Flex>
    </PageTemplate>
  );
};

export default LoginPage;
