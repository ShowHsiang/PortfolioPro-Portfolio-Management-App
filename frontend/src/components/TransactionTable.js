import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction, editTransaction, deleteTransaction, getPortfolio } from '../redux/actions/portfolioActions';

const TransactionTable = ({ data = [] }) => {
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        setRows(data.map((row, index) => ({
            ...row,
            id: row.id || `existing-${index}`
        })));
    }, [data]);

    const columns = [
        { 
            field: 'symbol', 
            headerName: 'Symbol', 
            width: 150, 
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = params.props.value.length > 0;
                return { ...params.props, error: !isValid };
            }
        },
        { 
            field: 'trade_date', 
            headerName: 'Trade Date', 
            width: 150, 
            editable: true,
            type: 'date',
            valueGetter: (params) => {
                // Ensure the value is always a Date object
                return params.row.trade_date ? new Date(params.row.trade_date) : new Date();
            },
            valueSetter: (params) => {
                // Ensure the value is stored as a string in 'YYYY-MM-DD' format
                const newDate = new Date(params.value);
                return {
                    ...params.row,
                    trade_date: !isNaN(newDate) ? newDate.toISOString().split('T')[0] : params.row.trade_date
                };
            }
        },
        { 
            field: 'shares', 
            headerName: 'shares', 
            type: 'number', 
            width: 150, 
            editable: true,
            preProcessEditCellProps: (params) => ({
                ...params.props,
                error: params.props.value <= 0
            })
        },
        { 
            field: 'price', 
            headerName: 'Price', 
            type: 'number', 
            width: 150, 
            editable: true,
            preProcessEditCellProps: (params) => ({
                ...params.props,
                error: params.props.value <= 0
            })
        },
        { 
            field: 'action', 
            headerName: 'Action', 
            width: 150, 
            editable: true, 
            type: 'singleSelect', 
            valueOptions: ['BUY', 'SELL']
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: (params) => {
                return params.row.isNew ? (
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleSaveRow(params.row)}
                        disabled={!isValidRow(params.row)}
                    >
                        Save
                    </Button>
                ) : (
                    <IconButton
                        color="error"
                        onClick={() => handleDeleteRow(params.row.id)}
                        size="small"
                    >
                        <DeleteIcon />
                    </IconButton>
                );
            }
        }
    ];
    

    const isValidRow = (row) => {
        return row.symbol && 
               row.symbol.length > 0 &&
               row.trade_date && 
               row.shares > 0 && 
               row.price > 0 && 
               row.action;
    };

    const handleAddRow = () => {
        const newRow = {
            id: `new-${Date.now()}`,
            trade_date: new Date().toISOString().split('T')[0],
            symbol: '',
            shares: 0,
            price: 0,
            action: 'BUY',
            isNew: true
        };
        setRows((prevRows) => [...prevRows, newRow]);
        setIsEditing(true);
    };

    const handleDeleteRow = async (id) => {
        try {
            await dispatch(deleteTransaction(id));
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            showSnackbar('Transaction deleted successfully', 'info');
        } catch (error) {
            showSnackbar('Failed to delete transaction', 'error');
        }
    };

    const handleSaveRow = async (row) => {
        if (!isValidRow(row)) {
            showSnackbar('Please fill all required fields correctly', 'error');
            return;
        }

        const transactionData = {
            trade_date: row.trade_date,
            symbol: row.symbol.toUpperCase(),
            shares: Number(row.shares),
            price: Number(row.price),
            action: row.action
        };

        try {
            if (row.isNew) {
                await dispatch(createTransaction(transactionData));
                showSnackbar('Transaction added successfully', 'success');
            } else {
                await dispatch(editTransaction(row.id, transactionData));
                showSnackbar('Transaction updated successfully', 'success');
            }
            dispatch(getPortfolio()); // Refresh portfolio data after action
            setRows((prevRows) => prevRows.filter((r) => r.id !== row.id)); // Remove new rows
            setIsEditing(false);
        } catch (error) {
            showSnackbar(error.message || 'Failed to save transaction', 'error');
        }
    };

    const handleCellEditStop = (params, event) => {
        if (params.reason === 'cellFocusOut') {
            setIsEditing(true);
        }
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddRow}
                style={{ marginBottom: 10 }}
                disabled={isEditing}
            >
                Add New Transaction
            </Button>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                onCellEditStop={handleCellEditStop}
                editMode="cell"
                experimentalFeatures={{ newEditingApi: true }}
            />
            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity} 
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TransactionTable;
