import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createMemory } from 'apiSdk/memories';
import { Error } from 'components/error';
import { memoryValidationSchema } from 'validationSchema/memories';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { FamilyInterface } from 'interfaces/family';
import { getFamilies } from 'apiSdk/families';
import { MemoryInterface } from 'interfaces/memory';

function MemoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MemoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMemory(values);
      resetForm();
      router.push('/memories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MemoryInterface>({
    initialValues: {
      description: '',
      date: new Date(new Date().toDateString()),
      keywords: '',
      family_id: (router.query.family_id as string) ?? null,
    },
    validationSchema: memoryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Memory
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <FormControl id="date" mb="4">
            <FormLabel>Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.date ? new Date(formik.values?.date) : null}
                onChange={(value: Date) => formik.setFieldValue('date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="keywords" mb="4" isInvalid={!!formik.errors?.keywords}>
            <FormLabel>Keywords</FormLabel>
            <Input type="text" name="keywords" value={formik.values?.keywords} onChange={formik.handleChange} />
            {formik.errors.keywords && <FormErrorMessage>{formik.errors?.keywords}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<FamilyInterface>
            formik={formik}
            name={'family_id'}
            label={'Select Family'}
            placeholder={'Select Family'}
            fetcher={getFamilies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'memory',
    operation: AccessOperationEnum.CREATE,
  }),
)(MemoryCreatePage);
