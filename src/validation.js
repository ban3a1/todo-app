export const validateUser = async (user, setErrors, setReadyToSend) => {
  const email = user.email;
  let errors = {};
  /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(email)
    ? (errors.email = "")
    : (errors.email = "Email is not valid");

  const password = user.password;
  password?.length > 5
    ? (errors.password = "")
    : (errors.password = "Password is too short");
  setErrors(errors);
  if (!errors.password && !errors.email) {
    setReadyToSend(true);
  }
};
