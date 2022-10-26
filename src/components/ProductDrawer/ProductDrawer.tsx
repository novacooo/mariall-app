import { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiTrash2 } from 'react-icons/fi';

import { useAppToast, useErrorToast } from 'hooks';
import { useDeleteProductMutation, useUpdateProductMutation, useUploadFileMutation } from 'graphql/generated/schema';
import DeleteProductModal from 'components/DeleteProductModal/DeleteProductModal';
import ProductForm, { IProductValues } from 'components/ProductForm/ProductForm';
import { useLogger } from 'hooks/useLogger';
import { getErrorMessage } from 'helpers';

export interface IDrawerProduct {
  id: string;
  code: string;
  name: string;
  price: number;
  active: boolean;
  imageUrl?: string;
}

interface ProductDrawerProps {
  product: IDrawerProduct | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDrawer = ({ product, isOpen, onClose }: ProductDrawerProps) => {
  const { t } = useTranslation();
  const appToast = useAppToast();
  const errorToast = useErrorToast();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const logger = useLogger();

  const [isSending, setIsSending] = useState<boolean>();
  const [isDeleting, setIsDeleting] = useState<boolean>();

  const [uploadFile] = useUploadFileMutation({
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się wgrać zdjęcia. Error: ${getErrorMessage(error)}`);
    },
  });

  const [updateProduct] = useUpdateProductMutation({
    onCompleted: (data) => {
      appToast({
        title: t('toasts.titles.updateProductSuccess'),
        description: t('toasts.descriptions.updateProductSuccess'),
      });
      logger.sendInfoLog(`Zaktualizowano produkt o ID: ${data.updateProduct?.data?.id || ''}`);
    },
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się zaktualizować zdjęcia. Error: ${getErrorMessage(error)}`);
    },
  });

  const [deleteProduct] = useDeleteProductMutation({
    onCompleted: (data) => {
      appToast({
        title: t('toasts.titles.deleteProductSuccess'),
        description: t('toasts.descriptions.deleteProductSuccess'),
      });
      logger.sendInfoLog(`Usunięto produkt o ID: ${data.updateProduct?.data?.id || ''}`);
    },
    onError: (error) => {
      errorToast(error);
      logger.sendErrorLog(`Nie udało się usunąć produktu. Error: ${getErrorMessage(error)}`);
    },
  });

  const initialProductValues: IProductValues = {
    productValueActive: product ? product.active : false,
    productValueName: product ? product.name : '',
    productValueCode: product ? product.code : '',
    productValuePrice: product ? product.price : 0,
  };

  const sendUpdateProduct = async (values: IProductValues) => {
    if (!product) return;

    const { productValueActive, productValueName, productValueCode, productValuePrice, productValueImage } = values;

    let imageId;

    setIsSending(true);

    if (productValueImage) {
      const uploadFileResponse = await uploadFile({ variables: { file: productValueImage } });
      imageId = uploadFileResponse.data?.upload.data?.id;
    }

    await updateProduct({
      variables: {
        id: product.id,
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

  const sendDeleteProduct = async () => {
    if (!product) return;

    setIsDeleting(true);

    await deleteProduct({
      variables: {
        id: product.id,
      },
    });

    setIsDeleting(false);
    onDeleteModalClose();
    onClose();
  };

  const handleDeleteButtonClick = () => {
    onDeleteModalOpen();
  };

  const handleModalDeleteButtonClick = () => {
    void sendDeleteProduct();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t('drawers.headers.editProduct')}</DrawerHeader>
        {product ? (
          <>
            <DrawerBody>
              <ProductForm
                initialProductValues={initialProductValues}
                product={product}
                onSubmit={sendUpdateProduct}
                isLoadingSaveButton={isSending}
              />
            </DrawerBody>
            <DrawerFooter flexDirection="column" alignItems="stretch" gap={4}>
              <Button rightIcon={<FiTrash2 />} colorScheme="red" variant="ghost" onClick={handleDeleteButtonClick}>
                {t('buttons.deleteProduct')}
              </Button>
            </DrawerFooter>
          </>
        ) : (
          <DrawerBody>
            <Spinner />
          </DrawerBody>
        )}
      </DrawerContent>
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        isLoading={isDeleting}
        onClose={onDeleteModalClose}
        onDeleteButtonClick={handleModalDeleteButtonClick}
      />
    </Drawer>
  );
};

export default ProductDrawer;
