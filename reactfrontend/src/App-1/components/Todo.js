
import React from "react";
import { useEffect, useState } from "react";
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

import { Tasks } from "./Tasks";
import { actions } from "../redux/modules";
import styles from "./Todo.module.scss";
import { isThereAnyitemsSelector } from '../redux/selectors'; 
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function TodoComponent(props){
  const { listItems, listItemsPost, listItemsDelete, itemsPresentBool } = props;
  const [ task, setTask ] = useState("");
  const [ modalOpen, setModalOpen ] = useState(false);

  const addNewItem = () => {
    if (task === ""){
      toast.info("Add Some Text!!", { autoClose: true });
    }else{
      listItemsPost(task);
      setTask('');
      toast.success("Task Added", { autoClose: 1000 });
    }
  }

  const inputTextOnChange = (event) => {
    setTask(task => event.target.value);
  }

  const yesDelete = () => {
    setModalOpen(false);
    listItemsDelete(-1);
    toast.error("All Tasks Deleted", { autoClose: 1000 });
  }

  const deleteModal = (
    <Modal isOpen={modalOpen} style={customStyles} >
            <h2>Are you sure you want to delete all tasks ?</h2>
            <div className={styles.modal_btn_wrapper}>
              <Button 
                className={styles.btn1}
                variant="outline-secondary"
                as="input" 
                type="button" 
                value="Yes"
                onClick={yesDelete}
              />
              <Button 
                className={styles.btn1}
                variant="outline-secondary"
                as="input" 
                type="button" 
                value="Cancel"
                onClick={()=>setModalOpen(false)}
              />
            </div>
          </Modal>
    );

  const ipt = (
    <input
      className={styles.parent_input}
      type="text" 
      id="name" 
      placeholder="Add your next task" 
      value={task}
      required=""
      onChange={inputTextOnChange}
    />
  );

  const btns = (
    <div className={styles.parent_btn}>
            <Button 
              className={styles.btn1}
              variant="outline-secondary"
              as="input" 
              type="button" 
              value="Add task"
              onClick={addNewItem}
            />
            { itemsPresentBool ? <Button 
              className={styles.btn1}
              variant="outline-secondary"
              as="input" 
              type="button" 
              value="Clear All Tasks"
              onClick={()=>setModalOpen(true)}
            />
            :
            null
            }
          </div>
  );

  const tasks = (
    <div className={styles.tasks}>
      <Tasks />
    </div>
  );

  useEffect(() => {
    listItems();
  }, [listItems]);

  return (
      <React.Fragment>
        <div className={styles.parent}>
          <h1>To-DO</h1>
          {ipt}
          {btns}
          {tasks}
          {deleteModal}
          <ToastContainer />
        </div>
      </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  itemsPresentBool: isThereAnyitemsSelector(state),
});

const { listItems, listItemsPost, listItemsDelete } = actions;
const mapDispatchToProps = {
  listItems,
  listItemsPost,
  listItemsDelete,
}

export const Todo = connect(mapStateToProps, mapDispatchToProps)(TodoComponent);