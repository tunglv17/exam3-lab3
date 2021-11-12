import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { ListTodo } from "./components/ListTodo";
import { AddTodoForm } from "./components/AddTodoForm";
import "antd/dist/antd.css";
import "./App.css";
import { TypeTodo } from "./components/TypeTodo/TypeTodo";
import TodosAPI from "./components/API/TodoAPI";

function App() {
    const [todos, setTodos] = useState<TypeTodo[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<TypeTodo | null>(null);
    useEffect(() => {
        const getTodos = async () => {
            try {
                const { data: todos } = await TodosAPI.getAll();
                setTodos(todos);
            } catch (error) {
                console.log(error);
            }
        };
        getTodos();
    }, []);
    const onHandleAdd = async (todo: TypeTodo) => {
        try {
            await TodosAPI.add(todo);
            setTodos([...todos, todo]);
        } catch (error) {
            console.log(error);
        }
    };
    const onHandleDelete = async (id: number) => {
        try {
            await TodosAPI.remove(id);
            const newTodo = todos.filter((todo) => todo.id !== id);
            setTodos(newTodo);
        } catch (error) {
            console.log(error);
        }
    };
    const handleEditTodo = async (DataTodo: TypeTodo) => {
        setCurrentTodo(DataTodo);
        setIsModalVisible(!isModalVisible);
    };
    const handleUpdateTodo = async (DataTodo: TypeTodo) => {
        const list = todos.map((todo) => {
            if(todo.id === DataTodo.id) {
                return {
                    ...DataTodo
                }
            }
            return todo;
        })
        try {
          await TodosAPI.update(DataTodo.id, DataTodo);
              setTodos(list);
        } catch (error) {
          console.log(error);
        }
    };
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="App">
            <h2>List todo</h2>
            <div className="header-add-user">
                <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
                    Add New Todo
                </button>
            </div>
            <ListTodo
                todoList={todos}
                onDeleteTodo={onHandleDelete}
                editTodo={handleEditTodo}
            />
            <Modal
                title="Add Todo"
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <AddTodoForm
                    onAddTodo={onHandleAdd}
                    currentTodo={currentTodo}
                    onEditTodo={handleUpdateTodo}
                    close={handleCancel}
                />
            </Modal>
        </div>
    );
}

export default App;
