import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import List from './List';
import { addingTaskIndexState, destinationState, draggableState, listsState, newTaskNameState, sourceState } from './atom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import styles from "./listContainer.module.css"
const ListContainer = () => {
  const [lists, setLists] = useRecoilState(listsState);
  const [num, setNum] = useState(0);
  const [dragId, setDragId] = useRecoilState(draggableState);
  const [sourceId, setSourceId] = useRecoilState(sourceState);
  const [destinationId, setDestinationId] = useRecoilState(destinationState);
  useEffect(()=>{setNum(Math.floor(Math.random() * 100).toString())},[lists])
 
  const handleDragEnd = (result) => {
    const { destination, source,  type } = result;
    setDragId(result.draggableId)
    setSourceId(source.droppableId)
    setDestinationId(destination.droppableId)
    if (!destination) {
      return;
    }
  
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    if (type === 'list') {
      // const newListOrder = Array.from(lists);
      // const movedList = newListOrder.splice(source.index, 1)[0];
      // newListOrder.splice(destination.index, 0, movedList);
  
      // setLists(newListOrder);
      const reorderedStores = [...lists];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);
      localStorage.setItem("List", JSON.stringify(reorderedStores));

      return setLists(reorderedStores);
    }
  
   
   
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = lists.findIndex(
      (list) => list.id === source.droppableId
    );
    const storeDestinationIndex = lists.findIndex(
      (list) => list.id === destination.droppableId
    );

    const sourceList = lists[storeSourceIndex];
const destinationList = lists[storeDestinationIndex];

if (!sourceList || !destinationList) {
 
  return;
}

const newSourceItems = [...sourceList.tasks];
const newDestinationItems =
  source.droppableId !== destination.droppableId
    ? [...destinationList.tasks]
    : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...lists];

    newStores[storeSourceIndex] = {
      ...lists[storeSourceIndex],
      tasks: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...lists[storeDestinationIndex],
      tasks: newDestinationItems,
    };

    setLists(newStores);
    localStorage.setItem("Lists", JSON.stringify(newStores));
  };
  return (
    <div className={styles.main}>
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={num} direction="horizontal" type="list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ display: 'flex' }} 
          >
            {lists.map((list, index) => (
              <List key={list.id} list={list} listIndex={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </div>
  );
};

export default ListContainer;
