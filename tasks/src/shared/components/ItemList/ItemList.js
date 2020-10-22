import React from "react";

import If from "../If/If";
import Checkbox from "../Checkbox/Checkbox";
import ExclusionButton from "./ExclusionButton/ExclusionButton";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { 
    StyledText, 
    StyledMainView,
    StyledTextView,
    StyledTaskTitle 
} from "./styles";

import { formatDate } from "../../../shared/utils/functions/DateUtils";
import { EmptyString, isStringBlank } from "../../../shared/utils/functions/StringUtils";
import { hasSetFunctionProperty } from "../../../shared/utils/functions/ComponentsUtils";
import ExclusionButtonDirections from "../../../shared/utils/constants/ExclusionButtonDirections";

import Task from "../../dtos/Task";

const ItemList = ({
    taskData=Task.EmptyTask,
    onTaskConclusion=null,
    onTaskReseted=null,
    onExclusion=null
}) => {

    const task = taskData;

    const getDateString = (date) => {
        if (!(date instanceof Date)) {
            return EmptyString;
        }

        return formatDate(date);
    };

    const compleatTask = () => {
        if (hasSetFunctionProperty(onTaskConclusion)) {
            onTaskConclusion(task.id);
        }
    };

    const resetTask = () => {
        if (hasSetFunctionProperty(onTaskReseted)) {
            onTaskReseted(task.id);
        }
    };

    const getRightExclusionButton = () => {
        return (
            <ExclusionButton onPress={handleExclusion}/>
        );
    };

    const getLeftExclusionButton = () => {
        return (
            <ExclusionButton direction={ExclusionButtonDirections.horizontal}/>
        );
    };

    const handleExclusion = () => {
        if (hasSetFunctionProperty(onExclusion)) {
            onExclusion(task.id);
        }
    };

    return (
        <Swipeable 
            renderRightActions={getRightExclusionButton} 
            renderLeftActions={getLeftExclusionButton}
            onSwipeableLeftOpen={handleExclusion}
            >

            <StyledMainView>
                <Checkbox onCheck={compleatTask} onUncheck={resetTask}/>

                <StyledTextView>
                    <StyledTaskTitle isCompleated={task.concluded}>
                        {task.title}
                    </StyledTaskTitle>

                    <If isTrue={!isStringBlank(task.deadline) && !task.concluded}>
                        <StyledText>
                            Deadline: {getDateString(task.deadline)}
                        </StyledText>
                    </If>

                    <If isTrue={!isStringBlank(task.conclusion) && task.concluded}>
                        <StyledText>
                            Concluded at: {getDateString(task.conclusion)}
                        </StyledText>
                    </If>
                </StyledTextView>
            </StyledMainView>
        </Swipeable>
    );
};

export default ItemList;