import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import './Dashboard.scss';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            users : []
        }
    }

    requestData = (token) => {
        axios.defaults.withCredentials = true;
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
            axios.get('http://127.0.0.1:8000/api/users', 
            {
                headers :
                {
                    'Authorization' : 'Bearer '+token
                }
            })
            .then(result => {
                console.log(result);
                this.setState({
                    users : result.data.user
                })
            })
            .catch(error => {
                console.log(error.response)
            })
        })
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        
        if(userData){
            this.requestData(userData.token);
        }else{
            this.props.history.push('/login')
        }
    }

    handleLogout = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const email = userData.user.email;
        
        axios.defaults.withCredentials = true;
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
            axios.get('http://127.0.0.1:8000/api/logout', { params : {'email' : email }})
            .then(result => {
                console.log(result);
                localStorage.removeItem('userData');
                this.props.history.push('/login');
            })
            .catch(error => {
                console.log(error);
            })
        })
    }

    render(){
        return(
            <div>
                <div className="container-fluid">
                    <nav>
                        <div className="nav-menu">
                            <h3>Dashboard</h3>
                        </div>
                        <div className="nav-logout">
                            <button onClick={this.handleLogout} className="btn-logout">Logout</button>
                        </div>
                    </nav>
                    <div className="content">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nama</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map((user, i) => {
                                        return(
                                            <tr key={user.id}>
                                                <td style={{ width:"10%" }}>{i+1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Dashboard);