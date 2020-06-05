import React, { useState, FormEvent } from "react";
import {
  Segment,
  Form,
  FormInput,
  FormTextArea,
  Button,
} from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import {v4 as uuid} from 'uuid';

interface IProps {
  selectedActivity: IActivity | null;
  setEditMode: (editMode: boolean) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  selectedActivity,
  setEditMode,
  createActivity,
  editActivity
}) => {
  const initializeForm = () => {
    if (selectedActivity) {
      return selectedActivity;
    } else {
      return {
        id: "",
        title: "",
        catagory: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);


  const handleSubmit = () => {
      if(activity.id.length===0) {
        let newActivity={
          ...activity,
          id:uuid()
        }
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
      
}


  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };


  return (
    <Segment raised clearing>
      <Form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <FormTextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <FormInput
          onChange={handleInputChange}
          name="catagory"
          placeholder="Category"
          value={activity.catagory}
        />
        <FormInput
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <FormInput
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <FormInput
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          positive
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
