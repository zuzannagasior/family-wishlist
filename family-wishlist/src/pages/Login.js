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
        user: "Gość",
        addFamilyMember: 0
    }

    handleChange = (u) => {
        this.setState({
            user: u
        });
    }

    handleClick = () => {
        this.setState((prevState) => {
            return { addFamilyMember: !prevState.addFamilyMember }
        });
    }

    render() {
        return (
            <>
                <header className="login-header">Rodzinna lista prezentowa</header>
                <main className="login-main">
                    {/* {!this.state.addFamilyMember && <section className="section-select-user">
                        <SelectUser onChange={this.handleChange} user={this.state.user} />
                    </section>} */}
                    <section className={"section-select-user " + (this.state.addFamilyMember && "hide")}>
                        <SelectUser onChange={this.handleChange} user={this.state.user} />
                    </section>
                    <section className="section-add-f-member">
                        {<AddFamilyMember onClick={this.handleClick} addFamilyMember={this.state.addFamilyMember} />}
                    </section>
                </main>
            </>
        );
    }
}

export default Login;