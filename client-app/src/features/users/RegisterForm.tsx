import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/forms/MyTextInput";
import { useStore } from "../../stores/store";
import ServerError from "../errors/ServerError";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    const navigate = useNavigate();



    return (
        <Formik
            initialValues={{ email: '', password: '', displayName: '', userName: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values, navigate).catch(error =>
                setErrors({ error }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required(),
                userName: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content="Sign up to Reactivities" color='teal' textAlign='center' />
                    <MyTextInput name='displayName' placeholder="Display Name" />
                    <MyTextInput name='userName' placeholder="Username" />
                    <MyTextInput name='email' placeholder="Email" />
                    <MyTextInput name="password" placeholder="password" type="password" />
                    <ErrorMessage name='error' render={() => <ValidationErrors errors={errors.error} />} />
                    <Button disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} positive content='Register' type="submit" fluid />
                </Form>
            )}

        </Formik>
    )
})