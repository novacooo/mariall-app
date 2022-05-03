import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useColorContext } from 'contexts/ColorContext';
import { useEffect, useState } from 'react';

interface IWorkerData {
  id: string;
  name: string;
}

const workers: IWorkerData[] = [
  {
    id: 'worker-01',
    name: 'Jan Kowalski',
  },
  {
    id: 'worker-02',
    name: 'Jacek Nowak',
  },
  {
    id: 'worker-03',
    name: 'Krzysztof Bąkowski',
  },
];

const getWorkers = (succed: boolean) => {
  return new Promise<IWorkerData[]>((resolve, reject) => {
    setTimeout(() => {
      if (!succed) reject(new Error('Failed to fetch workers data.'));
      resolve(workers);
    }, 1000);
  });
};

const AddingQuantityTab = () => {
  const [workersData, setWorkersData] = useState<IWorkerData[] | undefined>();
  const [selectedWorker, setSelectedWorker] = useState<string>();
  const { accentColor } = useColorContext();

  const toast = useToast();

  const fetchWorkersData = async () => {
    try {
      const data = await getWorkers(true);
      setWorkersData(data);
    } catch (err) {
      toast({
        title: 'An error occured',
        description: `${err}`,
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchWorkersData();
  });

  return (
    <div>
      {workersData ? (
        <FormControl>
          <FormLabel htmlFor="country">Wybierz pracownika:</FormLabel>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              colorScheme={selectedWorker ? accentColor : undefined}
            >
              {selectedWorker || 'Wybierz pracownika'}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup defaultValue={workers[0].id} type="radio">
                {workers.map(({ id, name }) => (
                  <MenuItemOption
                    key={id}
                    value={id}
                    onClick={() => setSelectedWorker(name)}
                  >
                    {name}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </FormControl>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default AddingQuantityTab;
