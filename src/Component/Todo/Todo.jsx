import { useEffect, useState } from "react";
import React from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";

import Modal from "react-modal";
//================ icon ===================//
import { LuListTodo } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
//=========================================//

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Todo = () => {
  const db = getDatabase();

  // all State

  const [todoInput, settodoInput] = useState("");
  const [todoAlldata, settodoAlldata] = useState([]);
  const [realtime, setrealtime] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInputValue, setmodalInputValue] = useState("");
  const [editItem, seteditItem] = useState("");
  const [editTodoText, seteditTodoText] = useState("");

  // Get data from database

  useEffect(() => {
    const todoDbRef = ref(db, "todo/");

    onValue(todoDbRef, (snapshot) => {
      const allDataArr = [];
      snapshot.forEach((item) => {
        allDataArr.push({
          todoId: item.key,
          todoItem: item.val(),
        });
      });
      settodoAlldata(allDataArr);
    });
  }, [realtime]);

  // handleAdd Function

  const handleAdd = () => {
    if (todoInput !== "") {
      const dbInfo = ref(db, "todo/");
      set(push(dbInfo), {
        todoItem: todoInput,
      })
        .then(() => {
          setrealtime(!realtime);
          settodoInput("");
          console.log("upload succesfull");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("input faka");
    }
  };

  //  HandleDelete

  const handleDelete = (deleteid) => {
    remove(ref(db, "todo/" + deleteid))
      .then(() => {
        console.log("delete done");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  HandleEdit
  const handleEdit = (edit) => {
    seteditItem(edit);
    setIsOpen(true);
  };

  // HandleUpdate
  const handleUpdate = (e) => {
    e.preventDefault();

    set(ref(db, "todo/" + editItem), {
      todoItem: modalInputValue,
    })
      .then(() => {
        setIsOpen(false);
        setmodalInputValue("");
        console.log("update done");
      })
      .catch(() => {
        console.log("update faild");
      });
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="top-[50%] left-[50%] absolute -translate-x-[50%] -translate-y-[50%] overflow-hidden">
        <div className="relative h-[600px] overflow-scroll bg-[#D5CCFF] py-6 px-6 w-[560px] rounded-lg inline-block">
          <div className="">
            <h1 className="font-Roboto text-[32px] text-[#2B1887] font-bold flex items-center gap-x-4 pb-6">
              <LuListTodo /> Todo
            </h1>
            <div className="input mb-8 relative inline">
              <input
                type="text"
                placeholder="Add task"
                className="input w-[70%] py-3 pl-3 rounded-md text-[#2B1887] font-medium font-Roboto placeholder:text-[#2a18878e] placeholder:font-medium relative"
                value={todoInput}
                onChange={(e) => {
                  settodoInput(e.target.value);
                }}
              />
              <div className="absolute top-0 right-0">
                <MdLibraryAdd
                  className="cursor-pointer text-2xl   text-[#2B1887] hover:text-[#4d39b1] transition-all mr-3 hover:scale-110 "
                  title="Add"
                  onClick={handleAdd}
                />
              </div>
            </div>
          </div>

          <div className="all flex flex-col gap-y-4">
            {todoAlldata.map((item) => (
              <div
                className="list bg-white rounded-lg p-6 mt-8"
                key={item.todoId}
              >
                <h3 className=" pb-4 text-2xl font-Roboto font-bold">
                  {item.todoItem.todoItem}
                </h3>
                <div className="bottom flex items-center justify-between">
                  <FaEdit
                    className="text-3xl cursor-pointer text-yellow-700 hover:text-yellow-600 transition-all hover:scale-110"
                    title="Edit"
                    onClick={() => handleEdit(item.todoId)}
                  />

                  <MdDelete
                    className="text-3xl cursor-pointer text-red-800 hover:text-red-600 transition-all hover:scale-110"
                    title="Delete"
                    onClick={() => handleDelete(item.todoId)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <button onClick={closeModal}>close</button>

              <form>
                <input
                  value={modalInputValue}
                  className="bg-gray-500"
                  onChange={(e) => setmodalInputValue(e.target.value)}
                />

                <button
                  className="modalbtn bg-slate-800 text-white"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
