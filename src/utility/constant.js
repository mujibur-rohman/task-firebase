import {
  ClipboardDocumentCheckIcon,
  DocumentCheckIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/24/solid';

export const tasksCount = (allTask, completedTask, dueDateTask, myTask) => {
  return [
    {
      title: 'All Tasks',
      count: allTask,
      color: 'text-blue-500',
      icon: <DocumentDuplicateIcon width="50" className="text-blue-500" />,
    },
    {
      title: 'My Tasks',
      count: myTask,
      color: 'text-purple-500',
      icon: <DocumentIcon width="50" className="text-purple-500" />,
    },
    {
      title: 'Completed Tasks',
      count: completedTask,
      color: 'text-green-400',
      icon: <DocumentCheckIcon width="50" className="text-green-400" />,
    },
    {
      title: 'Due Date',
      count: dueDateTask,
      color: 'text-red-500',
      icon: <ExclamationTriangleIcon width="50" className="text-red-500" />,
    },
  ];
};

export const menus = [
  {
    name: 'Home',
    to: '/',
    icon: <HomeIcon width="20" />,
  },
  {
    name: 'My Tasks',
    to: '/my-task',
    icon: <ClipboardDocumentCheckIcon width="20" />,
  },
  {
    name: 'Add Tasks',
    to: '/add-task',
    icon: <PlusIcon width="20" />,
  },
  {
    name: 'Users',
    to: '/users',
    icon: <UserIcon width="20" />,
  },
];
