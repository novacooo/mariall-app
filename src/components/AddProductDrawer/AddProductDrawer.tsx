import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import ProductForm, { IProductValues } from 'components/ProductForm/ProductForm';
import { GetProductsDocument, useCreateProductMutation, useUploadFileMutation } from 'graphql/generated/schema';
import { getErrorMessage } from 'helpers';
import { useAppToast, useErrorToast } from 'hooks';
import { useLogger } from 'hooks/useLogger';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AddProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialProductValues: IProductValues = {
  productValueActive: true,
  productValueName: '',
  productValueCode: '',
  productValuePrice: 0,
};

const AddProductDrawer = ({ isOpen, onClose }: AddProductDrawerProps) => {
  const { t } = useTranslation();
  const appToast = useAppToast();
  const errorToast = useErrorToast();
  const logger = useLogger();

  const [isSending, setIsSending] = useState<boolean>();

  const [uploadFile] = useUploadFileMutation({
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się wgrać zdjęcia. Error: ${getErrorMessage(error)}`);
    },
  });

  const [createProduct] = useCreateProductMutation({
    refetchQueries: [GetProductsDocument],
    onCompleted: (data) => {
      appToast({
        title: t('toasts.titles.createProductSuccess'),
        description: t('toasts.descriptions.createProductSuccess'),
      });
      logger.sendInfoLog(`Utworzono produkt ID: ${data.createProduct?.data?.id || ''}`);
    },
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się utworzyć produktu. Error: ${getErrorMessage(error)}`);
    },
  });

  const handleSubmit = async (values: IProductValues) => {
    const { productValueActive, productValueName, productValueCode, productValuePrice, productValueImage } = values;

    let imageId;

    setIsSending(true);

    if (productValueImage) {
      const uploadFileResponse = await uploadFile({ variables: { file: productValueImage } });
      imageId = uploadFileResponse.data?.upload.data?.id;
    }

    await createProduct({
      variables: {
        code: productValueCode,
        name: productValueName,
        image: imageId,
        price: productValuePrice,
        active: productValueActive,
      },
    });

    setIsSending(false);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t('drawers.headers.addProduct')}</DrawerHeader>
        <DrawerBody>
          <ProductForm
            initialProductValues={initialProductValues}
            onSubmit={handleSubmit}
            isLoadingSaveButton={isSending}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddProductDrawer;
