import { TypeTodo } from '../TypeTodo/TypeTodo';
import './ListTodo.css'
type TodoListProps = {
    todoList: TypeTodo[];
    onDeleteTodo:any;
    editTodo:any;
};
export const ListTodo: React.FC<TodoListProps> = (props) => {
    return <div className="ant-list-items">
        {props.todoList.map((item, index) => {
            return (<div className="ant-list-item" key={index}>
                <div className="ant-list-item-meta">
                    <div className="ant-list-item-meta-content">
                        <h4 className="ant-list-item-meta-title">
                            <a>{item.name}</a>
                        </h4>
                        <div className="ant-list-item-meta-description">
                            {item.content}
                        </div>
                    </div>
                    <ul className="ant-list-item-action">
                        <li>
                            <a onClick={() => props.editTodo(item)}>Edit</a>
                        </li>
                        <li>
                            <a onClick={() => props.onDeleteTodo(item.id)}>Remove</a>
                        </li>
                    </ul>
                </div>
            </div>
            )
        })}
    </div>
}