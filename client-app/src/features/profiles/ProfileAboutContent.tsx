import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Form, Grid, Header, Tab } from "semantic-ui-react";
import MyTextInput from "../../app/common/forms/MyTextInput";
import { Profile } from "../../models/profile";
import { useStore } from "../../stores/store";
import * as Yup from 'yup';
import MyTextArea from "../../app/common/forms/MyTextArea";
import { observer } from "mobx-react-lite";

interface Props {
    profile: Profile;
}

export default observer(function ProfileAboutContent({ profile }: Props) {

    const { profileStore, userStore } = useStore();
    const { isCurrentUser, loading, updateProfile } = profileStore;
    const { updateDisplayName } = userStore



    const [editMode, setEditMode] = useState(false);
    const validationSchema = Yup.object({
        displayName: Yup.string().required("A Display Name Is Required")
    });

    function handleFormSubmit(profile: Profile) {
        updateProfile(profile).then(() => {
            if (profile.displayName !== profile.displayName)
                updateDisplayName(profile.displayName);
            setEditMode(false);
        }).catch(() => setEditMode(false));
    }

    return (
        <>
            <Tab.Pane>
                <Grid>
                    <Grid.Column width={16}>
                        <Header icon="user" floated='left' content={profile.displayName ? `About ${profile.displayName}` : 'About User'} />
                        {isCurrentUser &&
                            <Button floated="right" content={editMode ? 'Cancel' : 'Edit Profile'} onClick={() => setEditMode(!editMode)} />}
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {editMode ?
                            (<Formik
                                initialValues={profile}
                                validationSchema={validationSchema}
                                onSubmit={values => handleFormSubmit(values)}
                            >
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    <Form className='ui from' onSubmit={handleSubmit} autoComplete='off'>
                                        <MyTextInput placeholder="DisplayName" name="displayName" />
                                        <MyTextArea placeholder="Bio" name="bio" rows={3} />
                                        <Button floated="right" loading={isSubmitting} disabled={isSubmitting || !dirty || !isValid} positive type='submit' content="Update Profile" />

                                    </Form>
                                )}
                            </Formik>) :
                            (
                                <article style={{ whiteSpace: 'pre-wrap' }}>{profile.bio}</article>
                            )
                        }
                    </Grid.Column>
                </Grid>
            </Tab.Pane>
        </>
    )
})