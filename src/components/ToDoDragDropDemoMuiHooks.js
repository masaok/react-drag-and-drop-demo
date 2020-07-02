// https://www.pluralsight.com/guides/implement-drag-drop-react-component

import React, { useState } from 'react'
import '../App.css'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
// import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const ToDoDragDropDemoMuiHooks = props => {
  const [tasks, setTasks] = useState([
    { id: '1', taskName: 'Read book', type: 'inProgress', backgroundColor: 'red' },
    { id: '2', taskName: 'Pay bills', type: 'inProgress', backgroundColor: 'green' },
    { id: '3', taskName: 'Go to the gym', type: 'Done', backgroundColor: 'blue' },
    { id: '4', taskName: 'Play baseball', type: 'Done', backgroundColor: 'purple' }
  ])

  const [dragOverIndex, setDragOverIndex] = useState(null)

  console.log('CURRENT TASKS:')
  console.log(tasks)

  console.log('DRAG OVER INDEX:' + dragOverIndex)

  // state = {
  //   tasks: [
  //     {id: "1", taskName:"Read book",type:"inProgress", backgroundColor: "red"},
  //     {id: "2", taskName:"Pay bills", type:"inProgress", backgroundColor:"green"},
  //     {id: "3", taskName:"Go to the gym", type:"Done", backgroundColor:"blue"},
  //     {id: "4", taskName:"Play baseball", type:"Done", backgroundColor:"purple"}
  //   ],
  //   dragOverIndex: null,  // change the color of the row being dragged over
  // }

  const onDragStart = (event, index) => {
    console.log('dragstart on div: ', index)
    event.dataTransfer.setData('dragIndex', index)
  }

  const onDragEnter = (event, index) => {
    console.log('ON DRAG ENTER index: ', index)
    event.preventDefault()
    // this.setState({
    //   dragOverIndex: index
    // })
    setDragOverIndex(index)
  }

  const onDragOver = (event, index) => {
    // console.log('ON DRAG OVER index: ', index);
    event.preventDefault()
  }

  const onDragLeave = (event, index) => {
    console.log('ON DRAG LEAVE index: ', index)
    event.preventDefault()
  }

  const onDrop = (event, dropIndex) => {
    console.log('ON DROP > dropIndex: ' + dropIndex)
    let dragIndex = event.dataTransfer.getData('dragIndex')
    console.log('dragIndex: ' + dragIndex)

    // let tasks = this.state.tasks
    let tempDraggedTask = tasks[dragIndex]
    console.log('tempDraggedTask: ' + tempDraggedTask.taskName)

    // tasks.splice(dragIndex, 1)
    // tasks.splice(dropIndex, 0, tempDraggedTask)

    if (dragIndex < dropIndex) {
      console.log('DRAG < DROP: ' + dragIndex + ' < ' + dropIndex)

      const newTasks = [
        ...tasks.slice(0, dragIndex),
        ...tasks.slice(+dragIndex + +1, +dropIndex + +1),
        tempDraggedTask,
        ...tasks.slice(+dropIndex + +1)
      ]
      console.log('NEW TASKS:')
      console.log(newTasks)
      setTasks(newTasks)
    }

    // this.setState({
    //   tasks,
    //   dragOverIndex: null // reset the color after the row is dropped
    // })
  }

  // render() {
  //   let tasks = []

  //   const { dragOverIndex } = this.state

  return (
    <div className="drag-container">
      <h2 className="head">PluralSight Drag Drop Table Demo with MUI and Hooks</h2>
      <Table>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow
              key={task.id}
              onDragStart={event => onDragStart(event, index)}
              onDragEnter={event => onDragEnter(event, index)}
              onDragOver={event => onDragOver(event, index)}
              onDragLeave={event => onDragLeave(event, index)}
              onDrop={event => {
                onDrop(event, index)
              }}
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

export default ToDoDragDropDemoMuiHooks
