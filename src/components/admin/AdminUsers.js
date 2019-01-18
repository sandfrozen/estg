import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Paper, Typography } from '@material-ui/core'
import UserRow from './UserRow'
import Loading from '../Loading/Loading'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class AdminUsers extends Component {
  state = {
    users: [],
    fetching: true
  }

  componentDidMount () {
    this.fetchUsers()
  }

  fetchUsers = async () => {
    await fetch(`https://localhost:5001/api/users`)
      .then(response => response.json())
      .then(users => {
        this.setState({
          users,
          fetching: false
        })
      })
      .catch(e => {
        this.setState({ fetching: e.message })
      })
  }

  render () {
    const { secure } = this.props.location.state || { secure: false }

    if (secure === true) {
      const { users, fetching } = this.state
      const usersDiv = users.map(u => {
        return <UserRow user={u} />
      })

      if (fetching === false) {
        return (
          <Paper className='paper-w-w'>
            <Typography variant='h6' gutterBottom>
              Manage users active state:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align='right'>Name</TableCell>
                  <TableCell align='right'>Mail</TableCell>
                  <TableCell align='right'>Active?</TableCell>
                  <TableCell align='right' className='r-width'>Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersDiv}
              </TableBody>
            </Table>
          </Paper>
        )
      } else {
        return (
          <Paper className='paper-w-w'>
            <Loading />
          </Paper>
        )
      }
    } else {
      return <Redirect to='/' />
    }
  }
}

export default AdminUsers
