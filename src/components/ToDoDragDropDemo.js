// https://www.pluralsight.com/guides/implement-drag-drop-react-component

import React, { Component } from 'react'
import '../App.css'

export default class ToDoDragDropDemo extends Component {
  state = {
    tasks: [
      { id: '1', taskName: 'Read book', type: 'inProgress', backgroundColor: 'red' },
      { id: '2', taskName: 'Pay bills', type: 'inProgress', backgroundColor: 'green' },
      { id: '3', taskName: 'Go to the gym', type: 'Done', backgroundColor: 'blue' },
      { id: '4', taskName: 'Play baseball', type: 'Done', backgroundColor: 'purple' }
    ]
  }

  onDragStart = (event, index) => {
    console.log('dragstart on div: ', index)
    event.dataTransfer.setData('dragIndex', index)
  }

  onDragOver = event => {
    event.preventDefault()
  }

  onDrop = (event, dropIndex) => {
    console.log('ON DROP > dropIndex: ' + dropIndex)
    let dragIndex = event.dataTransfer.getData('dragIndex')
    console.log('dragIndex: ' + dragIndex)

    let tasks = this.state.tasks
    let tempDraggedTask = tasks[dragIndex]
    console.log('tempDraggedTask: ' + tempDraggedTask.taskName)

    tasks.splice(dragIndex, 1)
    tasks.splice(dropIndex, 0, tempDraggedTask)

    this.setState({
      tasks
    })
  }

  render() {
    let tasks = []

    this.state.tasks.forEach((task, index) => {
      tasks.push(
        <tr
          key={task.id}
          onDragStart={event => this.onDragStart(event, index)}
          onDragOver={event => this.onDragOver(event)}
          onDrop={event => {
            this.onDrop(event, index)
          }}
          draggable
          // className="draggable"
          style={{ backgroundColor: task.backgroundColor }}
        >
          <td>{task.id}</td>
          <td>{task.taskName}</td>
          <td>{task.type}</td>
        </tr>
      )
    })

    return (
      <div className="drag-container">
        <h2 className="head">Drag Drop Table Demo with Classes</h2>
        <table>
          <tbody>{tasks}</tbody>
        </table>
      </div>
    )
  }
}
