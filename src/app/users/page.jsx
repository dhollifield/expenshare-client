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
    <h2 class="flex justify-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Users List</h2>
    <div>
        <div className="flex center">
            {users.map((user) => (
                <div className="shadow rounded-lg p-3" key={user.id} id={user.id}>
                    <div className="text-red-400">{user.name}</div>
                    <div>{user.email}</div>
                </div>
            ))}
        </div>
    </div>
    </>
}