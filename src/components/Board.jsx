import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useState } from 'react'


function Board() {
  const [completed,setCompleted]=useState([]);
  const [incomplete,setIncomplete]=useState([]);


  return (
    <DragDropContext>
    <h2>In Progress</h2>
    <div>
      
    </div>
    </DragDropContext >
  )
}

export default Board
