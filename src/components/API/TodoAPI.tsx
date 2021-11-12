
import { TypeTodo } from "../TypeTodo/TypeTodo";
import AxiosClient from "./AxiosClient";
const TodosAPI = {
  getAll() {
    const url = `/todos`;
    return AxiosClient.get(url);
  },
  get(id:number) {
    const url = `todos${id}`;
    return AxiosClient.get(url);
  },
  add(todo: TypeTodo) {
    const url = `/todos`;
    return AxiosClient.post(url, todo);
  },
  remove(id:number){
    const url = `/todos//${id}`;
    return AxiosClient.delete(url)
  },
  update(id:number,DataTodo:TypeTodo){
    const url = `/todos/${id}`;
    return AxiosClient.put(url,DataTodo )
}
};
export default TodosAPI;