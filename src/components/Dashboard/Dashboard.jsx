import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';
import style from "./Dashboard.module.css";
const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <div className={style.container}>
      <h1>Welcome, {user.username}</h1>
      <h1 className={style.h1Class}>We're happy to see you again. You’re now logged in and ready to manage your policies and view them. Thank you for trusting us with your insurance needs! </h1>
      </div>
    </main>
  );
};

export default Dashboard;
