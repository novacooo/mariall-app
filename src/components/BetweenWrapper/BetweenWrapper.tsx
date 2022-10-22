import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface BetweenWrapperProps {
  children: ReactNode;
}

const BetweenWrapper = ({ children }: BetweenWrapperProps) => (
  <Flex
    justify="space-between"
    gap={{
      base: 3,
      md: 4,
    }}
    direction={{
      base: 'column',
      md: 'row',
    }}
    wrap="wrap"
  >
    {children}
  </Flex>
);

export default BetweenWrapper;
