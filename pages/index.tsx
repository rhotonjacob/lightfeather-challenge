import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  // FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";

interface IFormValues {
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
          // validate={(values) => {
          //   const errors: Partial<IFormValues> = {};
          //   if (!values.firstName) errors.firstName = "Required";
          //   if (!values.lastName) errors.lastName = "Required";
          //   if (!values.supervisor) errors.supervisor = "Required";
          //   return errors;
          // }}
          onSubmit={(values) => console.log(JSON.stringify(values))}
        >
          {({
            // dirty,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            // isValid,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing="16px">
                <Heading textAlign="center">Notification Form</Heading>
                <Stack direction="row" spacing="16px">
                  <FormControl
                    isRequired
                    // isInvalid={errors.firstName && touched.firstName}
                  >
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                    />
                    {/* <FormErrorMessage>{errors.firstName}</FormErrorMessage> */}
                  </FormControl>
                  <FormControl
                    isRequired
                    // isInvalid={errors.lastName && touched.lastName}
                  >
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                    />
                    {/* <FormErrorMessage>{errors.lastName}</FormErrorMessage> */}
                  </FormControl>
                </Stack>
                <FormControl
                  isRequired
                  // isInvalid={!!errors.supervisor}
                >
                  <FormLabel htmlFor="supervisor">Supervisor</FormLabel>
                  <Select
                    id="supervisor"
                    placeholder="Select Supervisor"
                    // onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.supervisor}
                  >
                    {supervisors.map((sup, idx) => (
                      <option key={`${sup}-${idx}`} value={sup}>
                        {sup}
                      </option>
                    ))}
                  </Select>
                  {/* <FormErrorMessage>{errors.supervisor}</FormErrorMessage> */}
                </FormControl>
                <Divider />
                <Text>And how would you prefer to be notified?</Text>
                <Stack direction="row" spacing="16px">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone"
                      // onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                    />
                  </FormControl>
                </Stack>
                <Button
                  type="submit"
                  colorScheme="blue"
                  // isDisabled={!(isValid && dirty)}
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
