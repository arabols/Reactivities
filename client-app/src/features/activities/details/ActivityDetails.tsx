import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../stores/store";
import ActivityDetailedHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailedChat";
import ActivityDetailSidebar from "./ActivityDetailSidebar";


export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore;
    const { id } = useParams<{ id: string }>();


    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
        return () => {
            clearSelectedActivity()
        }
    }, [id, loadActivity, clearSelectedActivity]);

    debugger;
    if (loadingInitial || !activity) return <LoadingComponent contents={"Loading Activity..."} />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailInfo activity={activity} />
                <ActivityDetailChat activityId={activity.id} />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailSidebar activity={activity!} />
            </Grid.Column>
        </Grid>
    )
})