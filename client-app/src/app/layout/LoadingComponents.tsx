import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    inverted?: boolean;
    contents: string;
}


export default function LoadingComponent({ inverted = true, contents = 'Loading...' }: Props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={contents} />
        </Dimmer>
    )
}