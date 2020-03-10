import React from 'react';
import '../styles/Login.css';
import SelectUser from '../components/SelectUser';
import AddFamilyMember from '../components/AddFamilyMember';
import Loading from '../components/Loading';
import axios from 'axios';


class Login extends React.Component {
    state = {
        user: { value: 'Gość', label: 'Gość' },
        users: [],
        newUser: "",
        newUserAvId: "",
        addFamilyMember: 0,
        submitted: 0,
        loading: false
    }

    componentDidMount = () => {
        document.title = "Wybór użytkownika - Rodzinna Lista Prezentowa";

        this.setState({ loading: true });
        axios.get('http://localhost:5000/users')
            .then(response => {
                let usersList = [];
                usersList.push(this.state.user);
                usersList.push(...response.data.map(user => user = {value: user._id, label: user.username}));

                this.setState({
                    users: usersList,
                    loading: false
                })
            })
            .catch(function(error) {
                console.log(error);
                this.setState({ loading: false });
            })
    }

    handleSelectChange = (u) => {
        this.setState({ user: u });
    }

    handleInputChange = (e) => {
        this.setState({ newUser: e.target.value });
    }

    showAddUserSection = () => {
        // reset values
        this.setState((prevState) => {
            return {
                addFamilyMember: !prevState.addFamilyMember,
                newUser: "",
                newUserAvId: "",
                submitted: 0
            }
        });
    }

    chooseAvatar = (e) => {
        this.setState({ newUserAvId: e.target.id });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        //validation
        if (!this.state.newUser || !this.state.newUserAvId) {
            this.setState({ submitted: 1 });
            return;
        }
        
        const newUser = {
            username: this.state.newUser,
            avatarId: this.state.newUserAvId
        }

        this.setState({ loading: true });
        axios.post('http://localhost:5000/users', newUser)
        .then(res => {
            console.log(res);
            this.setState({ 
                addFamilyMember: false,
                loading: false 
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });
    }

    render() {
        const loading = this.state.loading;
        return (
            <>
                <header className="login-header">Rodzinna lista prezentowa</header>
                <main className="login-main">
                    {loading ? <Loading /> :
                    <div>
                        <section className={"section-select-user " + (this.state.addFamilyMember && "hide")}>
                            <SelectUser onChange={this.handleSelectChange} user={this.state.user} usersList={this.state.users} addFamilyMember={this.state.addFamilyMember} />
                        </section>
                        <section className={"section-add-f-member"}>
                            <AddFamilyMember chooseAvatar={this.chooseAvatar} showAddUserSection={this.showAddUserSection} onChange={this.handleInputChange} onSubmit={this.handleSubmit} state={this.state} />
                        </section> 
                    </div>}
                </main>
            </>
        );
    }
}

export default Login;