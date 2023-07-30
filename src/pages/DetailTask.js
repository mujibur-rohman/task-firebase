/* eslint-disable no-restricted-globals */
import {
  CalendarIcon,
  CheckIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebase/config";
import useCompare from "../hooks/useCompare";
import useGetTaskById from "../hooks/useGetTaskById";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const DetailTask = () => {
  const auth = useSelector((state) => state.user);
  const { id } = useParams();
  const { task } = useGetTaskById(id);
  const { isCompleted, isDueDate, isInWork } = useCompare();
  const isMyTask = task?.users.find((user) => user.id === auth.userId);
  const navigate = useNavigate();

  const [comment, setComment] = useState({
    id: auth.userId,
    displayName: auth.displayName,
    photoURL: auth.photoURL,
    body: "",
  });

  const markAsCompleted = async () => {
    const docRef = doc(db, "tasks", id);

    await updateDoc(docRef, {
      completed: true,
    });
  };

  const deleteTask = async () => {
    if (confirm("Are you sure to Delete?")) {
      await deleteDoc(doc(db, "tasks", id));
      navigate(-1);
    }
  };

  const handleComment = (e) => {
    setComment({ ...comment, body: e.target.value });
  };

  const handleLampiran = async (e) => {
    console.log(e.target.files[0]);
    const photo = e.target.files[0];
    // Lokasi File
    const uploadPath = `images/lampiran/${photo.name}`;

    const refStorage = ref(storage, uploadPath);
    await uploadBytes(refStorage, photo);

    // Update photoURL & DisplayName pada user
    await getDownloadURL(refStorage)
      .then(async (url) => {
        console.log(url);
      })
      .catch((err) => console.log(err));
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (comment.body.trim()) {
      const docRef = doc(db, "tasks", id);

      await updateDoc(docRef, {
        comments: [...task.comments, comment],
      });

      setComment({ ...comment, body: "" });
    }
  };

  return (
    <div className="flex">
      <div className="basis-8/12">
        <div className="border-[1px] rounded-md p-4">
          <h1 className="text-xl font-medium mb-3">{task?.title}</h1>
          <div className="text-gray-500 flex gap-2 items-center">
            <CalendarIcon width="20" />
            <span>{new Date(task?.duedate).toDateString()}</span>
            {isDueDate(task) && (
              <label className="bg-red-100 px-3 py-1 rounded-full font-medium text-red-500 text-sm">
                Due Date
              </label>
            )}
          </div>
          <div className="my-3 text-gray-600">
            Priority :{" "}
            <span className="px-3 py-1 rounded-full font-medium bg-orange-500 text-white">
              Low
            </span>
          </div>
          <p className="text-justify text-gray-700 mb-5">{task?.description}</p>
          {isMyTask && (
            <div className="flex gap-3">
              {isInWork(task) && (
                <button
                  onClick={markAsCompleted}
                  className="bg-green-600 hover:bg-green-700 btn"
                >
                  Mark As Completed
                </button>
              )}
              {isCompleted(task) && (
                <div className="flex items-center">
                  <CheckIcon width="25" className="text-green-400" />
                  <span className="block ml-1 text-green-400">Completed</span>
                </div>
              )}
              <button
                onClick={deleteTask}
                className="bg-red-600 hover:bg-red-700 btn"
              >
                <TrashIcon width="20" />
              </button>
            </div>
          )}
        </div>
        {/* Comment */}
        <div className="p-4 mt-4 border-[1px] rounded-md">
          <h1 className="text-xl font-medium mb-3">Comments</h1>
          <div className="mb-4">
            {task?.comments.map((comment, i) => (
              <div key={i} className="mb-3 w-fit flex gap-1">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/002/275/847/small/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                  alt="avatar-user"
                  className="avatar mr-1 self-start"
                />
                <div className="bg-gray-100 p-1 px-4 rounded-lg">
                  <h1 className="font-medium">{comment.displayName}</h1>
                  <p className="text-sm">{comment.body}</p>
                </div>
              </div>
            ))}
          </div>
          {isMyTask && (
            <form onSubmit={submitComment} className="flex gap-2">
              <textarea
                onChange={handleComment}
                value={comment.body}
                type="text"
                className="basis-10/12 outline-none border-[1px] rounded-lg p-2"
              />
              <button
                type="submit"
                className="btn self-start bg-blue-700 hover:bg-blue-800"
              >
                <PaperAirplaneIcon width="20" />
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="basis-4/12 px-3">
        <div className="border-[1px] rounded-md p-3">
          <h1 className="text-xl font-medium mb-3">Users</h1>
          <div>
            {task?.users.map((user) => (
              <div
                key={user.id}
                className="text-sm py-1 text-gray-500 flex items-center"
              >
                <img
                  src={user.photoURL}
                  alt="avatar-user"
                  className="avatar mr-2"
                />
                <h1>{user.displayName}</h1>
              </div>
            ))}
          </div>
        </div>
        {isMyTask && (
          <div className="border-[1px] rounded-md p-3 mt-3">
            <h1 className="text-xl font-medium mb-3">Lampiran</h1>
            <div>
              <input onChange={handleLampiran} type="file" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailTask;
