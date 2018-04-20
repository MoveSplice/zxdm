function Welcome(props) {
    return <h1>Hello ,{props.name}</h1>;
}

const element = <Welcome name="Sara" />;


ReactDOM.ReactDOM(
    element,
    document.getElementById('root')
)










