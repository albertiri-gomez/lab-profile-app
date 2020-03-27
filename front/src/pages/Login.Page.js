import React, { useContext } from "react";
import { useForm, FormContext } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { doLogin } from "../../lib/auth.api";
import { InputBox } from "../components/Input";
import { ApiContext } from "../../context/ApiContext";

export const LoginPage = withRouter(({ history }) => {
  const { user, setUser } = useContext(ApiContext);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const { register, handleSubmit, errors } = methods;

  const onSubmit = async data => {
    console.log("Data is");
    console.log("data", data);
    const responseServer = await doLogin(data);

    if (!responseServer.status) {
      setUser(data);
      history.push("/profile");
    } else {
      console.log(`fallo ${responseServer.message}`);
      return history.push("/login");
    }
  };
  return (
    <FormContext {...methods}>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Username</label>
            <InputBox
              // className={hasError(errors, "username")}
              name="username"
              ref={register({ required: true })}
            />
          </div>
          <div>
            <label>Password</label>
            <InputBox
              // className={hasError(errors, "password")}
              name="password"
              ref={register({ required: true })}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </>
    </FormContext>
  );
});
