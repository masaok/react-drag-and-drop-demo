// https://www.pluralsight.com/guides/implement-drag-drop-react-component

import React, { useState } from 'react'
import '../App.css'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const ToDoDragDropDemoMuiHooksCurrying = props => {
  const [tasks, setTasks] = useState([
    { id: '1', taskName: 'Read book', type: 'inProgress', backgroundColor: 'red' },
    { id: '2', taskName: 'Pay bills', type: 'inProgress', backgroundColor: 'green' },
    { id: '3', taskName: 'Go to the gym', type: 'Done', backgroundColor: 'blue' },
    { id: '4', taskName: 'Play baseball', type: 'Done', backgroundColor: 'purple' }
  ])

  const [dragOverIndex, setDragOverIndex] = useState(null)

  const onDragStart = index => event => {
    console.log('ON DRAG START INDEX: ', index)
    event.dataTransfer.setData('dragIndex', index)
  }

  const onDragEnter = index => event => {
    console.log('ON DRAG ENTER index: ', index)
    event.preventDefault()
    setDragOverIndex(index)
  }

  const onDragOver = index => event => {
    console.log('ON DRAG OVER index: ', index)
    event.preventDefault()
  }

  const onDragLeave = index => event => {
    console.log('ON DRAG LEAVE index: ', index)
    event.preventDefault()
  }

  const onDrop = dropIndex => event => {
    console.log('ON DROP > dropIndex: ' + dropIndex)
    let dragIndex = event.dataTransfer.getData('dragIndex')
    console.log('dragIndex: ' + dragIndex)

    let tempDraggedTask = tasks[dragIndex]
    console.log('tempDraggedTask: ' + tempDraggedTask.taskName)

    // The slicing order of the new tasks depends on the drag/drop order
    if (dragIndex < dropIndex) {
      const newTasks = [
        ...tasks.slice(0, dragIndex),
        ...tasks.slice(+dragIndex + +1, +dropIndex + +1),
        tempDraggedTask,
        ...tasks.slice(+dropIndex + +1)
      ]
      setTasks(newTasks)
    } else {
      const newTasks = [
        ...tasks.slice(0, dropIndex),
        tempDraggedTask,
        ...tasks.slice(+dropIndex, +dragIndex),
        ...tasks.slice(+dragIndex + +1)
      ]
      setTasks(newTasks)
    }

    setDragOverIndex(null) // reset the color after the row is dropped
  }

  return (
    <div className="drag-container">
      <h2 className="head">Drag Drop Table Demo with MUI and Hooks and Currying</h2>
      <Table>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow
              key={task.id}
              onDragStart={onDragStart(index)}
              onDragEnter={onDragEnter(index)}
              onDragOver={onDragOver(index)}
              onDragLeave={onDragLeave(index)}
              onDrop={onDrop(index)}
              draggable
              style={
                dragOverIndex === index
                  ? {
                      backgroundColor: 'white'
                    }
                  : {
                      backgroundColor: task.backgroundColor
                    }
              }
            >
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.taskName}</TableCell>
              <TableCell>{task.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ToDoDragDropDemoMuiHooksCurrying
