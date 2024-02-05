import { addNewManager, deleteManager, getAllUsers } from "@/database/functions"
import { useEffect, useState } from "react"



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
        <div>
            <h1>Invitations</h1>


            <div>
                <h2>Add New Admin</h2>

                <div style={{ display: 'flex' }}>
                    <input type="email" placeholder="email" onChange={(e) => setInputEmail(e.target.value)} />
                    <button onClick={handleManagerInsertion}>Add</button>
                </div>
            </div>

            <div>

                {
                    users.map((user, index) => {
                        return (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <h3>{user.email}</h3>
                                <p>{user.role}</p>
                                <button onClick={() => handleManagerDeletion(user.email)}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}