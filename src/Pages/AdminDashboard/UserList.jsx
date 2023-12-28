import React, { useEffect, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./AllProducts.module.css"
import SideBar from './SideBar';
import { deleteUser, getAllUsers } from '../../Redux/UserDataReducer/action';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from "@mui/material";
import Navbar from '../../components/Navbar/Navbar';
const UserList = () => {
    const dispatch = useDispatch();
    const { isLoading, users,isDeleted } = useSelector((state) => state.UserDataReducer);
    const { token } = useSelector((state) => state.AuthReducer);

    useEffect(() => {
        dispatch(getAllUsers(token))
    }, [dispatch,isDeleted]);

    const deleteUserHandler = (id) => {
        console.log("idd",id)
        dispatch(deleteUser(id, token))
    }
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1

        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,

        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,

        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: function (params) {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.row.id}`}>
                            <Edit />
                        </Link>
                        <Button
                            onClick={() => deleteUserHandler(params.row.id)}
                        >
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
        });
    });
    const cellClassName = (params) => {
        if (params.field === '') {
            // Check the value of the 'status' column and return the appropriate class.
            return params.role === 'admin' ? 'greenColor' : 'redColor';
        }
        return ''; // For other columns, return an empty string.
    };
    return (
        <>
            <Navbar />
            <div className={styles.dashboard}>
                <SideBar />

                <div className={styles.productListContainer}>
                    <h1 id='productListHeading' className={styles.productListHeading}> All Users</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        cellClassName={cellClassName}
                        class={styles.productListTable}
                        autoHeight={true}
                        sx={{ '--DataGrid-overlayHeight': '300px' }}
                    >

                    </DataGrid>


                </div>
            </div>
        </>
    )
}

export default UserList
