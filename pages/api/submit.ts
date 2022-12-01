import { NextApiRequest, NextApiResponse } from "next";
import { IFormValues } from "../index";

interface ISubmitRequest extends NextApiRequest {
  body: IFormValues;
}

const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^\S+@\S+\.\S+$/;
const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const validator = (payload: IFormValues) => {
  const errors: Partial<IFormValues> = {};
  const { firstName, lastName, email, phone, supervisor } = payload;

  // firstName
  if (!firstName) {
    errors.firstName = "Required";
  } else if (!firstName.trim().match(nameRegex)) {
    errors.firstName = "Names may only contain letters";
  }

  // lastName
  if (!lastName) {
    errors.lastName = "Required";
  } else if (!lastName.trim().match(nameRegex)) {
    errors.lastName = "Names may only contain letters";
  }

  // email
  if (!!email && !email.trim().match(emailRegex))
    errors.email = "Enter a valid email address";

  // phone
  if (!!phone && !phone.trim().match(phoneRegex))
    errors.phone = "Enter a valid phone number";

  // supervisor
  if (!supervisor) errors.supervisor = "Required";

  return errors;
};

async function handler(req: ISubmitRequest, res: NextApiResponse) {
  try {
    const validationErrors = validator(req.body);

    if (!Object.keys(validationErrors).length) console.log(req.body);

    // Not ideal, but allows mapping errors to each field in the UI
    res.status(200).json(validationErrors);
  } catch (err) {
    res.status(500).json({ statusCode: 500, cause: err.message });
  }
}

export default handler;
