import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";

const Home = () => {
  const [supervisors, setSupervisors] = React.useState<string[]>();
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

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      supervisor: "",
    },
    onSubmit: (values) => console.log(JSON.stringify(values)),
  });

  return (
    <Skeleton isLoaded={!isLoading && !!supervisors} width="50%" padding="16px">
      <Heading>Notification Form</Heading>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="firstName"
          name="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          placeholder="First Name"
        />
        <Input
          id="lastName"
          name="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          placeholder="Last Name"
        />
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
        />
        <Input
          id="phone"
          name="phone"
          type="tel"
          onChange={formik.handleChange}
          value={formik.values.phone}
          placeholder="Phone"
        />
        <Select placeholder="Supervisor">
          {supervisors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <Button type="submit">Submit</Button>
      </form>
    </Skeleton>
  );
};

export default Home;
