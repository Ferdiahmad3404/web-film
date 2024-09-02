import { useNavigate } from "react-router-dom"

const First = () => {
    const navigate = useNavigate()
    return(
        <>
            <h1>Home Page</h1>
            <button onClick={() => navigate('/about')}>CHECK ABOUT</button>
            <br></br>
            <button onClick={() => navigate('/film')}>Detail FILM</button>
        </>
    )
}

export default First