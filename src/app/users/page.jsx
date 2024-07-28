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
    <ul class="users-list">
        {users.map((user) => (
            <li class="user-info" key={user.id} id={user.id}>
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
            </li>
        ))}
    </ul>
    </div>
    </>
}