
import { connect } from "react-redux";
import { useState } from "react";
import { itemsSelector, getCurrentDate } from "../redux/selectors";
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from "./TaskContainer.module.scss";
import { actions } from "../redux/modules";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
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

function TaskContainerComponent(props){
    const { name, delid, listItemsDelete, listItemsUpdate } = props;
    const [ modalOpen, setModalOpen ] = useState(false);
    const [  editedTask, setEditedTask ] = useState(name);

    function handleDelete(){
      listItemsDelete(delid);
      toast.error("Task Deleted", { autoClose: 1000 });
    }

    function handleEdit(){
      setModalOpen(true);
    }

    const yesUpdate = () => {
      listItemsUpdate(delid, editedTask);
      setModalOpen(false);
      toast.success("Task Updated Successfully!!", { autoClose: 1000 });
    }

    const editIcon = (
      <IconButton edge="end" aria-label="delete" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
    );

    const deleteIcon = (
      <IconButton edge="end" aria-label="edit" onClick={handleDelete} >
        <DeleteIcon />
      </IconButton>
    );

    const folderIcon = (
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
    );

    const modalIpOnChange = (event) => {
      setEditedTask(editedTask => event.target.value);
    }

    const editModal = (
      <Modal isOpen={modalOpen} style={customStyles} >
              <h2> Edit </h2>
              <input
                  className={styles.editModalInput}
                  type="text" 
                  id="name" 
                  placeholder="Add your next task" 
                  value={editedTask}
                  required=""
                  onChange={modalIpOnChange}
                />
              <div className={styles.modal_btn_wrapper}>
                <Button 
                  className={styles.btn1}
                  variant="outline-secondary"
                  as="input" 
                  type="button"
                  value="Save"
                  onClick={yesUpdate}
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

    

    return (
        <React.Fragment>
          <div className={styles.list_item}>
            <ListItem
              className={styles.task_item}
              secondaryAction={
                <div>
                  { editIcon }
                  { deleteIcon }
                </div>}
            >
              { folderIcon } 
              <Tippy content={name}>
                <ListItemText
                  primary={name}
                  secondary={getCurrentDate("-")}
                />
              </Tippy>
            </ListItem>
          </div>
          {editModal}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    items: itemsSelector(state),
});

const { listItemsDelete, listItemsUpdate } = actions;
export const TasksContainer = connect(mapStateToProps, { listItemsDelete, listItemsUpdate })(TaskContainerComponent);

