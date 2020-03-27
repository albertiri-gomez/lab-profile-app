import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { doLogout, doEdit } from "../../lib/auth.api";
import { useForm, FormContext } from "react-hook-form";
import { ApiContext } from "../../context/ApiContext";
import { InputBox } from "../components/Input";

export const ProfilePage = withRouter(({ history }) => {
  const { user, setUser } = useContext(ApiContext);

  const onClickLogout = async e => {
    e.preventDefault();
    await doLogout();
    setUser(null);
    history.push("/");
  };

  const methods = user
    ? useForm({
        mode: "onBlur",
        defaultValues: {
          username: user?.username,
          campus: user?.campus,
          course: user?.course
        }
      })
    : useForm({
        mode: "onBlur"
      });

  console.log(user);
  const { register, handleSubmit, errors } = methods;

  const onEdit = async data => {
    console.log("data", data);
    await doEdit(data);
    setUser(data);
  };

  return (
    <FormContext {...methods}>
      <>
        <form onSubmit={handleSubmit(onEdit)}>
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
          <div>
            <label>Campus</label>
            <InputBox
              // className={hasError(errors, "campus")}
              name="campus"
              ref={register({ required: true })}
            />
          </div>
          <div>
            <label>Course</label>
            <InputBox
              // className={hasError(errors, "course")}
              name="course"
              ref={register({ required: true })}
            />
          </div>
          <button type="submit">Editar Profile</button>
          <button onClick={e => onClickLogout(e)}>Logout</button>
        </form>
      </>
    </FormContext>
  );
});
