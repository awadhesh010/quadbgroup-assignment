import { useSelector, useDispatch } from "react-redux";
import { editTodo, removeTodo, toggleTodoCompleted } from "../../redux/todoSlice";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';

const TaskList = () => {
    const dispatch = useDispatch();
    const { todoList } = useSelector(res => res.todoSlice);
    const [editData, setEditData] = useState({ title: "", dueDate: "" });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

 
    const handleChange = (event) => { //take data from user input  to update
        let element = event.target;
        let name = element.name;
        let value = element.value;
        setEditData({ ...editData, [name]: value })
    }

    const handleSubmit = (e) => {   //dispatch updated data to redux store
        e.preventDefault();
        dispatch(editTodo({ index: editIndex, value: editData }));
        setShowEditModal(false)
    }

    const handleEdit = (index) => { // edit function
        const data = todoList[index];
        setEditData(data);
        setShowEditModal(true)
        setEditIndex(index)
    }

    const handleToggleCompleted = (index) => {
        dispatch(toggleTodoCompleted(index));
    }

    return (
        <>
            {//Render all to do using map
                todoList.map((item, index) => (
                    <div key={index} className={item.completed? 'container border border-primary mt-2 rounded text-white p-1 bg-success':'container border border-primary mt-2 p-1 bg-light'}>
                        <div className="row p-1">
                            <div className="col-7">
                                <h3>{item.title}</h3>
                                <p>{item.dueDate}</p>
                            </div>
                            <div className="col-5 d-flex align-items-center justify-content-end">
                                <div>
                                <button onClick={() => handleToggleCompleted(index)} className="btn btn-warning me-1">
                                    {item.completed ? "Completed" : 'Mark Done'}
                                </button>
                                    <button onClick={() => handleEdit(index)} className="btn btn-primary mt-1">Edit</button>
                                    <button onClick={() => dispatch(removeTodo(index))} className="btn btn-danger mt-1 ms-1"><MdDelete /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="form-control mb-3" placeholder="todo name" name="title" value={editData.title} onChange={handleChange} />
                        <input type="date" className="form-control" placeholder="due Date" name="dueDate" value={editData.dueDate} onChange={handleChange} /> <br /><br />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
                            <button type="submit" className="btn btn-success">Save Changes</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default TaskList;