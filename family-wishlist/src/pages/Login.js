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
        user:  {value: 'Gość', label: 'Gość' },
        newUser: "",
        addFamilyMember: 0
    }

    handleSelectChange = (u) => {
        this.setState({user: u});
    }

    handleInputChange = (e) => {
        this.setState({newUser: e.target.value});
    }

    handleClick = () => {
        this.setState((prevState) => {
            return { 
                addFamilyMember: !prevState.addFamilyMember,
                newUser: ""
            }
        });
    }

    render() {
        return (
            <>
                <header className="login-header">Rodzinna lista prezentowa</header>
                <main className="login-main">
                    <section className={"section-select-user "  + (this.state.addFamilyMember && "hide")}>
                        <SelectUser onChange={this.handleSelectChange} user={this.state.user} addFamilyMember={this.state.addFamilyMember} />
                    </section>
                    <section className={"section-add-f-member"}>
                        {<AddFamilyMember onClick={this.handleClick} onChange={this.handleInputChange} addFamilyMember={this.state.addFamilyMember} newUser={this.state.newUser} />}
                    </section>
                </main>
            </>
        );
    }
}

export default Login;