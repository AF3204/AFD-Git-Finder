// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import React, { useState, useContext } from 'react'
import GithubContext  from '../../context/github/githubContext.js';
import AlertContext  from '../../context/alert/alertContext.js';

/**
 * 2021-07-21: Section 5
 * Refactoring from Class to Component for Hook
 */

// 20210716: Converting to component
// export class Search extends Component {
// const {showClear, clearUsers} = this.props -> now pushed to here: (props)

// 20210721: Removing showClear and clearUsers
const Search = () => {
    
    // 20210717: Initialise the context here
    // const { searchUser} = useContext(GithubContext)
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)
    
    const {setAlert} = alertContext
    
    // 20210716: We destructure the text to be used by useState
    const [text, setText] = useState('')

    // state ={
    //     text: '',
    // }

    // 20210716: Placing the propTypes at the bottom
    // static propTypes = {
    //     searchUser: PropTypes.func.isRequired,
    //     clearUsers: PropTypes.func.isRequired,
    //     showClear: PropTypes.bool.isRequired,
    // }

    // Submitting the form
    const onSubmit = (e)=>{
        e.preventDefault();
        // Receiving the SUBMIT using the props
        // 20210716: this.state.text -> text
        // 20210716: this.props.setAlert -> setAlert
        // 20210716: this.props.searchUser -> searchUser
        if(text === ''){
            setAlert(' Please Enter Text', 'light');
        }else{
            githubContext.searchUser(text);
            // this.setState({text: '',})}
            setText('')
        }
    }
    // Changes in the form
    const onChange = (e)=>{
        // We are tageting the value in the input box. Aka the text
        // This is for single
        // 20210716: We now have initialised the setStatue, so can just push the value
        // this.setState({
        //     text: e.target.value
        // })  
        setText(e.target.value)


        // This is for multiple -> for a full length forms
        // this.setState({
        //     [e.target.name]: e.target.value
        // })    
    }

    // 20210716: Components class only requires return, hence the render go bye-bye
    // render() {
        // const {showClear, clearUsers} = this.props
        // 20210716: value={this.state.text} -> now just text
        // 20210716: this.onSubmit -> onSubmit
        // 20210716: this.onChange -> onChange
        return (
            <div>
                <form className='form' onSubmit={onSubmit}>
                    <input 
                        type='text'
                        name='text'
                        placeholder='Search Users...'
                        value={text}
                        onChange={onChange}/>
                    <input 
                        type='submit' 
                        value='Search'
                        className='btn btn-dark btn-block'
                    />
                </form>
                {githubContext.users.length > 0 && 
                (<button 
                    className='btn btn-block'
                    onClick={githubContext.clearUsers}> Clear</button>)
                }
            </div>
        )
}

// 20210721: Remove all props since the Reducer/Context is using
// Search.propTypes={
//         clearUsers: PropTypes.func.isRequired,
//         showClear: PropTypes.bool.isRequired,
// };

export default Search
