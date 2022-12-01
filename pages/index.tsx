import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";

export interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  supervisor: string;
}

const initialValues: IFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  supervisor: "",
};

const Home = () => {
  const [supervisors, setSupervisors] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<IFormValues>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const successToast = useToast({
    title: "Subscribed",
    description: "You will now receive notifications from this supervisor.",
    status: "success",
    isClosable: true,
  });

  React.useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await fetch("/api/supervisors").then((res) => res.json());
      setSupervisors(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Skeleton
      isLoaded={!isLoading && !!supervisors}
      width="80%"
      padding="16px"
      margin="0 auto"
    >
      <Box
        border="2px solid"
        borderColor="#000"
        borderRadius="10px"
        padding="16px"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            setIsSubmitting(true);
            const validationErrors = await fetch("/api/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            }).then((res) => res.json());
            setErrors(validationErrors);
            setIsSubmitting(false);
            if (!Object.keys(validationErrors).length) {
              resetForm();
              successToast();
            }
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing="16px">
                <Heading textAlign="center">Notification Form</Heading>
                <Stack direction="row" spacing="16px">
                  <FormControl isInvalid={!!errors.firstName}>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      onChange={handleChange}
                      value={values.firstName}
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={values.lastName}
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                </Stack>
                <FormControl isInvalid={!!errors.supervisor}>
                  <FormLabel htmlFor="supervisor">Supervisor</FormLabel>
                  <Select
                    id="supervisor"
                    placeholder="Select Supervisor"
                    onChange={handleChange}
                    value={values.supervisor}
                  >
                    {supervisors.map((sup, idx) => (
                      <option key={`${sup}-${idx}`} value={sup}>
                        {sup}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.supervisor}</FormErrorMessage>
                </FormControl>
                <Divider />
                <Text>And how would you prefer to be notified?</Text>
                <Stack direction="row" spacing="16px">
                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={values.email}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.phone}>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      onChange={handleChange}
                      value={values.phone}
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>
                </Stack>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isDisabled={isSubmitting}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Skeleton>
  );
};

export default Home;
