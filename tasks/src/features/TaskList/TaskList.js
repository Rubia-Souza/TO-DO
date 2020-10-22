import React, { useState } from "react";
import { View, FlatList } from "react-native";

import VisibilityButton from "./VisibilityButton/VisibilityButton";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import AddButton from "../../shared/components/AddButton/AddButton";
import ItemList from "../../shared/components/ItemList/ItemList";
import imgToday from "../../../assets/imgs/today.jpg";

import { 
    StyeldImage, 
    StyledSafeAreaView, 
    StyledTitleText, 
    StyledActualDateText, 
    StyledIconBar 
} from "./styles";

import { getActualFormattedDate, getActualDate } from "../../shared/utils/functions/DateUtils";

import Task from "../../shared/dtos/Task";

const TaskList = () => {

    const [tasks, setTasks] = useState(new Array(0));
    const [modalCreateTaskIsOpen, setModalCreateTaskIsOpen] = useState(false);
    const [concludedTasksIsVisible, setConcludedTasksIsVisible] = useState(true);
    
    // TODO: Remove test stuff
    const [count, setCount] = useState(0);
    if (count === 0) {
        setCount(1);
        tasks.push(new Task("Capturar Pokemons1", new Date("2020-02-03"), new Date("2020-01-03")));
        tasks.push(new Task("Capturar Pokemons2", new Date("2020-02-03"), new Date("2020-01-03")));
        tasks.push(new Task("Capturar Pokemons3", new Date("2020-02-03"), new Date("2020-01-03")));
    }

    const createItemList = (task) => {
        if (!task) {
            return null;
        }

        return (
            <ItemList 
                taskData={task}
                onTaskConclusion={handleTaskConclusion}
                onTaskReseted={handleTaskReseted}
                onExclusion={handleTaskExclusion}
            />
        );
    };

    const handleTaskConclusion = (id) => {
        const updatedTasks = [...tasks];

        let concludedTaskIndex = updatedTasks.findIndex(task => task.id === id);
        updatedTasks[concludedTaskIndex].concluded = true;
        updatedTasks[concludedTaskIndex].conclusion = getActualDate();

        setTasks(updatedTasks);
    };

    const handleTaskReseted = (id) => {
        const updatedTasks = [...tasks];

        let resetedTaskIndex = updatedTasks.findIndex(task => task.id === id);
        updatedTasks[resetedTaskIndex].concluded = false;
        updatedTasks[resetedTaskIndex].conclusion = null;

        setTasks(updatedTasks);
    };

    const handleTaskExclusion = (id) => {
        const updatedTasks = [...tasks];

        const deletedTaskIndex = updatedTasks.findIndex(task => task.id === id);
        updatedTasks.splice(deletedTaskIndex, 1);

        setTasks(updatedTasks);
    };

    const closeCreateTaskModal = () => {
        setModalCreateTaskIsOpen(false);
    };

    const openCreateTaskModal = () => {
        setModalCreateTaskIsOpen(true);
    };

    const handleCreateTaskSave = (createdTask) => {
        setModalCreateTaskIsOpen(false);

        const updatedTasks = [...tasks];
        updatedTasks.push(createdTask);
        
        setTasks(updatedTasks);
    };

    const handleVisibilityChange = () => {
        setConcludedTasksIsVisible(!concludedTasksIsVisible);
    };

    return (
        <StyledSafeAreaView>
            <CreateTaskModal 
                isOpen={modalCreateTaskIsOpen} 
                onClose={closeCreateTaskModal}
                onSave={handleCreateTaskSave}
            />

            <StyeldImage source={imgToday}>
                <StyledIconBar>
                    <VisibilityButton 
                        isVisible={concludedTasksIsVisible} 
                        onPress={handleVisibilityChange}
                    />
                </StyledIconBar>
                <StyledTitleText>
                    Today
                </StyledTitleText>
                <StyledActualDateText>
                    {getActualFormattedDate()}
                </StyledActualDateText>
            </StyeldImage>

            <FlatList 
                data={tasks}
                extraData={tasks}
                keyExtractor={task => task.id}
                renderItem={({item: task}) => {
                    return createItemList(task);
                }}
            />

            <AddButton onPress={openCreateTaskModal}/>
        </StyledSafeAreaView>
    );
};

export default TaskList;