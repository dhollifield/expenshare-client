'use client'

import Link from "next/link"
import { useEffect, useState } from 'react';
import { getUsers } from "../lib/actions";

export default function Users() {
const [users, setUsers] = useState([]);

useEffect(() => {
    async function fetchUsers() {
        try {
            const users = await getUsers();
            setUsers(users);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    }

    fetchUsers();
}, []);

return <>
    <p class="users-title">Users List</p>
    <div>
    <ul className="flex justify-center">
        {users.map((user) => (
            <li className="text-3xl font-bold underline" key={user.id} id={user.id}>
                <p>{user.name}</p>
                <p>{user.email}</p>
            </li>
        ))}
    </ul>
    </div>
    </>
}