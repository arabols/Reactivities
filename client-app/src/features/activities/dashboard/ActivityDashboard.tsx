import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../stores/store";
import ActivityFilters from "./ActivityFileters";
import ActivityList from "./ActivityList";

export default observer(function ActiviyDashboard() {

    const { activityStore } = useStore();
    const { loadActivitieis, activityRegistry } = activityStore

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivitieis();
    }, [activityRegistry.size, loadActivitieis]);

    if (activityStore.loadingInitial) return <LoadingComponent contents='Loading Activities...' />



    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>


        </Grid>
    )
}
)