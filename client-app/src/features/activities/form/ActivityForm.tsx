import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../stores/store";
import { v4 as uuid } from 'uuid';
import { createBrowserHistory } from "history";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/forms/MyTextInput";
import MyTextArea from "../../../app/common/forms/MyTextArea";
import MySelectInput from "../../../app/common/forms/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/forms/MyDateImput";
import { Activity } from "../../../models/activity";

export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial, setLoadingInitial } = activityStore
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const history = createBrowserHistory();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is Required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),

    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
        else setLoadingInitial(false);
    }, [id, loadActivity]);


    function handleFormSubmit(activity: Activity) {
        debugger;
        if (activity.id.length === 0) {
            let newActivity = { ...activity, id: uuid() };
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        }
        else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }


    if (loadingInitial) return <LoadingComponent contents="Loading...." />;

    return (

        <Segment clearing>
            <Header content='Activity Details' sub color="teal" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui from' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name="title" placeholder="title" />
                        <MyTextArea placeholder='Description' name='description' rows={3} />
                        <MySelectInput placeholder='Category' name='category' options={categoryOptions} />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color="teal" />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated="right" positive type='submit' content='Submit' value={activity.title} name='title' />
                        <Button as={Link} to='/activities' floated="right" positive type='button' content='Cancel' value={activity.title} name='title' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})