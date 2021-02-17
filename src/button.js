import React from "react"

export default class Button extends React.Component {

    setProps() {
        // this.props.history.push('/dashboard')
        console.log(this.props.props.history)

    }

    makeFetch(props) {
        console.log(this.props)
        fetch('http://localhost:8000/redirect')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.message) {
                console.log("RE-DIRECTING")
                this.props.props.history.push('/dashboard/1')
            }
        })
    }

    render() {
        return (
            <button onClick={e => this.makeFetch(this.props)}>redirect</button>
        )
    }
}

