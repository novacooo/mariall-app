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
import { Navigate, useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { useDebouncedCallback } from 'use-debounce';
import validator from 'validator';
import PageTemplate from 'templates/PageTemplate';
import { useAppDispatch, useAppSelector } from 'app';
import { selectUserIsLogged, setUserInfo, setUserIsLogged, setUserJwtToken } from 'features/user/userSlice';
import { useAppToast, useErrorToast } from 'hooks';
import { useGetUserInfoLazyQuery, useLoginUserMutation } from 'graphql/generated/schema';
import { RoleType } from 'types';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accentColor } = useColorContext();
  const { t } = useTranslation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const adaptiveAccentColor = useColorModeValue(`${accentColor}.600`, `${accentColor}.200`);
  const isLogged = useAppSelector(selectUserIsLogged);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isPasswordCompleted, setIsPasswordCompleted] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isEmailCompleted, setIsEmailCompleted] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const appToast = useAppToast();
  const errorToast = useErrorToast();

  const [getUserInfo] = useGetUserInfoLazyQuery({
    onCompleted: ({ me }) => {
      if (!me || !me.id || !me.email || !me.role) return;

      dispatch(
        setUserInfo({
          id: me.id,
          email: me.email,
          role: me.role.name as RoleType,
          rememberCredentials: isRememberMeChecked,
        }),
      );
      dispatch(setUserIsLogged(true));

      navigate(routes.menu);
    },
    onError: (error) => {
      errorToast(error);
      setEmailValue('');
      setPasswordValue('');
    },
  });

  const [loginUser] = useLoginUserMutation({
    onCompleted: ({ login: { jwt } }) => {
      if (!jwt) return;
      dispatch(setUserJwtToken(jwt));
      void getUserInfo();
    },
    onError: () => {
      appToast({
        title: t('toasts.titles.incorrectLoginCredentials'),
        description: t('toasts.descriptions.incorrectLoginCredentials'),
        status: 'error',
      });

      setEmailValue('');
      setPasswordValue('');
    },
  });

  const signIn = async () => {
    setIsLoading(true);

    await loginUser({
      variables: {
        email: emailValue,
        password: passwordValue,
      },
    });

    setIsLoading(false);
  };

  const handleButtonClick = () => {
    if (emailValue === '') {
      setIsEmailCompleted(false);
      return;
    }

    if (!validator.isEmail(emailValue)) {
      setIsEmailValid(false);
      return;
    }

    if (passwordValue === '') {
      setIsPasswordCompleted(false);
      return;
    }

    void signIn();
  };

  const debouncedEmailCheck = useDebouncedCallback((value: string) => {
    setIsEmailValid(validator.isEmail(value));
    setIsEmailCompleted(value !== '');
  }, 1000);

  const debouncedPasswordCheck = useDebouncedCallback((value: string) => {
    setIsPasswordCompleted(value !== '');
  }, 1000);

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setEmailValue(value);

    setIsEmailCompleted(true);
    setIsEmailValid(true);

    debouncedEmailCheck(value);
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPasswordValue(e.target.value);

    setIsPasswordCompleted(true);

    debouncedPasswordCheck(value);
  };

  const handleCheckboxChange = () => {
    setIsRememberMeChecked((prev) => !prev);
  };

  const handleShowButtonClick = () => {
    setShowPassword((prevState) => !prevState);
  };

  if (isLogged) {
    return <Navigate to={routes.menu} replace />;
  }

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
        <Heading as="h3" size="md" textAlign="center" color={adaptiveAccentColor}>
          {t('headers.signIn')}
        </Heading>
        <FormControl isRequired isInvalid={!isEmailValid || !isEmailCompleted}>
          <FormLabel htmlFor="email">{t('inputs.email')}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <FiMail />
            </InputLeftElement>
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
          {(!isEmailCompleted || !isEmailValid) && (
            <FormErrorMessage>
              {!isEmailCompleted ? t('errors.notCompletedEmail') : t('errors.invalidEmail')}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={!isPasswordCompleted}>
          <FormLabel htmlFor="password">{t('inputs.password')}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <FiLock />
            </InputLeftElement>
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
              <Tooltip label={showPassword ? t('tooltips.hidePassword') : t('tooltips.showPassword')}>
                <IconButton
                  size="sm"
                  variant="ghost"
                  isRound
                  aria-label={t('tooltips.changeApp')}
                  color="gray.500"
                  icon={showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  onClick={handleShowButtonClick}
                />
              </Tooltip>
            </InputRightElement>
          </InputGroup>
          {!isPasswordCompleted && <FormErrorMessage>{t('errors.notCompletedPassword')}</FormErrorMessage>}
        </FormControl>
        <Checkbox
          colorScheme={accentColor}
          mx={2}
          my={2}
          isChecked={isRememberMeChecked}
          onChange={handleCheckboxChange}
        >
          {t('checkboxes.rememberPassword')}
        </Checkbox>
        <Button
          mx={2}
          onClick={handleButtonClick}
          colorScheme={accentColor}
          type="submit"
          isLoading={isLoading}
          loadingText={t('loadingTexts.signInButton')}
        >
          {t('buttons.signIn')}
        </Button>
      </Flex>
    </PageTemplate>
  );
};

export default LoginPage;
