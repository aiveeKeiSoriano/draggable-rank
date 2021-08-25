import { useState } from "react";
import tracks from "./tracks.json"

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {

  let [items, setItems] = useState(tracks.slice(0, 10))
  let [selected, setSelected] = useState(tracks.slice(10))

  const grid = 8;

  const reorder = (list, startIndex, endIndex) => {
    let result = items.slice()
    if (list === "selected") {
      result = selected.slice()
    }
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    let sourceClone, destClone
    if (source === "droppable") {
      sourceClone = items.slice()
      destClone = selected.slice()
    }
    else {
      sourceClone = selected.slice()
      destClone = items.slice()
    }
    // const sourceClone = Array.from(source);
    // const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    padding: grid
  });

  let id2List = {
    droppable: 'items',
    droppable2: 'selected'
  };

  let getList = id => id2List[id];

  let onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const tempItems = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === 'droppable2') {
        setSelected(tempItems)
      }
      else setItems(tempItems)

    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setItems(result.droppable)
      setSelected(result.droppable2)
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} class="App">
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}>
                {(provided, snapshot) => (
                  <div className="Box"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div className="box-img">
                      <img src={item.album.images[0].url} className="box-img" alt="track cover" />
                    </div>
                    <div className="info">
                      <div className="name">{item.name}</div>
                      <div className="artist">{item.artists.map(el => el.name).join(" | ")}</div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="droppable2">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            {selected.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}>
                {(provided, snapshot) => (
                  <div className="Box"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div className="box-img">
                      <img src={item.album.images[0].url} className="box-img" alt="track cover" />
                    </div>
                    <div className="info">
                      <div className="name">{item.name}</div>
                      <div className="artist">{item.artists.map(el => el.name).join(" | ")}</div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

  );
}

export default App;
