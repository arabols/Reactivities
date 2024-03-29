import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponents";
import { useStore } from "../../stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer(function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { profileStore } = useStore();
    const { loadProfile, loadingProfile, profile, setAcctiveTab } = profileStore;

    useEffect(() => {
        loadProfile(username!);

        return () => {
            setAcctiveTab(0);
        }
    }, [username, loadProfile, setAcctiveTab])

    if (loadingProfile) return <LoadingComponent contents='Loading Activities...' />

    return (
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                    <>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </>}
            </Grid.Column>
        </Grid>
    )
})