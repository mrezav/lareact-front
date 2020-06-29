import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            email : '',
            password : '',
            error : ''
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = () => {
        const {name, email, password} = this.state;
        if(name === null || name === '')
            return this.setState({
                error : 'Maaf nama masih kosong!'
            })
        if(email === null || email === '')
            return this.setState({
                error : 'Maaf email masih kosong!'
            })
        if(password === null || password === '')
            return this.setState({
                error : 'Maaf password masih kosong!'
            })

        this.handleRegisterRequest().then(response => {
            this.handleLoginRequest().then(result => {
                localStorage.setItem('userData', JSON.stringify(result.data));
                this.props.history.push('/');
            })
        }).catch(error => {
            // console.log(error.response.data.message)
            this.setState({
                error : error.response.data.message
            })
        })
    }

    handleLoginRequest = () => {
        return new Promise((resolve, reject) => {
            axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {                    
                axios.post('http://127.0.0.1:8000/api/login', this.state)
                .then(res => {
                    resolve(res);
                })
                .catch(function(error){
                    let message = error.response.data.message;
                    reject(message)
                })
            })
        })
    }

    handleRegisterRequest = () => {
        return new Promise((resolve, reject) => {
            axios.defaults.withCredentials = true;
            axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
                axios.post('http://127.0.0.1:8000/api/register', this.state).then(result => {
                    // console.log(result)
                    resolve(result)
                }).catch(error => {
                    // console.log(error.response.data.message)
                    reject(error)
                })
            })
        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="card">
                        <div className="card-header">Register Form</div>
                        <div className="card-body">
                            <input onChange={this.handleInputChange} id="name" className="input" type="text" name="name" placeholder="Full Name"/>
                            <input onChange={this.handleInputChange} id="email" className="input" type="text" name="email" placeholder="Email"/>
                            <input onChange={this.handleInputChange} id="password" className="input" type="password" name="password" placeholder="Password"/>
                            <button onClick={this.handleSubmit}>Register</button>
                            <span className="error">{this.state.error}</span>
                        </div>
                        <div className="card-footer">
                            <a href="/login">Login</a>
                        </div>
                    </div>
                    <div className="myName">
                        by Muhammad Reza Vahlevi
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Register);