import { addNewManager, getAllUsers } from "@/database/functions"
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
                            <div key={index}>
                                <h3>{user.email}</h3>
                                <p>{user.role}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}