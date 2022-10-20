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
import { FormEvent, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { useDebouncedCallback } from 'use-debounce';
import validator from 'validator';
import PageTemplate from 'templates/PageTemplate';
import { selectUserIsLogged, setUserInfo, setUserIsLogged, setUserJwtToken } from 'features/user/userSlice';
import { useAppDispatch, useAppSelector, useAppToast, useErrorToast } from 'hooks';
import { useGetUserInfoLazyQuery, useLoginUserMutation } from 'graphql/generated/schema';
import { RoleType } from 'types';
import { selectThemeAccentColor } from 'features/theme/themeSlice';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isLogged = useAppSelector(selectUserIsLogged);
  const themeAccentColor = useAppSelector(selectThemeAccentColor);

  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isPasswordCompleted, setIsPasswordCompleted] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isEmailCompleted, setIsEmailCompleted] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailId = useId();
  const passwordId = useId();

  const appToast = useAppToast();
  const errorToast = useErrorToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const adaptiveAccentColor = useColorModeValue(`${themeAccentColor}.600`, `${themeAccentColor}.200`);

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

  const handleButtonSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleButtonClick();
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
        as="form"
        noValidate
        direction="column"
        gap={4}
        p={6}
        borderWidth={1}
        rounded="md"
        bgColor={bgColor}
        w={['100%', '80%', '60%', '48%', '36%', '20%']}
      >
        <Heading as="h1" size="md" textAlign="center" color={adaptiveAccentColor}>
          {t('headers.signIn')}
        </Heading>
        <FormControl isRequired isInvalid={!isEmailValid || !isEmailCompleted}>
          <FormLabel htmlFor={emailId}>{t('inputs.email')}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <FiMail />
            </InputLeftElement>
            <Input
              id={emailId}
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
          <FormLabel htmlFor={passwordId}>{t('inputs.password')}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.500">
              <FiLock />
            </InputLeftElement>
            <Input
              id={passwordId}
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
          colorScheme={themeAccentColor}
          mx={2}
          my={2}
          isChecked={isRememberMeChecked}
          onChange={handleCheckboxChange}
        >
          {t('checkboxes.rememberPassword')}
        </Checkbox>
        <Button
          mx={2}
          type="submit"
          colorScheme={themeAccentColor}
          isLoading={isLoading}
          loadingText={t('loading.signInButton')}
          onClick={handleButtonClick}
          onSubmit={handleButtonSubmit}
        >
          {t('buttons.signIn')}
        </Button>
      </Flex>
    </PageTemplate>
  );
};

export default LoginPage;
