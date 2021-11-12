import React, { useState } from 'react'
import { TypeTodo } from "../TypeTodo/TypeTodo";
import { v4 as uuidv4 } from "uuid";
// type TodoListProps = {
//     onAddTodo: any;
//     onClose: any;
// };
export const AddTodoForm = ({ onAddTodo, onEditTodo, currentTodo ,close }: any) => {
    const [inputName, setInputName] = useState(currentTodo?.name || "");
    const [inputContent, setInputContent] = useState(currentTodo?.content || "")
    const onHandleSubmit = (e: any) => {
        if(currentTodo && onEditTodo) {
            e.preventDefault();
            onEditTodo({id: currentTodo.id, name: inputName, content: inputContent });
            close();
        } else if(onAddTodo) {
            e.preventDefault();
            onAddTodo({id: uuidv4(), name: inputName, content: inputContent })
            setInputName("");
            setInputContent("");
            close();
        }        
    }

    const onHandleChange = (e: any) => {
        setInputName(e.target.value)
    }
    const onHandleChangeContent = (e: any) => {
        setInputContent(e.target.value)
    }
    return <form action="" onSubmit={(e) => onHandleSubmit(e)}>
        <div>
            <div className="field-input-group">
                <input required placeholder="Name" value={inputName} type="text" className="ant-input" onChange={(e) => onHandleChange(e)} />
            </div>
            <div className="field-input-group">
                <input required placeholder="Description" value={inputContent} type="text" className="ant-input" onChange={(e) => onHandleChangeContent(e)} />
            </div>
            <div className="modal-new-user-footer">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
                <button className="ant-btn" style={{ marginLeft: 10 }} >
                    Cancel
                </button>
            </div>
        </div>
    </form>
}
