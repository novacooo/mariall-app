import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface ButtonsWrapperProps {
  children: ReactNode;
}

const ButtonsWrapper = ({ children }: ButtonsWrapperProps) => (
  <Flex
    wrap="wrap"
    gap={{
      base: 3,
      md: 4,
    }}
    direction={{
      base: 'column',
      md: 'row',
    }}
  >
    {children}
  </Flex>
);

export default ButtonsWrapper;
