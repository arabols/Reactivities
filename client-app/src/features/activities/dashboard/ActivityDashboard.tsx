import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../stores/store";
import ActivityList from "./ActivityList";

export default observer(function ActiviyDashboard() {

    const { activityStore } = useStore();
    const { loadActivitieis, activityRegistry } = activityStore

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivitieis();
    }, [activityRegistry.size, loadActivitieis]);

    if (activityStore.loadingInitial) return <LoadingComponent contents='Loading app' />



    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>activity filter</h2>
            </Grid.Column>


        </Grid>
    )
}
)