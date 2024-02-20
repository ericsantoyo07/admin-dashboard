import { addNewManager, deleteManager, getAllUsers } from "@/database/functions"
import { useEffect, useState } from "react"
import styles from "../styles/Invitations.module.css"
import { Shield, UserMinus, UserPlus } from "lucide-react";


export default function Invitations() {

    const [users, setUsers] = useState([]);
    const [inputEmail, setInputEmail] = useState('');


    async function validEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    async function handleManagerInsertion() {


        if (!await validEmail(inputEmail)) {
            alert('Invalid email');
            return;
        }


        const { data, error } = await addNewManager(inputEmail);
        console.log('manager data', data);
        console.log('manager error', error);
        if (data) {
            const { data, error } = await getAllUsers();
            console.log('users data', data);
            console.log('users error', error);
            if (data) setUsers(data);
        }

        else {
            alert('Email already exists as a manager or owner.');
        }
    }

    async function handleManagerDeletion(email) {

        const { data, error } = await deleteManager(email);
        console.log('manager data', data);
        console.log('manager error', error);
        if (data) {
            const { data, error } = await getAllUsers();
            console.log('users data', data);
            console.log('users error', error);
            if (data) setUsers(data);
        }
        else {
            alert('Something went wrong.');
        }

    }


    useEffect(() => {
        async function getUsers() {
            const { data, error } = await getAllUsers();
            console.log('users data', data);
            console.log('users error', error);
            if (data) setUsers(data);
        }
        getUsers();
    }
        , [])



    return (
        <div className={styles.manager_invitation}>
            <div>
                <h2 className={styles.manager_header}>Add New Manager</h2>

                <div className={styles.manager_input}>
                    <input type="email" placeholder="email" onChange={(e) => setInputEmail(e.target.value)} />
                    <UserPlus  size={30} onClick={handleManagerInsertion} />
                </div>
            </div>

            <div className={styles.managers}>

                {
                    users.map((user, index) => {
                        return (
                            <div key={index} className={styles.manager}>
                                <Shield color="#65b1ff" />
                                <h3>{user.email}</h3>
                                <UserMinus onClick={() => handleManagerDeletion(user.email)} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}