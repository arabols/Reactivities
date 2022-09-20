import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/forms/MyTextInput";
import { useStore } from "../../stores/store";
import ServerError from "../errors/ServerError";

export default observer(function LoginForm() {
    const { userStore } = useStore();
    const navigate = useNavigate();



    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values, navigate).catch(error => setErrors({ error: "invalid email or password" }))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content="Login to Reactivities" color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder="Email" />
                    <MyTextInput name="password" placeholder="password" type="password" />
                    <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} content={errors.error} basic color="red" />} />
                    <Button loading={isSubmitting} positive content='Login' type="submit" fluid />
                </Form>
            )}

        </Formik>
    )
})