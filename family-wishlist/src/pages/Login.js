import React from 'react';
import '../styles/Login.css';
import SelectUser from '../components/SelectUser';
import AddFamilyMember from '../components/AddFamilyMember';

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    state = {
        user: { value: 'Gość', label: 'Gość' },
        newUser: "",
        newUserAvId: "",
        addFamilyMember: 0,
        submitted: 0
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

        console.log('handleSubmit')
    }

    render() {
        return (
            <>
                <header className="login-header">Rodzinna lista prezentowa</header>
                <main className="login-main">
                    <section className={"section-select-user " + (this.state.addFamilyMember && "hide")}>
                        <SelectUser onChange={this.handleSelectChange} user={this.state.user} addFamilyMember={this.state.addFamilyMember} />
                    </section>
                    <section className={"section-add-f-member"}>
                        <AddFamilyMember chooseAvatar={this.chooseAvatar} showAddUserSection={this.showAddUserSection} onChange={this.handleInputChange} onSubmit={this.handleSubmit} state={this.state} />
                    </section>
                </main>
            </>
        );
    }
}

export default Login;