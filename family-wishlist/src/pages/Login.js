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
        user: "Guest",
        addFamilyMember: 0
    }

    handleChange = (e) => {
        console.log('e.target.value', e.target.value);
        this.setState({
            user: e.target.value
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
                <header>Rodzinna lista prezentowa</header>
                <main>
                    {!this.state.addFamilyMember && <section>
                        <SelectUser onChange={this.handleChange} user={this.state.user} />
                    </section>}
                    <section>
                        {<AddFamilyMember onClick={this.handleClick} addFamilyMember={this.state.addFamilyMember} />}
                    </section>
                </main>
            </>
        );
    }
}

export default Login;