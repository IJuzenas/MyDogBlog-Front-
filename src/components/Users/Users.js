import {useNavigate} from "react-router-dom";
import {changeUser, createUser, useUsers} from "../api/usersApi";
import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import CreateUserModalWithFormik from "../Users/CreateUserModalWithFormik";



const Users = () => {

    const navigate = useNavigate();
    const {users = [], refetch} = useUsers();
    const [openUserModal, setOpenUserModal] = useState(false)
    const [editUser, setEditUser] = useState(null)

    const noUsersFound = !users.length && (
        <TableRow>
            <TableCell colSpan={5} align="center">
                No users found
            </TableCell>
        </TableRow>
    )
    // function DeleteUser(id){
    //     deleteUser(id)
    // }
    // DeleteUser(userList.id)
    const usersElement = (
        users.map((userList, i) => (
            <TableRow key={i}>
                <TableCell>{userList.id}</TableCell>
                <TableCell>{userList.name}</TableCell>
                <TableCell>{userList.email}</TableCell>
                <TableCell>{userList.password}</TableCell>
                <TableCell>{userList.joined}</TableCell>
                <TableCell>
                    <Button variant="contained" onClick={() => navigate(`/users/${userList.id}`)}>
                        Preview
                    </Button>
                        <EditIcon
                            onClick={() =>{
                                setOpenUserModal(true);
                                setEditUser(userList)
                            }
                            }
                        />
                    <Button variant="contained" >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        ))
    )

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Vardas</TableCell>
                        <TableCell>El.paštas</TableCell>
                        <TableCell>Slaptažodis</TableCell>
                        <TableCell>Prisiregistravimo data</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {noUsersFound || usersElement}
                </TableBody>
            </Table>
            <CreateUserModalWithFormik fetchUsers={refetch}
                                       open={openUserModal}
                                       onClose={() => setOpenUserModal(false)}
                                       user={editUser}
            />

            <div style={{marginTop: "10px", textAlign: "center"}}>
                <Button variant="outlined" onClick={() => {
                    setOpenUserModal(true);
                    setEditUser(null);
                }}>
                    Add new user
                </Button>
            </div>
        </>
    );
};

export default Users;


