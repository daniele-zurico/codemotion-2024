import React from "react";
import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";
import {
  BUTTON_TYPE,
  Button,
  FormInput,
  Paragraph,
  Link,
} from "@capgeminiuk/dcx-react-library";
import { json, ActionFunction } from "@remix-run/node";
import "/node_modules/@capgeminiuk/dcx-react-library/dist/design-system/index.css";
import "../styles/style.css";
export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();

  const body = JSON.stringify({
    username: form.get("username"),
    password: parseInt(form.get("password")),
  });

  const response = await fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.status === 404) {
    return json({ error: response.statusText, isLoading: false });
  }
  return redirect("/product");
};

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const errors = useActionData();
  const transition = useNavigation();

  return (
    <Form method="post">
      <FormInput
        name="username"
        type="text"
        value={username}
        label="username"
        inputProps={{ placeholder: "username" }}
        onChange={(evt) => setUsername(evt.currentTarget.value)}
        variant="floating"
      />
      <FormInput
        name="password"
        type="password"
        value={password}
        label="password"
        inputProps={{ placeholder: "password" }}
        onChange={(evt) => setPassword(evt.currentTarget.value)}
        variant="floating"
      />
      <Link value="Forgot password?" to="/fogot-password" />

      <Button
        label="SignIn"
        type={BUTTON_TYPE.SUBMIT}
        isLoading={transition.state === "submitting"}
        loadingLabel="Loading..."
      />
      {errors && <Paragraph value={errors.error} />}
    </Form>
  );
}
