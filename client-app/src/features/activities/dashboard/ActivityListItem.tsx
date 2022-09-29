import React, { } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/activity"
import { format } from 'date-fns';
import ActivityListItemAttendee from "./ActivityListItemAttendee";


interface Props {
    activity: Activity
}



export default function ActivityListItem({ activity }: Props) {
    return (
        <Segment.Group>
            <Segment>
                {activity.isCancelled && <Label attached="top" color="red" content='Canceled' style={{ textAlign: 'center' }} />}
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' style={{ marginBottom: 3 }} circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                            <Item.Description> Hosted by {activity.host?.displayName}</Item.Description>
                            {activity.isHost && (<Item.Description>
                                <Label basic color="orange">
                                    you are hosting this activity.
                                </Label>
                            </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (<Item.Description>
                                <Label basic color="green">
                                    you are attending this activity.
                                </Label>
                            </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated="right"
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}