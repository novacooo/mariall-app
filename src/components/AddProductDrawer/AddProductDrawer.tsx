import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import ProductForm, { IProductValues } from 'components/ProductForm/ProductForm';
import { GetProductsDocument, useCreateProductMutation, useUploadFileMutation } from 'graphql/generated/schema';
import { useAppToast, useErrorToast } from 'hooks';
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

  const [isSending, setIsSending] = useState<boolean>();

  const [uploadFile] = useUploadFileMutation({
    onError: (error) => errorToast(error),
  });

  const [createProduct] = useCreateProductMutation({
    refetchQueries: [GetProductsDocument],
    onCompleted: () => {
      appToast({
        title: t('toasts.titles.quantitiesAddSuccess'),
        description: t('toasts.descriptions.quantitiesAddSuccess'),
      });
    },
    onError: (error) => {
      errorToast(error);
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
        <DrawerHeader>{t('drawers.headers.addingProduct')}</DrawerHeader>
        <DrawerBody>
          <ProductForm
            initialProductValues={initialProductValues}
            onSubmit={handleSubmit}
            isLoadingSaveButton={isSending}
          />
        </DrawerBody>
        <DrawerFooter flexDirection="column" alignItems="stretch" gap={4} />
      </DrawerContent>
    </Drawer>
  );
};

export default AddProductDrawer;
