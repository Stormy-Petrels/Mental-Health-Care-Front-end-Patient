import axios from "axios";
import { useState, useEffect } from 'react';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  TableSortLabel,
  Avatar
} from "@mui/material";

function History({ id }) {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const baseURL = "http://127.0.0.1:8000/images/";
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/appointments/history/${id}`)
      .then((res) => {
        console.log(res);
        setAppointments(res.data.appointments);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (orderBy === 'date') {
      return order === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const AppointmentDetails = sortedAppointments
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((appointment) => {
      return (
        <TableRow key={appointment.appointmentId}>
          <TableCell align="left" style={{   paddingLeft: "20px", display: "flex", alignItems: "center" }}>
            <Avatar alt={appointment.doctorName} src={`${baseURL}${appointment.image}`} />
            <Typography style={{ paddingLeft: "10px"}}>
              {appointment.doctorName}
            </Typography>
          </TableCell>
          <TableCell align="left">{appointment.date}</TableCell>
          <TableCell align="left">{`${appointment.timeStart} - ${appointment.timeEnd}`}</TableCell>
          <TableCell align="left">{appointment.price}</TableCell>
          <TableCell align="left">
            {appointment.status === "1" ? (
              <Typography style={{ color: 'green' }}>
                Success
              </Typography>
            ) : (
              <Typography style={{ color: 'blue' }}>
                Processing...
              </Typography>
            )}
          </TableCell>
        </TableRow>
      );
    });

  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h4" gutterBottom>
          History appointment
        </Typography>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  DoctorName
                </TableCell>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  <TableSortLabel active={orderBy === 'date'} direction={order} onClick={() => handleRequestSort('date')} >
                    Date booking
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Duration
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Price
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{AppointmentDetails}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={appointments.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>
    </div>
  );
}

export default History;