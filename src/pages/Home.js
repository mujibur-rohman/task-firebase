import React from 'react';
import { useSelector } from 'react-redux';
import CardTask from '../component/CardTask';
import LoadingSkeleton from '../component/LoadingSkeleton';
import useCompare from '../hooks/useCompare';
import useGetTasks from '../hooks/useGetTasks';
import { tasksCount } from '../utility/constant';

const Home = () => {
  const auth = useSelector((state) => state.user);
  const { tasks } = useGetTasks();
  const { isInWork, isCompleted, isDueDate } = useCompare();

  // Data yang masih dalam pengerjaan (Task In Work) | task not completed | task not due date
  const taskAtWork = tasks.filter((task) => isInWork(task));

  // Data yang completed
  const taskCompleted = tasks.filter((task) => isCompleted(task));

  // Data yang jatuh tempo / telat
  const taskDueDate = tasks.filter((task) => isDueDate(task));

  // Ambil data myTask
  const myTasks = tasks.filter((task) =>
    task.users.find((user) => user.id === auth.userId)
  );

  const itemCount = tasksCount(
    tasks.length,
    taskCompleted.length,
    taskDueDate.length,
    myTasks.length
  );

  return (
    <div>
      <div className="flex gap-3 mb-8">
        {itemCount.map((tc, i) => (
          <div
            key={i}
            className="flex border-[1px] rounded-md p-3 basis-3/12 justify-between"
          >
            <div>
              <h6 className={`${tc.color} font-medium`}>{tc.title}</h6>
              <h1 className={`${tc.color} text-3xl font-bold`}>{tc.count}</h1>
            </div>
            {tc.icon}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        {/* Taks */}
        <div className="basis-4/12 ">
          <header className="uppercase border-blue-500 border-b-4 py-3 font-bold">
            Tasks In Work
            <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">
              {taskAtWork.length}
            </span>
          </header>
          <div className="pt-7 flex flex-col gap-6">
            {/* Card */}
            {taskAtWork.map((task) => (
              <CardTask key={task.id} task={task} />
            ))}
            {tasks.length === 0 && <LoadingSkeleton />}
          </div>
        </div>
        {/* Completed Tasks */}
        <div className="basis-4/12 ">
          <header className="uppercase border-green-500 border-b-4 py-3 font-bold">
            Completed Tasks
            <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">
              {taskCompleted.length}
            </span>
          </header>
          <div className="pt-7 flex flex-col gap-6">
            {taskCompleted.map((task) => (
              <CardTask key={task.id} task={task} />
            ))}
            {tasks.length === 0 && <LoadingSkeleton />}
          </div>
        </div>
        {/* Due Date */}
        <div className="basis-4/12 ">
          <header className="uppercase border-red-500 border-b-4 py-3 font-bold">
            Due Date
            <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">
              {taskDueDate.length}
            </span>
          </header>
          <div className="pt-7 flex flex-col gap-6">
            {taskDueDate.map((task) => (
              <CardTask key={task.id} task={task} />
            ))}
            {tasks.length === 0 && <LoadingSkeleton />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
