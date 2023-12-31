
import React from "react";
import { connect, useSelector } from "react-redux";
import { itemsSelector } from "../redux/selectors";
import { TasksContainer } from "./TaskContainer";

function TasksComponent(props){
    const { items } = props;
    return (
        <React.Fragment>
            {items.map(({name, id}) => {
                return <TasksContainer name={name} delid={id} key={id} />;
            })}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    items: itemsSelector(state),
});

export const Tasks = connect(mapStateToProps, {})(TasksComponent);

