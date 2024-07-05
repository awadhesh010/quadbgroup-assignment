import { useState } from "react";
import { addTodo } from "../../redux/todoSlice";
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';

const TaskInput = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        dueDate: "",
    });

    const handleChange = (event) => {  //collect data from user input
        let element = event.target;
        let name = element.name;
        let value = element.value;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {  //dispatch collected data from user
        e.preventDefault();
        dispatch(addTodo(formData));
        setFormData({
            title: "",
            dueDate: "",
        });
        setShowModal(false)

    }

    return (
        <div>
           <div className="d-flex justify-content-between align-items-center container my-3">
            <h1>Todo App</h1>
            <button type="button" className="btn btn-primary d-flex justify-content-center" onClick={()=> setShowModal(true)}>
                Add todo
            </button>
           </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Todo</h1>
                            <button type="button" className="btn-close" onClick={()=> setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <input type="text" className="form-control mb-3" placeholder="todo name" name="title" value={formData.title} onChange={handleChange} required />
                                <input type="date" className="form-control" placeholder="due Date" name="dueDate" value={formData.dueDate} onChange={handleChange} required /> <br /><br />
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"  onClick={()=> setShowModal(false)} >Close</button>
                                    <button type="submit" className="btn btn-primary">Add New</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default TaskInput;